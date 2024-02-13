import db from "../../models/index.js"
import { getPaginationMetadata, getPaginatedResponse } from '../../helpers/pagination.helper.js';
const { Messages, ChatRooms } = db

// Controller function to create a new message in a chatroom
export const createMessage = async (req, res) => {
    try {
        const { chatroomId } = req.params;
        const { sender, content } = req.body;

        // Check if the chatroom exists
        const chatroomExists = await ChatRooms.exists({ _id: chatroomId });
        if (!chatroomExists) {
            return res.status(404).json({ error: 'Chatroom not found' });
        }

        const message = new Messages({ chatroomId, sender, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Controller function to get all messages in a chatroom with pagination
export const getMessagesByChatroomId = async (req, res) => {
    try {
        const { chatroomId } = req.params;

        // Get pagination metadata from query parameters
        const { page, limit, offset } = getPaginationMetadata(req.query);

        // Query messages for the specified chatroom with pagination
        const messages = await Messages.find({ chatroomId }).skip(offset).limit(limit);
        
        // Get total count of messages for the chatroom (for pagination)
        const totalCount = await Messages.count({ chatroomId });

        // Construct paginated response
        const paginatedResponse = getPaginatedResponse(messages, page, limit, totalCount);

        // Send paginated response
        res.json(paginatedResponse);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
