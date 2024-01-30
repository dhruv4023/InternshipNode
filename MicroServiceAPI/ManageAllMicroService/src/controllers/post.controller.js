import db from "../models/index.js"
import RESPONSE from "../helpers/response.helper.js";
import isValidData from "../helpers/validation/data_validator.js";

const { Posts } = db;
export const getPosts = async (req, res) => {
    try {
        // Assuming you are using Sequelize to fetch posts from the database
        const posts = await Posts.findAll();

        // Send a success response with the retrieved posts
        RESPONSE.success(res, 1008, posts);
    } catch (error) { 
        console.log(error)
        // If an error occurs during post retrieval, log the error and send a 500 Internal Server Error response
        RESPONSE.error(res, 9999, 500);
    }
};

export const getPostById = async (req, res) => {
    const { params: { postId } } = req;

    try {
        const post = await Posts.findByPk(postId);

        if (post) {
            RESPONSE.success(res, 3007, post);
        } else {
            RESPONSE.error(res, 3003, 404, 'Post not found');
        }
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500);
    }
};

export const createPost = async (req, res) => {
    const { body: { title, content, img }, tokenData: { userId } } = req;

    const validationErr = await isValidData({ title, content, img, userId }, {
        title: 'required|string|min:2|max:255',
        content: 'required|string',
        img: 'string', // Adjust the validation rule for img as needed
        userId: 'required', // Assuming userId is an integer
    });

    if (validationErr) {
        return RESPONSE.error(res, validationErr);
    }

    try {
        const newPost = await Posts.create({
            title,
            content,
            img,
            userId,
        });

        RESPONSE.success(res, 3002, newPost);
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500);
    }
};

export const updatePost = async (req, res) => {
    const { body: { title, content, img, userId }, params: { postId } } = req;

    const validationErr = await isValidData({ title, content, img, userId }, {
        title: 'string|min:2|max:255',
        content: 'string',
        img: 'string', // Adjust the validation rule for img as needed
        userId: 'integer', // Assuming userId is an integer
    });

    if (validationErr) {
        return RESPONSE.error(res, validationErr);
    }

    try {
        const [rowsUpdated, [updatedPost]] = await Posts.update(
            {
                title,
                content,
                img,
                userId,
            },
            {
                where: { id: postId },
                returning: true,
            }
        );

        if (rowsUpdated > 0) {
            RESPONSE.success(res, 3004, updatedPost);
        } else {
            RESPONSE.error(res, 3003, 404, 'Post not found');
        }
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500);
    }
};

export const deletePost = async (req, res) => {
    const { params: { postId } } = req;

    try {
        const rowsDeleted = await Posts.destroy({
            where: { id: postId },
        });

        if (rowsDeleted > 0) {
            RESPONSE.success(res, 3005, { postId });
        } else {
            RESPONSE.error(res, 3003, 404, 'Post not found');
        }
    } catch (error) {
        console.error(error);
        RESPONSE.error(res, 9999, 500);
    }
};