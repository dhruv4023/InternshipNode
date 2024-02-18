import db from "../../models/index.js";
const { ChatRooms } = db;
import RESPONSE from '../../helpers/response.helper.js';
import { addNewChatRoom } from "../../services/chat.service.js";


// Controller function to create a new chatroom
export const createChatroom = async (req, res) => {
    try {
        const { tokenData: { userId }, body: { name, anotherUserId } } = req;
        const chatRoom = await addNewChatRoom({ name, users: [userId, anotherUserId] })

        return RESPONSE.success(res, 4102, chatRoom, 201); // Chatroom created successfully
    } catch (error) {
        return RESPONSE.error(res, 9999); // Internal server error
    }
}
export const getAllChatroomsByUser = async (req, res) => {
    try {
        const { tokenData: { userId } } = req;

        // Fetch chatrooms where the user ID exists in the users array
        const chatrooms = await ChatRooms.find({ users: userId }, { _id: 1, name: 1 })
        
        return RESPONSE.success(res, 4101, chatrooms); // Chatrooms retrieved successfully
    } catch (error) {
        return RESPONSE.error(res, 9999); // Internal server error
    }
}


// Controller function to get a specific chatroom by ID
export const getChatroomById = async (req, res) => {
    try {
        const { tokenData: { userId }, params: { id }, query: { limit = 5 } } = req;

        const chatroom = await ChatRooms.findOne({ _id: id, users: userId }, { "messages": { "$slice": [(0), parseInt(limit)] } });

        if (!chatroom) {
            return RESPONSE.error(res, 4103, 404); // Chatroom not found
        }

        chatroom.messages.sort((b, a) => b.timestamp - a.timestamp);
        return RESPONSE.success(res, 4101, chatroom); // Chatroom retrieved successfully
    } catch (error) {
        return RESPONSE.error(res, 9999); // Internal server error
    }
}
