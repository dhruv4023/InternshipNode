import db from '../models/index.js';
import RESPONSE from '../helper/response.js';
import { getUserData } from '../services/user.service.js';
import isValidData from '../helper/bodyValidation.js';

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
    try {
        const { params: { UID } } = req;

        // Check if the user data is already cached
        const user = await getUserData(UID)
        RESPONSE.success(res, 1006, user);
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status with an error message
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Controller function to update user data
export const updateUserData = async (req, res) => {
    try {
        const { tokenData: { userId }, body: { firstName, lastName, email } } = req; // Extract user data from the request body

        const user = await db.Users.findOne({ where: { id: userId } }); // Find the user by their username

        if (await isValidData({ ...req.body, ...req.tokenData }, res, {
            userId: 'required|integer|min:1',
            firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
            lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
            username: 'required|string|min:3|max:20',
            email: 'required|email',
        })) return;

        // Check if the provided email is already used by another user
        if (user.email !== email && (await db.Users.findOne({ where: { email } }))) {
            // Return a 400 (Bad Request) status with an error message if the email is already used
            RESPONSE.error(res, 1004, 400);
        }

        // Update the user's data in the database
        await db.Users.update(
            {
                firstName,
                lastName,
                email,
            },
            {
                where: { id: userId },
            }
        );

        const updatedUser = await db.Users.findOne({ where: { id: userId } }); // Retrieve the updated user data

        // Send a 200 (OK) response with the updated user data
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {
        console.error(error);
        // Send a 500 (Internal Server Error) response with an error message if there's an error
        RESPONSE.error(res, 9999, 500, error)
    }
};
