import express from 'express';
const router = express.Router();

// importing base routes
import orderRoutes from './order.routes.js';

// defining routes
router.use('/order', orderRoutes);

// exporting router
export default router;
