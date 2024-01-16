// routes.js
import express from 'express';
import {
    createCart,
    addItemsToCart,
    removeItemFromCart,
} from '../controller/cart.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken)

// Cart routes
router.post('/cart', createCart); // Create a new cart

// Cart items routes
router.post('/cart/:cartId/items', addItemsToCart); // Add items to a cart
router.delete('/cart/items/:cartItemId', removeItemFromCart); // Remove items from a cart

export default router;
