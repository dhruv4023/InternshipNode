import db from "../models/index.js";
import mongoose from "mongoose";

const { ChatRooms } = db;

export const addMessageToChatRoom = async ({ chatRoomId, userId, content }) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if the chatroom exists
        const chatroom = await ChatRooms.findOne({ _id: chatRoomId }, { _id: 1 }).session(session);
        if (!chatroom) {
            throw new Error('Chatroom not found');
        }

        // Create the message
        const message = { sender: userId, content };

        // Add the message to the chatroom's messages array
        const updateResult = await ChatRooms.updateOne(
            { "_id": chatRoomId },
            { "$push": { "messages": { "$each": [message], "$position": 0 } } }
        ).session(session);

        if (updateResult.nModified === 0) {
            throw new Error('Failed to add message to chatroom');
        }
        
        await session.commitTransaction();
        session.endSession();

        return message;
    } catch (error) {
        console.error('Error adding message to chatroom:', error);
        await session.abortTransaction();
        session.endSession();
        throw error; // Propagate the error to the caller
    }
}
