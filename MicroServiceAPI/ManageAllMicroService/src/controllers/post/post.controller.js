import axios from 'axios';
import FormData from 'form-data';

import RESPONSE from '../../helpers/response.helper.js';
import config from '../../config/config.js';

const POST_API_END = config.micro_services.post_api_end;


export const getPosts = async (req, res) => {
    try {
        // Make a GET request to your API endpoint with pagination parameters
        const response = await axios.request({
            method: 'get',
            url: `${POST_API_END}/api/v1/post/`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: req.query,
        });

        // Send a success response with the paginated posts
        RESPONSE.success(res, response);
    } catch (error) {
        console.error(error);
        // If an error occurs during the API request, log the error and send a 500 Internal Server Error response
        RESPONSE.error(res, error);
    }
};

export const getPostsByUserId = async (req, res) => {
    try {
        // Make a GET request to your API endpoint with pagination parameters
        const response = await axios.request({
            method: 'get',
            url: `${POST_API_END}/api/v1/post/user/${req.params.userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: req.query,
        });

        // Send a success response with the paginated posts
        RESPONSE.success(res, response);
    } catch (error) {
        console.error(error);
        // If an error occurs during the API request, log the error and send a 500 Internal Server Error response
        RESPONSE.error(res, error);
    }
};


export const getPostById = async (req, res) => {
    const { params: { postId } } = req;

    try {
        const response = await axios.request({
            method: 'get',
            url: `${POST_API_END}/api/v1/post/${postId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const createPost = async (req, res) => {
    try {
        const formData = new FormData();

        // Append other form fields
        for (const key in req.body) {
            if (req.body[key] !== undefined) {
                formData.append(key, req.body[key]);
            }
        }

        // Append the files data
        for (let i in req.files) {
            formData.append('imgs', req.files[i].buffer, {
                filename: req.files[i].originalname,
                contentType: req.files[i].mimetype,
            });
        }

        const response = await axios.post(`${POST_API_END}/api/v1/post/`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': req.header("Authorization")
                },
            }
        );
        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};
export const updatePost = async (req, res) => {

    const { params: { postId } } = req;

    try {
        const formData = new FormData();

        // Append other form fields
        for (const key in req.body) {
            if (req.body[key] !== undefined) {
                formData.append(key, req.body[key]);
            }
        }

        // Append the files data
        for (let i in req.files) {
            formData.append('imgs', req.files[i].buffer, {
                filename: req.files[i].originalname,
                contentType: req.files[i].mimetype,
            });
        }

        const response = await axios.put(`${POST_API_END}/api/v1/post/${postId}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': req.header("Authorization")
                },
            }
        );
        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const deletePost = async (req, res) => {
    const { params: { postId } } = req;
    try {
        const response = await axios.delete(`${POST_API_END}/api/v1/post/${postId}`, {
            headers: {
                'Authorization': req.header("Authorization")
            },
        });
        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};