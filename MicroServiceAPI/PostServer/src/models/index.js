import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from 'sequelize';
import config from "../config/config.js";

// master database connection
const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect,
        port: config.database.port,
        operatorsAliases: 0,
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000,
        },
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

import postModel from "./Post/post.model.js";
import api_logsModel from "./middleware/api_logs.model.js";
import imageModel from "./images/image.model.js";

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    ApiLogs: api_logsModel(sequelize, Sequelize),
    Posts: postModel(sequelize, Sequelize),
    Images: imageModel(sequelize, Sequelize)
}

db.Posts.hasMany(db.Images, { as: 'images', foreignKey: 'postId' });
db.Images.belongsTo(db.Posts, { foreignKey: 'postId' });

db.sequelize.sync();

export default db