import { Products } from '../db.js';
import { Op } from 'sequelize';

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        // Validate required fields
        if (!name || !price || !quantity) {
            return res.status(400).json({ error: 'Name, price, quantity are required fields' });
        }

        // Create a new product in the database
        const newProduct = await Products.create({
            name,
            description,
            price,
            quantity,
            userId: req.tokenData.userId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, quantity } = req.body;

        // Validate required fields
        if (!name || !price || !quantity) {
            return res.status(400).json({ error: 'Name, price, quantity are required fields' });
        }

        // Update the product in the database
        const [updatedRowsCount] = await Products.update(
            { name, description, price, quantity, userId: req.tokenData.userId },
            { where: { id: productId } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await Products.findByPk(productId);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Delete the product from the database
        const deletedRowCount = await Products.destroy({ where: { id: productId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        // Implement pagination and filtering based on your requirements
        const { page = 1, limit = 10, name, orderBy } = req.query;

        const offset = (page - 1) * limit;
        const order = orderBy ? [[orderBy, 'ASC']] : [];

        const products = await Products.findAll({
            where: name ? { name: { [Op.like]: `%${name}%` } } : {},
            order,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find a single product by its ID
        const product = await Products.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
