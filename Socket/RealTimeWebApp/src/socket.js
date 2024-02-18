import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import config from "./config/config.js"
import { addMessageToChatRoom } from './services/message.service.js';

const userSocketMap = new Map();

export function setupSocketIO(server) {
    const io = new Server(server, { cors: { origin: '*' } });

    // Define socket.io logic
    io.on("connection", (socket) => {
        console.log("A user connected");

        // Extract token from headers
        const token = socket.handshake.auth.token;
        const chatRoomId = socket.handshake.auth.chatRoomId;
        let decoded;
        // Verify token
        try {
            decoded = jwt.verify(token, config.jwt_secret);
            if (userSocketMap.hasOwnProperty(chatRoomId)) {
                userSocketMap[chatRoomId].push(socket.id);
            } else {
                userSocketMap[chatRoomId] = [socket.id];
            }
        } catch (error) {
            socket.disconnect(); // Disconnect the socket if token verification fails
        }
        console.log(`Socket ${socket.id} joined chat room ${chatRoomId}`);

        // Handle messages from clients
        socket.on("message", async (message) => {
            try {
                const data = JSON.parse(message);
                const { chatRoomId } = data;
                data["sender"] = decoded.userId
                const resp = await addMessageToChatRoom({ ...data, userId: decoded.userId })
                // Assuming chatRoomId is available in the message data
                if (chatRoomId && userSocketMap.hasOwnProperty(chatRoomId)) {
                    const socketIds = userSocketMap[chatRoomId];
                    socketIds.forEach(socketId => {
                        console.log("sent to ", socketId)
                        io.to(socketId).emit("message", JSON.stringify(resp));
                    });
                    console.log(`Sent message to chat room ${chatRoomId}: ${message}`);
                } else {
                    console.log(`Chat room with ID ${chatRoomId} not found or no sockets associated`);
                }
            } catch (error) {
                console.log(error);
            }
        });

        // Handle disconnections
        socket.on("disconnect", () => {
            Object.keys(userSocketMap).forEach(chatRoomId => {
                userSocketMap[chatRoomId] = userSocketMap[chatRoomId].filter(id => id !== socket.id);
                if (userSocketMap[chatRoomId].length === 0) {
                    delete userSocketMap[chatRoomId];
                }
            });
            console.log(`Socket ${socket.id} disconnected`);
        });

    });
}
