// controllers/cartController.js

import db from '../models/index.js';
import RESPONSE from '../Helper/Response.js';
import isValidBody from '../Helper/body_validation.js';
const { Carts, CartItems, Products, Users } = db;
// Create a new cart
export const createCart = async (req, res) => {
    const { userId } = req.tokenData;
    const { productId, quantity } = req.body;

    if (await isValidBody(req.tokenData, res, {
        userId: 'required|integer|min:1',
    })) return;

    if (await isValidBody(req.body, res, {
        productId: 'required|integer|min:1',
        quantity: 'required|integer|min:1',
    })) return;

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

        RESPONSE.success(res, 2001, { cart: newCart }, 201);
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Add items to a cart
export const addItemsToCart = async (req, res) => {
    const { userId } = req.tokenData;
    const { cartId } = req.params;

    if (await isValidBody(req.tokenData, res, {
        userId: 'required|integer|min:1',
    })) return;

    if (await isValidBody(req.params, res, {
        cartId: 'required|integer|min:1',
    })) return;

    try {
        // Check if the cart exists
        const cart = await Carts.findByPk(cartId);
        if (!cart) {
            return RESPONSE.error(res, 2003, 404);
        }

        if (cart.userId !== userId) {
            return RESPONSE.error(res, 2007, 403);
        }

        // Create a new cart item
        const cartItem = await CartItems.create({
            cartId: cart.id,
            productId: req.body.productId,
            quantity: req.body.quantity,
        });

        RESPONSE.success(res, 2002, { cartItem }, 201);
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Remove items from a cart
export const removeItemFromCart = async (req, res) => {
    const { userId } = req.tokenData;
    const { cartItemId } = req.params;

    if (await isValidBody(req.tokenData, res, {
        userId: 'required|integer|min:1',
    })) return;

    if (await isValidBody(req.params, res, {
        cartItemId: 'required|integer|min:1',
    })) return;


    try {
        const cartItem = await CartItems.findByPk(cartItemId);
        if (!cartItem) {
            return RESPONSE.error(res, 2004, 404);
        }

        // Get the associated cart
        const cart = await Carts.findByPk(cartItem.cartId);

        if (cart.userId !== userId) {
            return RESPONSE.error(res, 2007, 403);
        }

        // Delete the cart item
        await cartItem.destroy();

        // Check if the cart is empty after removing the item
        const remainingItems = await CartItems.count({ where: { cartId: cart.id } });
        if (remainingItems === 0) {
            // If no items are left, delete the entire cart
            await cart.destroy();
            return RESPONSE.success(res, 2005);
        }

        RESPONSE.success(res, 2006);
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error)
    }
};

export const getAllCarts = async (req, res) => {
    try {
        const { userId } = req.tokenData;

        if (await isValidBody(req.tokenData, res, {
            userId: 'required|integer|min:1',
        })) return;

        const userCarts = await Carts.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: CartItems,
                    include: [
                        {
                            model: Products
                            , include: [
                                {
                                    model: Users
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        RESPONSE.success(res, 2008, userCarts);
    } catch (error) {
        // Handle errors
        console.error(error);
        RESPONSE.error(res, 9999, 500, error)
    }
};
