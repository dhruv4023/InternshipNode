import mongoose from "mongoose";

// Define the schema for chatrooms
export default new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  messages: [] // Embed the messages schema
});



