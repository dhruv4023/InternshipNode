import express from 'express';
import { createMessage, getMessagesByChatroomId } from '../../controllers/chat/message.controller.js';
import { verifyTokenAndRole } from '../../middlewares/auth.js';

const router = express.Router();

// Route to create a new message in a chatroom
router.post('/chatrooms/:id', verifyTokenAndRole(["admin", "user"]), createMessage);

// Route to get all messages in a chatroom
router.get('/chatrooms/:id', getMessagesByChatroomId);

export default router;
