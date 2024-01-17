import { PurchasedItems, Orders, sequelize, CartItems, Carts } from '../db.js';
import { getHistoryByUserId } from '../services/purchasedHistory.js';
import { getUserIdsByName } from '../services/user.js';
import RESPONSE from '../Response/Response.js';

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
    const { userId } = req.tokenData;

    try {
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
