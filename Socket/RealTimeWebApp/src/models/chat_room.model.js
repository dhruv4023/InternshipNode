import mongoose from "mongoose";
import messageSchema from "./message.model.js";

export default new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema] // Embed the messages schema within the chatroom schema
});

