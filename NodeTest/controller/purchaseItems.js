// controllers/purchaseController.js

import { PurchasedItems, Orders, sequelize, CartItems, Products, Users, Carts } from '../db.js';
import { getHistoryByUserId } from '../services/purchasedHistory.js';
import { getUserIdsByName } from '../services/user.js';

// Purchase items using a cart
export const purchaseItemUsingCart = async (req, res) => {
    const { cartId } = req.body;
    const { userId } = req.tokenData;

    try {
        await sequelize.transaction(async (t) => {
            // Get the items in the cart
            const cartItems = await CartItems.findAll({
                where: { cartId }
            });

            if (!cartItems || cartItems.length === 0) {
                return res.status(404).json({ status: 'error', message: 'Cart is empty' });
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

            res.status(201).json({ status: 'success', message: 'Items purchased successfully', order, purchasedItems });
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get purchase history for a user
export const getPurchaseHistory = async (req, res) => {
    const { userId } = req.tokenData;

    try {
        const history = await getHistoryByUserId(userId);
        res.status(200).json({ status: 'success', history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get order list by customer name
export const getOrderListByCustomerName = async (req, res) => {
    try {
        const allHistory = [];
        const userIds = await getUserIdsByName(req.body);

        for (const userId of userIds) {
            allHistory.push(...await getHistoryByUserId(userId));
        }

        res.status(200).json({ status: 'success', history: allHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
