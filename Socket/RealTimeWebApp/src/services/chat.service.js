import db from "../models/index.js";
const { ChatRooms } = db;

export const addNewChatRoom = async ({ name }) => {
    try {
        const chatroom = new ChatRooms({ name });
        return await chatroom.save();
    } catch (error) {
        throw error;
    }
}