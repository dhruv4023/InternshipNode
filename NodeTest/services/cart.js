

// cartController.js

import { CartItems } from '../db.js'; // Import your CartItems model

// Add item to CartItems
export const addItemToCart = async ({ cartId, productId, quantity }) => {
    return await CartItems.create({
        cartId,
        productId,
        quantity,
    });
};
