import axios from 'axios';
import FormData from 'form-data';

import config from '../../config/config.js';
import RESPONSE from '../../helpers/response.helper.js';

const AUTH_API_END = config.micro_services.auth_api_end;

export const getUsers = async (req, res) => {
    try {
        // Make a GET request to the external API
        const response = await axios.get(`${AUTH_API_END}/api/v1/user/get/${req.params.uid}`);

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
};

export const updateUserData = async (req, res) => {
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

        const response = await axios.put(`${AUTH_API_END}/api/v1/user/update/`, formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': req.header("Authorization")
            },
        });

        RESPONSE.success(res, response);
    } catch (error) {
        RESPONSE.error(res, error);
    }
}
