
import { Op } from 'sequelize';
import RESPONSE from '../Helper/Response.js';
import db from '../models/index.js';
import { getPaginatedResponse, getPaginationMetadata } from '../Helper/paginationHelper.js';

const { Products, Users } = db
// Controller function to add a new product
export const addProduct = async (req, res) => {
    try {
        
        const { userId } = req.tokenData;
        const { name, description, price, quantity } = req.body;

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
        const { userId } = req.tokenData;
        const { productId } = req.params;
        const { name, description, price, quantity } = req.body;


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

        const updatedProduct = await Products.findByPk(productId);
        RESPONSE.success(res, 3004, { product: updatedProduct });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Controller function to delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId } = req.tokenData;

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
        // Implement pagination and filtering based on your requirements
        const { name, orderBy } = req.query;

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
        const { productId } = req.params;

        // Find a single product by its ID
        const product = await Products.findByPk(productId, { include: [{ model: Users }] });

        if (!product) {
            return RESPONSE.error(res, 3003, 404);
        }

        RESPONSE.success(res, 3007, { product });
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500, error);
    }
};
