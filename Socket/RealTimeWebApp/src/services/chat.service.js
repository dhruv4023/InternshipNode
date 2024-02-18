import db from "../models/index.js";
const { ChatRooms } = db;

export const addNewChatRoom = async ({ name, users }) => {
    try {
        const chatroom = new ChatRooms({ name, users });
        return await chatroom.save();
    } catch (error) {
        throw error;
    }
}