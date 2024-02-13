import db from "../../models/index.js";
const { ChatRooms } = db;
import RESPONSE from '../../helpers/response.helper.js';
import { getPaginationMetadata, getPaginatedResponse } from '../../helpers/pagination.helper.js';
import { addNewChatRoom } from "../../services/chat.service.js";


// Controller function to create a new chatroom
export const createChatroom = async (req, res) => {
    try {
        const { name } = req.body;
        const chatRoom = await addNewChatRoom({ name })
        return RESPONSE.success(res, 4102, chatRoom, 201); // Chatroom created successfully
    } catch (error) {
        console.error('Error creating chatroom:', error);
        return RESPONSE.error(res, 9999); // Internal server error
    }
}

// Controller function to get all chatrooms with pagination
export const getAllChatrooms = async (req, res) => {
    try {
        const { query: { page = 0, limit = 5 } } = req
        const { startIndex } = getPaginationMetadata(req.query);
        const chatrooms = await ChatRooms.find({}, { _id: 1, name: 1 }).skip(startIndex).limit(limit);
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
        const { params: { id }, query: { limit = 5 } } = req;
        console.log(id)
        const chatroom = await ChatRooms.findOne({ _id: id }, { "messages": { "$slice": [(0), parseInt(limit)] } });
        console.log(chatroom)
        if (!chatroom) {
            return RESPONSE.error(res, 4103, 404); // Chatroom not found
        }
        return RESPONSE.success(res, 4101, chatroom); // Chatroom retrieved successfully
    } catch (error) {
        console.error('Error fetching chatroom:', error);
        return RESPONSE.error(res, 9999); // Internal server error
    }
}
