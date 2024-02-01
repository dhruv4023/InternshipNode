// Import necessary modules and models
import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getNestedComments,
} from '../../controllers/comments/comments.controller.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/post/:postId', getComments); // Get all comments for a specific post
router.get('/post/:postId/parent/:parentCommentId', getComments); // Get all comments for a specific post
router.get('/post/:postId/nested', getNestedComments); // Get all comments for a specific post

router.post('/post/:postId', verifyToken, createComment); // Create a new comment on a post
router.post('/post/:postId/parent/:parentCommentId', verifyToken, createComment); // Create a new comment on a post

router.put('/:commentId/', verifyToken, updateComment); // Update a specific comment
router.delete('/:commentId/', verifyToken, deleteComment); // Delete a specific comment

export default router;
