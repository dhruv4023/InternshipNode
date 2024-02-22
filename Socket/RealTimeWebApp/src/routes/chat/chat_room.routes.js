import express from 'express';
import { createChatroom, getAllChatroomsByUser, getChatroomById, deleteChatroomById, updateChatroomNameById } from '../../controllers/chat/chatroom.controller.js';
import { verifyTokenAndRole } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyTokenAndRole(["admin", "user"]), createChatroom);

router.get('/all/', verifyTokenAndRole(["user", "admin"]), getAllChatroomsByUser);

router.get('/:id', verifyTokenAndRole(["user", "admin"]), getChatroomById);

router.delete('/:id', verifyTokenAndRole(["user", "admin"]), deleteChatroomById);

router.put('/:id/name', verifyTokenAndRole(["user", "admin"]), updateChatroomNameById);

export default router;
