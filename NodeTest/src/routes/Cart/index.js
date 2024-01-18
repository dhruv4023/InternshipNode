import express from 'express';
const router = express.Router();

// importing base routes
import cartRoutes from './cart.routes.js';

// defining routes
router.use('/cart', cartRoutes);

// exporting router
export default router;
