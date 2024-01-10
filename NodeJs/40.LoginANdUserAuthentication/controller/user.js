import { getUserData } from "../services/user.js";
import cache from "memory-cache"; // Import memory-cache

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;

    // Check if the user data is already cached
    const cachedUser = cache.get(UID);
    if (cachedUser) {
      console.log("from cache")
      // If cached data exists, return it
      res.status(200).json(cachedUser);
    } else {
      console.log("from db")
      // If not cached, fetch the user data and store it in the cache
      const user = await getUserData({ id: UID });

      // Store the user data in the cache with a specified expiration time (e.g., 5 minutes)
      cache.put(UID, user, 5 * 60 * 1000); // 5 minutes in milliseconds

      // Return the user data as a JSON response
      res.status(200).json(user);
    }
  } catch (error) {
    // Handle errors and return a 500 status if the user is not found
    res.status(500).json("Internal server error");
  }
};

import Users from "../models/Users.js";
// Controller function to update user data
export const updateUserData = async (req, res) => {
  const _file = req.file; // Get the uploaded file, if any
  try {
    const { id: _id } = req.params; // Extract user ID from the request parameters
    const {
      firstName,
      lastName,
      email,
    } = req.body; // Extract user data from the request body

    const user = await Users.findOne({ username: _id }); // Find the user by their username

    // Check if the provided email is already used by another user
    if (user.email !== email && (await Users.findOne({ email: email }))) {
      return res.status(400).json({ msg: "Email already used!" });
    }

    // Update the user's data in the database
    await Users.findOneAndUpdate(
      { username: _id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      }
    );

    const updatedUser = await Users.findOne({ username: _id }); // Retrieve the updated user data
    res.status(200).json({ user: updatedUser }); // Send a 200 (OK) response with the updated user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" }); // Send a 500 (Internal Server Error) response if there's an error
  }
};
