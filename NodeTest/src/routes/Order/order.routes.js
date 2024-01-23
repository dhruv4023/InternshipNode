// routes.js
import express from 'express';
import {
    purchaseItemUsingCart,
    getPurchaseHistory,
    getOrderListByCustomerName,
    orderProduct
} from '../../controller/order.controller.js';
import { verifyToken } from '../../middleware/auth.js';
import { verifyAdminToken } from '../../middleware/admin.js';

const routes = express.Router();


routes.post('/cart', verifyToken, purchaseItemUsingCart);
routes.post('/product', verifyToken, orderProduct);
routes.get('/history/', verifyToken, getPurchaseHistory);
routes.post('/bycustomer/', verifyToken, verifyAdminToken, getOrderListByCustomerName);

export default routes;
