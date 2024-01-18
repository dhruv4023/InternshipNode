// routes.js
import express from 'express';
import {
    createCart,
    addItemsToCart,
    removeItemFromCart,
    getAllCarts,
} from '../../controller/cart.controller.js';
import { verifyToken } from '../../middleware/auth.js';

const router = express.Router();

router.use(verifyToken)

// Cart routes
router.post('/create', createCart); // Create a new cart
router.get('/retrive', getAllCarts); // Create a new cart

// Cart items routes
router.post('/:cartId/items', addItemsToCart); // Add items to a cart
router.delete('/items/:cartItemId', removeItemFromCart); // Remove items from a cart

export default router;
