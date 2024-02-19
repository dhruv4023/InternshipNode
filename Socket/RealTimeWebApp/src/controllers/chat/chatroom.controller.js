import db from "../../models/index.js";
const { ChatRooms } = db;
import RESPONSE from '../../helpers/response.helper.js';
import { addNewChatRoom } from "../../services/chat.service.js";

import isValidData from "../../helpers/validation/data_validator.js";

// Controller function to create a new chatroom
export const createChatroom = async (req, res) => {

    const validationErr = await isValidData(req.body, {
        name: 'required|string',
        anotherUserId: 'required',
    })
    if (validationErr)
        return RESPONSE.error(res, validationErr);

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

// Controller function to delete a specific chatroom by ID
export const deleteChatroomById = async (req, res) => {
    try {
        const { tokenData: { userId }, params: { id } } = req;

        // Find the chatroom by ID and ensure that the user is one of the participants
        const chatroom = await ChatRooms.findOne({ _id: id, users: userId });

        if (!chatroom) {
            return RESPONSE.error(res, 4103, 404); // Chatroom not found or user is not authorized to delete
        }

        // Delete the chatroom
        await ChatRooms.deleteOne({ _id: id });

        return RESPONSE.success(res, 4105); // Chatroom deleted successfully
    } catch (error) {
        return RESPONSE.error(res, 9999); // Internal server error
    }
}


// controller function to update the name of a chatroom by ID
export const updateChatroomNameById = async (req, res) => {
    const validationErr = await isValidData(req.body, {
        name: 'required|string',
    })
    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {
        const { tokenData: { userId }, params: { id }, body: { name } } = req;

        // Find the chatroom by ID and ensure that the user is one of the participants
        let chatroom = await ChatRooms.findOne({ _id: id, users: userId });

        if (!chatroom) {
            return RESPONSE.error(res, 4103, 404); // Chatroom not found or user is not authorized to update
        }
        await ChatRooms.findOneAndUpdate({ _id: id, users: userId }, { $set: { name } });

        return RESPONSE.success(res, 4104); // Chatroom name updated successfully
    } catch (error) {
        return RESPONSE.error(res, 9999); // Internal server error
    }
}
