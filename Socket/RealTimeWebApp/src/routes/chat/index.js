import express from 'express';
const router = express.Router();

import chatRoomRoutes from './chat_room.routes.js';
import messageRoutes from './message.routes.js';

router.use('/chat/room', chatRoomRoutes);

router.use('/chat/message', messageRoutes);

export default router;
