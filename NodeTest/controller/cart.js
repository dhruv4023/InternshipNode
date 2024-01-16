// controllers/cartController.js
import { Carts, CartItems } from '../db.js';

// Create a new cart
export const createCart = async (req, res) => {
    const userId = req.tokenData.userId;
    const { productId, quantity } = req.body;

    try {
        const newCart = await Carts.create({
            userId,
            CartItems: [
                {
                    productId,
                    quantity,
                },
            ],
        }, {
            include: [{ model: CartItems }],
        });

        res.status(201).json({ message: 'Cart created successfully', cart: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add items to a cart
export const addItemsToCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        // Check if the cart exists
        const cart = await Carts.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Create a new cart item
        const cartItem = await CartItems.create({
            cartId: cart.id,
            productId: req.body.productId,
            quantity: req.body.quantity,
        });

        res.status(201).json({ message: 'Item added to cart successfully', cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Remove items from a cart
export const removeItemFromCart = async (req, res) => {
    const { cartItemId } = req.params;

    try {
        const cartItem = await CartItems.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Get the associated cart
        const cart = await Carts.findByPk(cartItem.cartId);

        // Delete the cart item
        await cartItem.destroy();

        // Check if the cart is empty after removing the item
        const remainingItems = await CartItems.count({ where: { cartId: cart.id } });
        if (remainingItems === 0) {
            // If no items are left, delete the entire cart
            await cart.destroy();
            return res.json({ message: 'Cart and item removed successfully' });
        }

        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
