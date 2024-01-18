import db from '../models/index.js';
const { Orders, Products, PurchasedItems } = db

export const getHistoryByUserId = async (userId) => {
    // Find all orders and associated purchased items for the user
    const orderIds = await Orders.findAll({
        where: { userId },
    });

    const history = [];

    for (const order of orderIds) {
        const purchaseHistory = await PurchasedItems.findAll({ where: { orderId: order.id } });

        for (const ph of purchaseHistory) {
            const p = await Products.findByPk(ph.productId);

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