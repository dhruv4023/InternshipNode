// routes.js

import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUserId,
} from '../../controllers/post.controller.js';
import { verifyToken } from '../../middlewares/auth.js';
import upload from '../../middlewares/file_uploder.js';

const router = express.Router();

// Define routes
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.get('/user/:userId', getPostsByUserId);
router.post('/', verifyToken, upload.array("imgs"), createPost);
router.put('/:postId', verifyToken, upload.array("imgs"), updatePost);
router.delete('/:postId', verifyToken, deletePost);

export default router;
