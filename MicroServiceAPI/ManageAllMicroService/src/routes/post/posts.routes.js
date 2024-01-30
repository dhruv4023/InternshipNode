// routes.js

import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../../controllers/post.controller.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

// Define routes
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.post('/', verifyToken, createPost);
router.put('/:postId', verifyToken, updatePost);
router.delete('/:postId', verifyToken, deletePost);

export default router;
