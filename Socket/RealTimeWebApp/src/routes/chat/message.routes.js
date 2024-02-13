import express from 'express';
import { createMessage, getMessagesByChatroomId } from '../../controllers/chat/message.controller.js';

const router = express.Router();

// Route to create a new message in a chatroom
router.post('/chatrooms/:chatroomId/messages', createMessage);

// Route to get all messages in a chatroom
router.get('/chatrooms/:chatroomId/messages', getMessagesByChatroomId);

export default router;
