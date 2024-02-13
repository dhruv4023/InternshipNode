import db from "../../models/index.js";
import { getPaginationMetadata, getPaginatedResponse } from '../../helpers/pagination.helper.js';
import mongoose from "mongoose";
import RESPONSE from "../../helpers/response.helper.js";
const { ChatRooms } = db;

// Controller function to create a new message in a chatroom
export const createMessage = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            params: { id },
            body: { content },
            tokenData: { userId }
        } = req;
        // Check if the chatroom exists
        const chatroom = await ChatRooms.findOne({ _id: id }, { _id: 1 }).session(session);
        if (!chatroom) {
            throw new Error('Chatroom not found');
        }

        // Create the message
        const message = { sender: userId, content };

        // Add the message to the chatroom's messages array
        const query = { "_id": id }
        const update = {
            "$push": { "messages": { "$each": [message], "$position": 0 } },
        }
        console.log(await ChatRooms.updateOne(query, update).session(session))

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(message); // Return the newly created message
    } catch (error) {
        console.error('Error creating message:', error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get all messages in a chatroom with pagination
export const getMessagesByChatroomId = async (req, res) => {
    try {
        const { params: { id }, query: { page, limit } } = req;
        const { startIndex, endIndex } = getPaginationMetadata(req.query)
        console.log(startIndex,endIndex)
        const chatroom = await ChatRooms.findOne({ _id: id }, {
            "messages": { "$slice": [startIndex, endIndex] }
        });
        const paginatedResponse = getPaginatedResponse(chatroom.messages, page, limit)
        RESPONSE.success(res, 4201, paginatedResponse)
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
