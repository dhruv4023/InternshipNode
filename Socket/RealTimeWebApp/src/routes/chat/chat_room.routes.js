import express from 'express';
import { createChatroom, getAllChatroomsByUser, getChatroomById, deleteChatroomById, updateChatroomNameById } from '../../controllers/chat/chatroom.controller.js';
import { verifyTokenAndRole } from '../../middlewares/auth.js';

const router = express.Router();

// Route to create a new chatroom
router.post('/', verifyTokenAndRole(["admin", "user"]), createChatroom);

// Route to get all chatrooms
router.get('/all/', verifyTokenAndRole(["user", "admin"]), getAllChatroomsByUser);

// Route to get a specific chatroom by ID
router.get('/:id', verifyTokenAndRole(["user", "admin"]), getChatroomById);

// Route to delete a specific chatroom by ID
router.delete('/:id', verifyTokenAndRole(["user", "admin"]), deleteChatroomById);

// Add route to update the name of a specific chatroom by ID
router.put('/:id/name', verifyTokenAndRole(["user", "admin"]), updateChatroomNameById);

export default router;
