import Validator from 'validatorjs';

import db from '../models/index.js';
import RESPONSE from '../helper/response.helper.js';
import { namePattern } from '../helper/custom_validation_patterns/name_pattern.helper.js';

const { PurchasedItems, Orders, sequelize, CartItems, Carts, Products, Users } = db;

export const orderProduct = async (req, res) => {
    const {
        body: { productId, quantity },
        tokenData: { userId }
    } = req;

    let validation = new Validator({ ...req.body, ...req.tokenData }, {
        userId: 'required|integer|min:1',
        productId: 'required|integer|min:1',
        quantity: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        // Begin the transaction
        const t = await sequelize.transaction();

        try {
            // Check if the product exists
            const product = await Products.findOne({ where: { id: productId }, transaction: t });

            if (!product)
                return RESPONSE.error(res, 4003, 404);

            // Check if the product quantity is sufficient
            if (product.quantity < quantity)
                return RESPONSE.error(res, 4006, 400);

            // Create an order for the user
            const order = await Orders.create({ userId }, { transaction: t });

            // Create purchased item for the ordered product
            const purchasedItem = await PurchasedItems.create({
                productId,
                orderId: order.id,
                quantity,
            }, { transaction: t });

            // Commit the transaction if everything is successful
            await t.commit();

            RESPONSE.success(res, 4004, { order, purchasedItem }, 201);
        } catch (error) {
            // Rollback the transaction if there is an error
            await t.rollback();
            RESPONSE.error(res, 9999, 500, error);
        }
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};


export const purchaseItemUsingCart = async (req, res) => {
    const { body: { cartId }, tokenData: { userId } } = req;

    let validation = new Validator({ ...req.body, ...req.tokenData }, {
        userId: 'required|integer|min:1',
        cartId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        // Check if the specified cart exists for the user
        const cart = await Carts.findOne({ where: { id: cartId, userId } });
        if (!cart)
            return RESPONSE.error(res, 4005, 404);


        try {
            // Start an unmanaged transaction
            const t = await sequelize.transaction();

            const cartItems = await CartItems.findAll({ where: { cartId } });

            if (!cartItems || cartItems.length === 0) 
                return RESPONSE.error(res, 4001, 404);

            const order = await Orders.create({ userId }, { transaction: t });

            // Create purchased items from the cart items
            const purchasedItems = await PurchasedItems.bulkCreate(
                cartItems.map((cartItem) => ({
                    productId: cartItem.productId,
                    orderId: order.id,
                    quantity: cartItem.quantity,
                })),
                { transaction: t }
            );

            // Remove items from the cart and then delete the cart
            await CartItems.destroy({ where: { cartId }, transaction: t });
            await Carts.destroy({ where: { id: cartId }, transaction: t });

            await t.commit(); // Commit the transaction
            RESPONSE.success(res, 4002, { order, purchasedItems }, 201);
        } catch (error) {
            await t.rollback(); // Rollback the transaction in case of an error
            return RESPONSE.error(res, 9999, 500, error);
        }
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};



// Get purchase history for a user
export const getPurchaseHistory = async (req, res) => {
    const { tokenData: { userId } } = req;

    let validation = new Validator(req.tokenData, {
        userId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const history = await getHistoryByUserId(userId);

        RESPONSE.success(res, 4003, { history });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Get order list by customer name
export const getOrderListByCustomerName = async (req, res) => {
    namePattern();
    let validation = new Validator(req.body, {
        firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
        lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {

        const allHistory = [];
        const userIds = await getUserIdsByName(req.body);

        for (const userId of userIds)
            allHistory.push(...await getHistoryByUserId(userId));

        RESPONSE.success(res, 4004, { history: allHistory });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};


const getHistoryByUserId = async (userId) => {
    // Find all orders and associated purchased items for the user
    const orderIds = await Orders.findAll({ where: { userId } });

    const history = [];

    for (const order of orderIds) {
        const purchaseHistory = await PurchasedItems.findAll({ where: { orderId: order.id } });

        for (const ph of purchaseHistory) {
            const p = await Products.findOne({ where: { id: ph.productId } });

            const dt = {
                userId: userId,
                orderId: ph.orderId,
                quantity: ph.quantity,
                productName: p.name,
                productPrice: p.price,
                productDescription: p.description,
            };

            history.push(dt);
        }
    }
    return history
}

const getUserIdsByName = async ({ firstName, lastName }) => {
    const users = await Users.findAll({
        where: {
            [Op.or]: [
                {
                    firstName: { [Op.iLike]: `%${firstName || ''}%` },
                    lastName: { [Op.iLike]: `%${lastName || ''}%` },
                },
                {
                    [Op.and]: [
                        { firstName: { [Op.iLike]: `%${firstName}%` } },
                        { lastName: { [Op.eq]: null } },
                    ],
                },
                {
                    [Op.and]: [
                        { firstName: { [Op.eq]: null } },
                        { lastName: { [Op.iLike]: `%${lastName}%` } },
                    ],
                },
            ],
        },
    });
    return users.map(u => u.id);
}