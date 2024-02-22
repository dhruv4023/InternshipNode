import express from 'express';
const router = express.Router();

import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

export default router;
  