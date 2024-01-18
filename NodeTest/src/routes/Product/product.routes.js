// routes.js

import express from 'express';
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct
} from '../../controller/product.controller.js';
import { verifyAdminToken } from '../../middleware/admin.js';

const router = express.Router();

// Route to add a product
router.post('/add', verifyAdminToken, addProduct);

// Route to update a product
router.put('/update/:productId', verifyAdminToken, updateProduct);

// Route to delete a product
router.delete('/delete/:productId', verifyAdminToken, deleteProduct);

// Route to get a list of all products with pagination and filters
router.get('/retrive', getAllProducts);

// Route to get a single product
router.get('/retrive/:productId', getSingleProduct);

export default router;
