import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from 'sequelize';
import RoleModel from './models/Roles.js';
import UserModel from './models/Users.js';
import ProductModel from './models/Products.js';
import OrderModel from './models/Orders.js';
import CartModel from './models/Carts.js';
import PurchasedItemsModel from './models/PurchasedItems.js';
import CartItemModel from './models/CartItem.js';

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

const Roles = RoleModel(sequelize, Sequelize);
const Users = UserModel(sequelize, Sequelize);
const Products = ProductModel(sequelize, Sequelize);
const Orders = OrderModel(sequelize, Sequelize);
const Carts = CartModel(sequelize, Sequelize);
const CartItems = CartItemModel(sequelize, Sequelize);
const PurchasedItems = PurchasedItemsModel(sequelize, Sequelize);


// Roles -> Users
Roles.hasMany(Users, { foreignKey: "roleId" });
Users.belongsTo(Roles, { foreignKey: "roleId" });

// Users -> Carts
Users.hasMany(Carts, { foreignKey: "userId" });
Carts.belongsTo(Users, { foreignKey: "userId" });

// Users -> Orders
Users.hasMany(Orders, { foreignKey: "userId" });
Orders.belongsTo(Users, { foreignKey: "userId" });

// Users -> Products
Users.hasMany(Products, { foreignKey: "userId" });
Products.belongsTo(Users, { foreignKey: "userId" });

// Carts -> CartItem
Carts.hasMany(CartItems, { foreignKey: "cartId" });
CartItems.belongsTo(Carts, { foreignKey: "cartId" });

// Products -> CartItem
Products.hasMany(CartItems, { foreignKey: "productId" });
CartItems.belongsTo(Products, { foreignKey: "productId" });

// Products -> purchasedItems
Products.hasMany(PurchasedItems, { foreignKey: "productId" });
PurchasedItems.belongsTo(Products, { foreignKey: "productId" });

// Orders ->  purchasedItems
Orders.hasMany(PurchasedItems, { foreignKey: "orderId" });
PurchasedItems.belongsTo(Orders, { foreignKey: "orderId" });

export { sequelize, PurchasedItems, CartItems, Carts, Roles, Users, Orders, Products };
