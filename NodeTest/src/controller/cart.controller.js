import Validator from 'validatorjs';

import db from '../models/index.js';
import RESPONSE from '../helper/response.helper.js';

const { Carts, CartItems, Products, Users, sequelize } = db;

// Create a new cart
export const createCart = async (req, res) => {

    let validation = new Validator({ ...req.body, ...req.tokenData }, {
        userId: 'required|integer|min:1',
        productId: 'required|integer|min:1',
        quantity: 'required|integer|min:1'
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const {
            tokenData: { userId }
        } = req;

        const newCart = await Carts.create({
            userId,
            cart_items: [req.body],
        }, {
            include: [{ model: CartItems }],
        });

        RESPONSE.success(res, 2001, { cart: newCart }, 201);
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Add items to a cart
export const addItemsToCart = async (req, res) => {

    let validation = new Validator({ ...req.params, ...req.body, ...req.tokenData }, {
        userId: 'required|integer|min:1',
        cartId: 'required|integer|min:1',
        productId: 'required|integer|min:1',
        quantity: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const {
            tokenData: { userId },
            params: { cartId },
            body: { productId, quantity }
        } = req
        // Check if the product exists
        if (!(await Products.findOne({ where: { id: productId } })))
            return RESPONSE.error(res, 3009, 404);

        // Check if the cart exists
        const cart = await Carts.findOne({ where: { id: cartId } });

        if (!cart)
            return RESPONSE.error(res, 2003, 404);

        if (cart.userId !== userId)
            return RESPONSE.error(res, 2007, 403);

        // Create a new cart item
        const cartItem = await CartItems.create({
            cartId: cart.id,
            productId,
            quantity,
        });

        RESPONSE.success(res, 2002, { cartItem }, 201);
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Remove items from a cart
export const removeItemFromCart = async (req, res) => {

    let validation = new Validator({ ...req.params, ...req.tokenData }, {
        userId: 'required|integer|min:1',
        cartItemId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const {
            tokenData: { userId },
            params: { cartItemId },
        } = req;

        const t = await sequelize.transaction(); // Start a transaction

        try {
            // Find the cart item within the transaction
            const cartItem = await CartItems.findOne({ where: { id: cartItemId }, transaction: t });

            if (!cartItem) {
                await t.rollback();
                return RESPONSE.error(res, 2004, 404);
            }

            // Get the associated cart within the transaction
            const cart = await Carts.findOne({ where: { id: cartItem.cartId }, transaction: t });

            if (cart.userId !== userId) {
                await t.rollback();
                return RESPONSE.error(res, 2007, 403);
            }

            // Delete the cart item within the transaction
            await cartItem.destroy({ transaction: t });

            // Check if the cart is empty after removing the item within the transaction
            const remainingItems = await CartItems.count({ where: { cartId: cart.id }, transaction: t });

            if (remainingItems === 0) {
                // If no items are left, delete the entire cart within the transaction
                await cart.destroy({ transaction: t });
                await t.commit(); // Commit the transaction
                return RESPONSE.success(res, 2005);
            }

            await t.commit(); // Commit the transaction
            RESPONSE.success(res, 2006);
        } catch (error) {
            await t.rollback(); // Rollback the transaction on error
            RESPONSE.error(res, 9999, 500, error);
        }
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};

export const getAllCarts = async (req, res) => {

    let validation = new Validator(req.tokenData, {
        userId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {

        const userCarts = await Carts.findAll({
            where: req.tokenData,
            include: [{
                model: CartItems,
                include: [{
                    model: Products,
                    include: [{ model: Users }],
                }],
            }],
        });

        RESPONSE.success(res, 2008, userCarts);
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error)
    }
};
