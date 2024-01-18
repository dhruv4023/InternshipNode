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

import api_logs from './middleware/api_logs.model.js';
import RolesModel from "./User/Roles.model.js";
import UsersModel from "./User/Users.model.js";
import ProductsModel from "./Product/Products.model.js";
import OrdersModel from "./Order/Orders.model.js";
import CartsModel from "./Cart/Carts.model.js";
import CartItemModel from "./Cart/CartItem.model.js";
import PurchasedItemsModel from "./Order/PurchasedItems.model.js";

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    api_logs: api_logs(sequelize, Sequelize),
    Roles: RolesModel(sequelize, Sequelize),
    Users: UsersModel(sequelize, Sequelize),
    Products: ProductsModel(sequelize, Sequelize),
    Orders: OrdersModel(sequelize, Sequelize),
    Carts: CartsModel(sequelize, Sequelize),
    CartItems: CartItemModel(sequelize, Sequelize),
    PurchasedItems: PurchasedItemsModel(sequelize, Sequelize),
}

// Roles -> Users
db.Roles.hasMany(db.Users, { foreignKey: "roleId" });
db.Users.belongsTo(db.Roles, { foreignKey: "roleId" });

// Users -> Carts
db.Users.hasMany(db.Carts, { foreignKey: "userId" });
db.Carts.belongsTo(db.Users, { foreignKey: "userId" });

// Users -> Orders
db.Users.hasMany(db.Orders, { foreignKey: "userId" });
db.Orders.belongsTo(db.Users, { foreignKey: "userId" });

// Users -> Products
db.Users.hasMany(db.Products, { foreignKey: "userId" });
db.Products.belongsTo(db.Users, { foreignKey: "userId" });

// Carts -> CartItem
db.Carts.hasMany(db.CartItems, { foreignKey: "cartId" });
db.CartItems.belongsTo(db.Carts, { foreignKey: "cartId" });

// Products -> CartItem
db.Products.hasMany(db.CartItems, { foreignKey: "productId" });
db.CartItems.belongsTo(db.Products, { foreignKey: "productId" });

// Products -> purchasedItems
db.Products.hasMany(db.PurchasedItems, { foreignKey: "productId" });
db.PurchasedItems.belongsTo(db.Products, { foreignKey: "productId" });

// Orders ->  purchasedItems
db.Orders.hasMany(db.PurchasedItems, { foreignKey: "orderId" });
db.PurchasedItems.belongsTo(db.Orders, { foreignKey: "orderId" });


db.sequelize.sync();

export default db