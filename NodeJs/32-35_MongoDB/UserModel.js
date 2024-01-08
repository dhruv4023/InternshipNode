const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            require: true,
            min: 2,
            unique: true,
        },
    },
    { timestamps: true }
);
const users = mongoose.model("Users", userSchema);
module.exports = users;
