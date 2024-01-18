import express from 'express';
const router = express.Router();

// importing base routes
import productRoutes from './product.routes.js';

// defining routes
router.use('/product', productRoutes);

// exporting router
export default router;
