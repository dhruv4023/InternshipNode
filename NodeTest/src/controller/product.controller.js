import { Op } from 'sequelize';

import RESPONSE from '../helper/response.helper.js';
import db from '../models/index.js';
import { getPaginatedResponse, getPaginationMetadata } from '../helper/pagination.helper.js';
import Validator from 'validatorjs';

const { Products, Users } = db

// Controller function to add a new product
export const addProduct = async (req, res) => {
    const {
        body: { name, description, price, quantity },
        tokenData: { userId }
    } = req;

    let validation = new Validator({ ...req.tokenData, ...req.body }, {
        name: 'required|string|min:2|max:255',
        description: 'required|string|min:5|max:1000',
        price: 'required|numeric|min:0',
        quantity: 'required|integer|min:1',
        userId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {

        // Validate required fields
        if (!name || !price || !quantity)
            return RESPONSE.error(res, 3001, 400);

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
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to update an existing product
export const updateProduct = async (req, res) => {
    const {
        tokenData: { userId },
        params: { productId },
        body: { name, description, price, quantity },
    } = req;


    let validation = new Validator({ ...req.tokenData, ...req.body, ...req.params }, {
        userId: 'required|integer|min:1',
        productId: 'required|integer|min:1',
        name: 'required|string|min:2|max:255',
        description: 'required|string|min:5|max:1000',
        price: 'required|numeric|min:0',
        quantity: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {

        // Validate required fields
        if (!name || !price || !quantity)
            return RESPONSE.error(res, 3001, 400);

        // Update the product in the database
        const [updatedRowsCount] = await Products.update(
            { name, description, price, quantity },
            { where: { id: productId, userId: userId } }
        );

        if (updatedRowsCount === 0)
            return RESPONSE.error(res, 3003, 404);

        const updatedProduct = await Products.findOne({ where: { id: productId } });
        RESPONSE.success(res, 3004, { product: updatedProduct });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to delete a product
export const deleteProduct = async (req, res) => {
    const {
        params: { productId },
        tokenData: { userId }
    } = req;

    // Validate request data

    let validation = new Validator({ ...req.tokenData, ...req.params }, {
        userId: 'required|integer|min:1',
        productId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        // Delete the product from the database
        const deletedRowCount = await Products.destroy({ where: { id: productId, userId: userId } });

        if (deletedRowCount === 0)
            return RESPONSE.error(res, 3003, 404);

        RESPONSE.success(res, 3005);
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to get all products
export const getAllProducts = async (req, res) => {
    const { query: { name, orderBy } } = req;

    let validation = new Validator(req.params, {
        name: 'string',
        orderBy: 'string',
        page: 'integer|min:1',
        limit: 'integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {

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
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to get a single product by ID
export const getSingleProduct = async (req, res) => {
    const { params: { productId } } = req;

    let validation = new Validator(req.params, {
        productId: 'required|integer|min:1',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {

        // Find a single product by its ID
        const product = await Products.findOne({
            where: { id: productId },
            include: [{ model: Users }]
        });

        if (!product)
            return RESPONSE.error(res, 3003, 404);

        RESPONSE.success(res, 3007, { product });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};
