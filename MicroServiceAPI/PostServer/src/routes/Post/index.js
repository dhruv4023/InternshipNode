import express from 'express';
const router = express.Router();

// importing base routes
import postRoutes from './post.routes.js';

// defining routes
router.use('/post', postRoutes);

// exporting router
export default router;
