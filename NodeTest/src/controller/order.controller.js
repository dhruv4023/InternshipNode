import { getHistoryByUserId } from '../services/purchasedHistory.js';
import { getUserIdsByName } from '../services/user.js';


import db from '../models/index.js';
import RESPONSE from '../helper/response.js';
import isValidData from '../helper/bodyValidation.js';

const { PurchasedItems, Orders, sequelize, CartItems, Carts } = db;
// Purchase items using a cart
export const purchaseItemUsingCart = async (req, res) => {
    try {
        const { body: { cartId }, tokenData: { userId } } = req;

        if (await isValidData({ ...req.body, ...req.tokenData }, res, {
            userId: 'required|integer|min:1',
            cartId: 'required|integer|min:1',
        })) return;

        if (!await Carts.findOne({ where: { id: cartId, userId } }))
            return RESPONSE.error(res, 4005, 404);

        await sequelize.transaction(async (t) => {
            // Get the items in the cart
            const cartItems = await CartItems.findAll({
                where: { cartId }
            });

            if (!cartItems || cartItems.length === 0) {
                return RESPONSE.error(res, 4001, 404);
            }

            // Create an order for the user
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

            // Remove the items from the cart
            await CartItems.destroy({ where: { cartId }, transaction: t });

            await Carts.destroy({ where: { id: cartId }, transaction: t });

            RESPONSE.success(res, 4002, { order, purchasedItems }, 201);
        });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error)
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
        console.error(error);
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
        console.error(error);
        RESPONSE.error(res, 9999, 500, error)
    }
};
