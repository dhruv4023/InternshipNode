import { getHistoryByUserId } from '../services/orderhistory.service.js';
import { getUserIdsByName } from '../services/user.service.js';


import db from '../models/index.js';
import RESPONSE from '../helper/response.js';
import isValidData from '../helper/bodyValidation.js';

const { PurchasedItems, Orders, sequelize, CartItems, Carts, Products } = db;

export const orderProduct = async (req, res) => {
    try {
        const {
            body: { productId, quantity },
            tokenData: { userId }
        } = req;

        // Validate request data
        if (await isValidData({ ...req.body, ...req.tokenData }, res, {
            userId: 'required|integer|min:1',
            productId: 'required|integer|min:1',
            quantity: 'required|integer|min:1',
        })) return;

        await sequelize.transaction(async (t) => {
            // Check if the product exists
            const product = await Products.findOne({ where: { id: productId }, transaction: t });

            if (!product) {
                return RESPONSE.error(res, 4003, 404);
            }

            // Check if the product quantity is sufficient
            if (product.quantity < quantity) {
                return RESPONSE.error(res, 4006, 400);
            }

            // Create an order for the user
            const order = await Orders.create({ userId }, { transaction: t });

            // Create purchased item for the ordered product
            const purchasedItem = await PurchasedItems.create({
                productId,
                orderId: order.id,
                quantity,
            }, { transaction: t });

            RESPONSE.success(res, 4004, { order, purchasedItem }, 201);
        });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};


export const purchaseItemUsingCart = async (req, res) => {
    try {
        const { body: { cartId }, tokenData: { userId } } = req;

        // Validate request data
        if (await isValidData({ ...req.body, ...req.tokenData }, res, {
            userId: 'required|integer|min:1',
            cartId: 'required|integer|min:1',
        })) return;

        // Check if the specified cart exists for the user
        const cart = await Carts.findOne({ where: { id: cartId, userId } });
        if (!cart) {
            return RESPONSE.error(res, 4005, 404);
        }


        try {
            // Start an unmanaged transaction
            const t = await sequelize.transaction();
            
            const cartItems = await CartItems.findAll({ where: { cartId } });
            
            if (!cartItems || cartItems.length === 0) {
                await t.rollback(); // Rollback the transaction
                return RESPONSE.error(res, 4001, 404);
            }
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
    try {
        const { tokenData: { userId } } = req;

        if (await isValidData(req.tokenData, res, {
            userId: 'required|integer|min:1',
        })) return;

        const history = await getHistoryByUserId(userId);

        RESPONSE.success(res, 4003, { history });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Get order list by customer name
export const getOrderListByCustomerName = async (req, res) => {
    try {
        if (await isValidData(req.body, res, {
            firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
            lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
        })) return;

        const allHistory = [];
        const userIds = await getUserIdsByName(req.body);

        for (const userId of userIds) {
            allHistory.push(...await getHistoryByUserId(userId));
        }

        RESPONSE.success(res, 4004, { history: allHistory });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};
