const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// const DB_URL = 'mongodb://127.0.0.1:27017/tst_db';
const DB_URL = 'mongodb+srv://dhruv20345:<password>@cluster0.zfpy9ys.mongodb.net/'; // add password to access database
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB database connected");
    })
    .catch((e) => {
        console.log("db not connected");
    });
