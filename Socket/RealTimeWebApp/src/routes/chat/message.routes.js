import express from 'express';
import { createMessage, getMessagesByChatroomId } from '../../controllers/chat/message.controller.js';
import { verifyTokenAndRole } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/chatrooms/:id', verifyTokenAndRole(["admin", "user"]), createMessage);

router.get('/chatrooms/:id', verifyTokenAndRole(["admin", "user"]), getMessagesByChatroomId);

export default router;
