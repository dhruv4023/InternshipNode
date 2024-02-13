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

import messagesSchema from "./message.model.js";
import chatRoomSchema from "./chat_room.model.js";

const db = {
    Messages: mongoose.model("Messages", messagesSchema),
    ChatRooms: mongoose.model("ChatRooms", chatRoomSchema),
}

db.mongoose = mongoose
export default db;
