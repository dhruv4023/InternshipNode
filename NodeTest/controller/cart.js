// controllers/cartController.js
import { Carts, CartItems } from '../db.js'; // Import your models
import { addItemToCart } from '../services/cart.js';

// Create a new cart
export const createCart = async (req, res) => {
    const userId = req.tokenData.userId
    console.log(userId)
    try {
        const newCart = await Carts.create({
            userId,
        });
        addItemToCart({ cartId: newCart.id, ...req.body })
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add items to a cart
export const addItemsToCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cart = await Carts.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const cartItem=await addItemToCart({ cartId: cart.id, ...req.body })

        res.status(201).json(cartItem);
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

        await cartItem.destroy();
        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
