import { Op } from 'sequelize';

import db from '../models/index.js';
import RESPONSE from '../helper/response.helper.js';
import { namePattern } from '../helper/custom_validation_patterns/name_pattern.helper.js';

const { Users, Roles } = db;

// Controller function to get user information by uid (User ID or username)
export const getUsers = async (req, res) => {

    uidPattern(); // add custom validation - uid 

    let validation = new Validator(req.params, {
        uid: 'required|isEmailOrUsername'
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const { params: { uid } } = req;

        // Check if the user data is already cached
        const query = isNaN(id) ? { [Op.or]: [{ email: uid }, { username: uid }] } : { id: uid };

        const user = await Users.findOne({
            where: query,
            include: [{ model: Roles }],
            attributes: attributes
        });

        RESPONSE.success(res, 1006, user);
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status with an error message
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Controller function to update user data
export const updateUserData = async (req, res) => {

    namePattern()

    let validation = new Validator({ ...req.body, ...req.tokenData }, {
        userId: 'required|integer|min:1',
        firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
        lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
        username: 'required|string|min:3|max:20',
        email: 'required|email',
    });

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const { tokenData: { userId }, body: { email } } = req; // Extract user data from the request body

        const user = await Users.findOne({ where: { id: userId } }); // Find the user by their username

        // Check if the provided email is already used by another user
        if (user.email !== email && (await Users.findOne({ where: { email } })))
            // Return a 400 (Bad Request) status with an error message if the email is already used
            return RESPONSE.error(res, 1004, 400);

        // Update the user's data in the database
        await Users.update(
            req.body, {
            where: { id: userId },
        });

        const updatedUser = await Users.findOne({ where: { id: userId } }); // Retrieve the updated user data

        // Send a 200 (OK) response with the updated user data
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {

        // Send a 500 (Internal Server Error) response with an error message if there's an error
        RESPONSE.error(res, 9999, 500, error)
    }
};
