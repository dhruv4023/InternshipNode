// Import necessary modules and models
import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../../controllers/comments.controller.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

// Routes for comments
router.get('/:postId/comments', getComments); // Get all comments for a specific post
router.post('/:postId/comments', verifyToken, createComment); // Create a new comment on a post
router.put('/:postId/comments/:commentId', verifyToken, updateComment); // Update a specific comment
router.delete('/:postId/comments/:commentId', verifyToken, deleteComment); // Delete a specific comment

export default router;
