// routes.js
import express from 'express';
import {
    purchaseItemUsingCart,
    getPurchaseHistory, getOrderListByCustomerName
} from '../controller/purchaseItems.js';
import { verifyToken } from '../middleware/auth.js';
import { verifyAdminToken } from '../middleware/admin.js';

const routes = express.Router();

routes.use(verifyToken)

routes.post('/order/cart', purchaseItemUsingCart);
routes.get('/order/history/', getPurchaseHistory);
routes.post('/order/bycustomer/',verifyAdminToken, getOrderListByCustomerName);

export default routes;
