import express from 'express';
const router = express.Router();

// importing base routes
import chatRoomRoutes from './chat_room.routes.js';
import messageRoutes from './message.routes.js';

// defining routes
router.use('/chat/room', chatRoomRoutes);
router.use('/chat/message', messageRoutes);

// exporting router
export default router;
