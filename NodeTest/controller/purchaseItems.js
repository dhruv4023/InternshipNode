// controllers/purchaseController.js

import { PurchasedItems, Orders, sequelize, CartItems, Products, Users, Carts } from '../db.js';
import { getHistoryByUserId } from '../services/purchasedHistory.js';
import { getUserIdsByName } from '../services/user.js';


// Purchase items using a cart
export const purchaseItemUsingCart = async (req, res) => {
    const { cartId } = req.body;
    const { userId } = req.tokenData

    try {
        await sequelize.transaction(async (t) => {
            // Get the items in the cart
            const cartItems = await CartItems.findAll({
                where: { cartId }
            });

            if (!cartItems || cartItems.length === 0) {
                return res.status(404).json({ error: 'Cart is empty' });
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

            res.status(201).json({ order, purchasedItems });
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Get purchase history for a user
export const getPurchaseHistory = async (req, res) => {
    console.log(req.tokenData)
    const { userId } = req.tokenData;

    try {
        res.json(await getHistoryByUserId(userId));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getOrderListByCustomerName = async (req, res) => {
    try {
        const allHistory = []
        const uids = await getUserIdsByName(req.body)
        console.log(uids)
        for (const uid of uids) {
            allHistory.push(...await getHistoryByUserId(uid))
            console.log(uid)
        }
        res.json(allHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
