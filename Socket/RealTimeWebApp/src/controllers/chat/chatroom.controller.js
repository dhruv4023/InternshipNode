import db from "../../models/index.js";
import RESPONSE from '../../helpers/response.helper.js';
import { getPaginationMetadata, getPaginatedResponse } from '../../helpers/pagination.helper.js';

const { Messages, ChatRooms } = db;

// Controller function to create a new chatroom
export const createChatroom = async (req, res) => {
    try {
        const { name } = req.body;
        const chatroom = new ChatRooms({ name });
        await chatroom.save();
        return RESPONSE.success(res, 4102, chatroom, 201); // Chatroom created successfully
    } catch (error) {
        console.error('Error creating chatroom:', error);
        return RESPONSE.error(res, 9999); // Internal server error
    }
}

// Controller function to get all chatrooms with pagination
export const getAllChatrooms = async (req, res) => {
    try {
        const { page, limit, offset } = getPaginationMetadata(req.query);
        const chatrooms = await ChatRooms.find().skip(offset).limit(limit);
        const totalCount = await ChatRooms.countDocuments();
        const paginatedResponse = getPaginatedResponse(chatrooms, page, limit, totalCount);
        return RESPONSE.success(res, 4101, paginatedResponse); // Chatrooms retrieved successfully
    } catch (error) {
        console.error('Error fetching chatrooms:', error);
        return RESPONSE.error(res, 9999); // Internal server error
    }
}

// Controller function to get a specific chatroom by ID
export const getChatroomById = async (req, res) => {
    try {
        const { id } = req.params;
        const chatroom = await ChatRooms.findById(id);
        if (!chatroom) {
            return RESPONSE.error(res, 4103, 404); // Chatroom not found
        }
        return RESPONSE.success(res, 4101, chatroom); // Chatroom retrieved successfully
    } catch (error) {
        console.error('Error fetching chatroom:', error);
        return RESPONSE.error(res, 9999); // Internal server error
    }
}
