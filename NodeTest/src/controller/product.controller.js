
import { Op, where } from 'sequelize';
import RESPONSE from '../helper/response.js';
import db from '../models/index.js';
import { getPaginatedResponse, getPaginationMetadata } from '../helper/paginationhelper.js';
import isValidData from '../helper/bodyValidation.js';

const { Products, Users } = db
// Controller function to add a new product
export const addProduct = async (req, res) => {
    try {
        const {
            body: { name, description, price, quantity },
            tokenData: { userId }
        } = req;

        if (await isValidData({ ...req.tokenData, ...req.body }, res, {
            userId: 'required|integer|min:1',
            name: 'required|string|min:2|max:255',
            description: 'required|string|min:5|max:1000',
            price: 'required|numeric|min:0',
            quantity: 'required|integer|min:1',
        })) return;

        // Validate required fields
        if (!name || !price || !quantity) {
            return RESPONSE.error(res, 3001, 400);
        }

        // Create a new product in the database
        const newProduct = await Products.create({
            name,
            description,
            price,
            quantity,
            userId,
        });

        RESPONSE.success(res, 3002, { product: newProduct });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to update an existing product
export const updateProduct = async (req, res) => {
    try {
        const {
            tokenData: { userId },
            params: { productId },
            body: { name, description, price, quantity },
        } = req;

        if (await isValidData({ ...req.params, ...req.body, ...req.tokenData }, res, {
            userId: 'required|integer|min:1',
            productId: 'required|integer|min:1',
            name: 'required|string|min:2|max:255',
            description: 'required|string|min:5|max:1000',
            price: 'required|numeric|min:0',
            quantity: 'required|integer|min:1',
        })) return;

        // Validate required fields
        if (!name || !price || !quantity) {
            return RESPONSE.error(res, 3001, 400);
        }

        // Update the product in the database
        const [updatedRowsCount] = await Products.update(
            { name, description, price, quantity },
            { where: { id: productId, userId: userId } }
        );

        if (updatedRowsCount === 0) {
            return RESPONSE.error(res, 3003, 404);
        }

        const updatedProduct = await Products.findOne({ where: { id: productId } });
        RESPONSE.success(res, 3004, { product: updatedProduct });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { params: { productId }, tokenData: { userId } } = req;

        if (await isValidData({ ...req.tokenData, ...req.params }, res, {
            userId: 'required|integer|min:1',
            productId: 'required|integer|min:1',
        })) return;

        // Delete the product from the database
        const deletedRowCount = await Products.destroy({ where: { id: productId, userId: userId } });

        if (deletedRowCount === 0) {
            return RESPONSE.error(res, 3003, 404);
        }

        RESPONSE.success(res, 3005);
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to get all products
export const getAllProducts = async (req, res) => {
    try {
        const { query: { name, orderBy } } = req;

        if (await isValidData(req.params, res, {
            name: 'string',
            orderBy: 'string',
            page: 'integer|min:1',
            limit: 'integer|min:1',
        })) return;

        const { page, limit, offset } = getPaginationMetadata(req.query);

        const order = orderBy ? [[orderBy, 'ASC']] : [];

        const products = await Products.findAndCountAll({
            where: name ? { name: { [Op.like]: `%${name}%` } } : {},
            order,
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{ model: Users }]
        });
        RESPONSE.success(res, 3006, getPaginatedResponse(products, page, limit));
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to get a single product by ID
export const getSingleProduct = async (req, res) => {
    try {
        const { params: { productId } } = req;

        if (await isValidData(req.params, res, {
            productId: 'required|integer|min:1',
        })) return;

        // Find a single product by its ID
        const product = await Products.findOne(
            {
                where: { id: productId },
                include: [{ model: Users }]
            });

        if (!product) {
            return RESPONSE.error(res, 3003, 404);
        }

        RESPONSE.success(res, 3007, { product });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};
