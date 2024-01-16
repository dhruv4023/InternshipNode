// db.js
import { Sequelize } from 'sequelize';
import RoleModel from './models/Role.js';
import UserModel from './models/Users.js';
import ProductModel from './models/Products.js';
import OrderModel from './models/Orders.js';
import CartModel from './models/Carts.js';
import PurchasedItemsModel from './models/PurchasedItems.js';
import CartItemModel from './models/CartItem.js';

const sequelize = new Sequelize({
    // username: 'root',
    // password: '',
    // database: 'nodetst',
    // host: 'localhost',
    // dialect: 'mysql',
    username: 'postgres',
    password: 'admin',
    database: 'ecom', 
    host: 'localhost',
    dialect: 'postgres'
});


const Roles = RoleModel(sequelize, Sequelize);
const Users = UserModel(sequelize, Sequelize);
const Products = ProductModel(sequelize, Sequelize);
const Orders = OrderModel(sequelize, Sequelize);
const Carts = CartModel(sequelize, Sequelize);
const CartItems = CartItemModel(sequelize, Sequelize);
const PurchasedItems = PurchasedItemsModel(sequelize, Sequelize);

export { sequelize, PurchasedItems, CartItems, Carts, Roles, Users, Orders, Products };
