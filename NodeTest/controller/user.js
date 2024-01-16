// controllers/userController.js
import { getUserData } from '../services/user.js';
import cache from 'memory-cache';
import { Users } from '../db.js';

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;

    // Check if the user data is already cached
    const cachedUser = cache.get(UID);
    if (cachedUser) {
      console.log('from cache');
      // If cached data exists, return it with a 200 (OK) status
      res.status(200).json(cachedUser);
    } else {
      console.log('from db');
      // If not cached, fetch the user data and store it in the cache
      const user = await getUserData({ id: UID });

      // Store the user data in the cache with a specified expiration time (e.g., 5 minutes)
      cache.put(UID, user, 5 * 60 * 1000); // 5 minutes in milliseconds

      // Return the user data as a JSON response with a 200 (OK) status
      res.status(200).json(user);
    }
  } catch (error) {
    // Handle errors and return a 500 (Internal Server Error) status with an error message
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Controller function to update user data
export const updateUserData = async (req, res) => {
  try {
    const { id: _id } = req.params; // Extract user ID from the request parameters
    const { firstName, lastName, email } = req.body; // Extract user data from the request body

    const user = await Users.findOne({ where: { username: _id } }); // Find the user by their username

    // Check if the provided email is already used by another user
    if (user.email !== email && (await Users.findOne({ where: { email: email } }))) {
      // Return a 400 (Bad Request) status with an error message if the email is already used
      return res.status(400).json({ status: 'error', message: 'Email already used!' });
    }

    // Update the user's data in the database
    await Users.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      {
        where: { username: _id },
      }
    );

    const updatedUser = await Users.findOne({ where: { username: _id } }); // Retrieve the updated user data

    // Send a 200 (OK) response with the updated user data
    res.status(200).json({ status: 'success', user: updatedUser });
  } catch (error) {
    console.error(error);
    // Send a 500 (Internal Server Error) response with an error message if there's an error
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};
