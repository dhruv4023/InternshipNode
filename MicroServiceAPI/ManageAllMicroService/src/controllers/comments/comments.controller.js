import axios from 'axios';
import RESPONSE from '../../helpers/response.helper.js';
import config from '../../config/config.js';

const COMMENT_API_END = config.micro_services.comments_api_end; // Replace with your actual API endpoint

export const getComments = async (req, res) => {
    const { postId, parentCommentId } = req.params;
    
    const url = parentCommentId
        ? `${COMMENT_API_END}/api/v1/comment/post/${postId}/parent/${parentCommentId}`
        
        : `${COMMENT_API_END}/api/v1/comment/post/${postId}`;
        

    try {
        const response = await axios.get(url);

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const getNestedComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const response = await axios.get(`${COMMENT_API_END}/api/v1/comment/post/${postId}/nested`, {
            
            params: req.query,
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const createComment = async (req, res) => {
    const { postId, parentCommentId } = req.params;
    const url = parentCommentId
        ? `${COMMENT_API_END}/api/v1/comment/post/${postId}/parent/${parentCommentId}`
        
        : `${COMMENT_API_END}/api/v1/comment/post/${postId}`;
        

    try {
        const response = await axios.post(url, req.body, {
            headers: {
                'Authorization': req.header("Authorization"),
                'Content-Type': 'application/json',
            },
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const updateComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const response = await axios.put(`${COMMENT_API_END}/api/v1/comment/${commentId}`, req.body, {
            
            headers: {
                'Authorization': req.header("Authorization"),
                'Content-Type': 'application/json',
            },
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const response = await axios.delete(`${COMMENT_API_END}/api/v1/comment/${commentId}`, {
            
            headers: {
                'Authorization': req.header("Authorization"),
            },
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};
