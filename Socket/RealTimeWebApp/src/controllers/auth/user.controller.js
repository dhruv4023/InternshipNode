import FormData from 'form-data';

import config from '../../config/config.js';
import RESPONSE from '../../helpers/response.helper.js';
import { sendRequest } from '../../helpers/handle_request_axios.js';

const AUTH_API_END = config.micro_services.auth_api_end;

export const getOtherUsers = async (req, res) => {
    try {
        const response = await sendRequest('get', `${AUTH_API_END}/api/v1/user/get/other`, {
            'Content-Type': 'application/json',
            'Authorization': req.header("Authorization")
        }, {}, req.query);
        RESPONSE.successMediator(res, response);
    } catch (error) {
        RESPONSE.errorMediator(res, error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const response = await sendRequest('get', `${AUTH_API_END}/api/v1/user/get/userid/${req.params.uid}`, {
            'Content-Type': 'application/json'
        });
        RESPONSE.successMediator(res, response);
    } catch (error) {
        RESPONSE.errorMediator(res, error);
    }
};

export const updateUserData = async (req, res) => {
    try {
        const formData = new FormData();
        for (const key in req.body) {
            if (req.body[key] !== undefined) {
                formData.append(key, req.body[key]);
            }
        }
        if (req.file) {
            formData.append('picPath', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
            });
        }
        const response = await sendRequest('put', `${AUTH_API_END}/api/v1/user/update/`, {
            ...formData.getHeaders(),
            'Authorization': req.header("Authorization")
        }, formData);

        RESPONSE.successMediator(res, response);
    } catch (error) {
        RESPONSE.errorMediator(res, error);
    }
};