import express from 'express';
const router = express.Router();

// importing base routes
import commentsRoutes from './comments.routes.js';

// defining routes
router.use('/comments', commentsRoutes);

// exporting router
export default router;