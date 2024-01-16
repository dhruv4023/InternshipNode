// routes.js

import express from 'express';
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct
} from '../controller/product.js';
import { verifyAdminToken } from '../middleware/admin.js';

const router = express.Router();

// Route to add a product
router.post('/product', verifyAdminToken, addProduct);

// Route to update a product
router.put('/product/:productId', verifyAdminToken, updateProduct);

// Route to delete a product
router.delete('/product/:productId', verifyAdminToken, deleteProduct);

// Route to get a list of all products with pagination and filters
router.get('/product', getAllProducts);

// Route to get a single product
router.get('/product/:productId', getSingleProduct);

export default router;
