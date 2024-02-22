import db from "../../models/index.js";
import { getPaginationMetadata, getPaginatedResponse } from '../../helpers/pagination.helper.js';
import RESPONSE from "../../helpers/response.helper.js";
import { addMessageToChatRoom } from '../../services/message.service.js';
import isValidData from "../../helpers/validation/data_validator.js";

const { ChatRooms } = db;

export const createMessage = async (req, res) => {
    const validationErr = await isValidData(req.body, {
        content: 'required|string',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {
        const {
            params: { id },
            body: { content },
            tokenData: { userId }
        } = req;

        const message = await addMessageToChatRoom({ chatRoomId: id, userId, content });

        RESPONSE.success(res, 4202, message)
    } catch (error) {
        RESPONSE.error(res, 9000)
    }
}

// Controller function to get all messages in a chatroom with pagination
export const getMessagesByChatroomId = async (req, res) => {
    try {
        const { params: { id }, query: { page, limit } } = req;
        const { startIndex, endIndex } = getPaginationMetadata(req.query)
        const chatroom = await ChatRooms.findOne({ _id: id }, { "messages": { "$slice": [startIndex, endIndex] } });

        if (!chatroom) return RESPONSE.error(res, 4103, 404);

        chatroom.messages.sort((b, a) => b.timestamp - a.timestamp);
        const paginatedResponse = getPaginatedResponse(chatroom.messages, page, limit)
        RESPONSE.success(res, 4201, paginatedResponse)
    } catch (error) {
        RESPONSE.error(res, 9000)
    }
}
