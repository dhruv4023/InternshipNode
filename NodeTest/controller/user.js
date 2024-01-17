import { getUserData } from '../services/user.js';
import cache from 'memory-cache';
import { Users } from '../db.js';
import RESPONSE from '../Response/Response.js';

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
    try {
        const { UID } = req.params;

        // Check if the user data is already cached
        const cachedUser = cache.get(UID);
        if (cachedUser) {
            console.log('from cache');
            // If cached data exists, return it with a 200 (OK) status
            RESPONSE.success(res, 4002, cachedUser);
        } else {
            console.log('from db');
            // If not cached, fetch the user data and store it in the cache
            const user = await getUserData({ id: UID });

            // Store the user data in the cache with a specified expiration time (e.g., 5 minutes)
            cache.put(UID, user, 5 * 60 * 1000); // 5 minutes in milliseconds

            // Return the user data as a JSON response with a 200 (OK) status
            RESPONSE.success(res, 1006, user);
        }
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status with an error message
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Controller function to update user data
export const updateUserData = async (req, res) => {
    try {
        const { userId } = req.tokenData; // Extract user ID from the request parameters
        const { firstName, lastName, email } = req.body; // Extract user data from the request body
        const user = await Users.findOne({ where: { id: userId } }); // Find the user by their username

        // Check if the provided email is already used by another user
        if (user.email !== email && (await Users.findOne({ where: { email: email } }))) {
            // Return a 400 (Bad Request) status with an error message if the email is already used
            RESPONSE.error(res, 1004, 400);
        }

        // Update the user's data in the database
        await Users.update(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
            },
            {
                where: { id: userId },
            }
        );

        const updatedUser = await Users.findOne({ where: { id: userId } }); // Retrieve the updated user data

        // Send a 200 (OK) response with the updated user data
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {
        console.error(error);
        // Send a 500 (Internal Server Error) response with an error message if there's an error
        RESPONSE.error(res, 9999, 500, error)
    }
};
