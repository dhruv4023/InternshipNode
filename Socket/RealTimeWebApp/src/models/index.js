import mongoose from "mongoose";
import config from "../config/config.js";

mongoose.set("strictQuery", true);

mongoose
    .connect(config.database.db_url, {
        dbName: config.database.db_name,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB database connected");
    })
    .catch((e) => {
        console.log("db not connected: ", e);
    });
import chatRoomSchema from "./chat_room.model.js";
import messagesSchema from "./message.model.js";

const db = {
    ChatRooms: mongoose.model("ChatRoom", chatRoomSchema),
    Messages: mongoose.model("Message", messagesSchema)
}

export default db;
