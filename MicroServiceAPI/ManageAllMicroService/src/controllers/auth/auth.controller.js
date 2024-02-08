import axios from 'axios';
import FormData from 'form-data';

import RESPONSE from '../../helpers/response.helper.js';
import config from '../../config/config.js';

const AUTH_API_END = config.micro_services.auth_api_end;

export const loginControl = async (req, res) => {
    try {
        const response = await axios.request({
            method: 'post',
            url: `${AUTH_API_END}/api/v1/auth/login/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(req.body)
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const registerControl = async (req, res) => {
    try {
        const formData = new FormData();

        // Append other form fields
        for (const key in req.body) {
            if (req.body[key] !== undefined) {
                formData.append(key, req.body[key]);
            }
        }

        // Append the file data
        if (req.file) {
            formData.append('picPath', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
            });
        }

        const response = await axios.post(`${AUTH_API_END}/api/v1/auth/register/`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};



export const getUserNames = async (req, res) => {
    try {
        const response = await axios.request({
            method: 'get',
            url: `${AUTH_API_END}/api/v1/auth/get/usernames`,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const changePassControl = async (req, res) => {
    try {
        // console.log(req.headers.authorization)
        const response = await axios.request({
            method: 'put',
            url: `${AUTH_API_END}/api/v1/auth/change/password`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.header("Authorization")
            },
            data: JSON.stringify(req.body)
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};