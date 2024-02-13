import express from 'express';
import { createChatroom, getAllChatrooms, getChatroomById } from '../../controllers/chat/chatroom.controller.js';
import { verifyTokenAndRole } from '../../middlewares/auth.js';

const router = express.Router();

// Route to create a new chatroom
router.post('/', verifyTokenAndRole(["admin", "user"]), createChatroom);

// Route to get all chatrooms
router.get('/all/', getAllChatrooms);

// Route to get a specific chatroom by ID
router.get('/:id', getChatroomById);

export default router;
