// controllers/userController.js
import bcrypt from 'bcrypt';

import { Users } from '../db.js';
import generateJWTToken from '../middleware/generateToken.js';
import { getUserData } from '../services/user.js';
import { hashValueGenerator } from '../services/generateHashValue.js';

/* REGISTER USER */
export const registerControl = async (req, res) => {
  try {
    // Extracting user registration data from the request body
    const { firstName, lastName, username, email, password } = req.body;

    // Check if a user with the same email already exists
    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      // If user with the same email exists, return a 400 Bad Request response
      return res.status(400).json({ status: 'error', message: 'User already exists!' });
    }

    // Generate a salt and hash the user's password
    const passwordHash = await hashValueGenerator(password);

    // Create a new User document in the database
    const newUser = await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: passwordHash,
    });

    // Send a success response with the registered user's details
    res.status(200).json({ status: 'success', message: 'User registered successfully', user: newUser });
  } catch (error) {
    // If an error occurs during registration, log the error and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Something went wrong', error: error });
  }
};

// Controller function for user login
export const loginControl = async (req, res) => {
  try {
    // Extracting user login data from the request body
    const { uid, password } = req.body;

    // Retrieve user data for the provided username or email
    const user = await getUserData({ id: uid, delPassword: false });

    // If user doesn't exist, return a 400 Bad Request response
    if (!user)
      return res.status(400).json({ status: 'error', exist: false, message: "User doesn't exist!" });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return a 400 Bad Request response
    if (!isMatch)
      return res.status(400).json({ status: 'error', exist: false, message: 'Invalid credentials' });

    // Generate a JWT token for the authenticated user
    const token = generateJWTToken({
      data: { userId: user.id, admin: user.Role.name === "admin" ? true : false },
      secretKey: process.env.JWT_SECRECT,
    });

    // Hide the password in the user object before sending the response
    user.password = undefined;

    // Send a success response with the JWT token and user details
    res.status(200).json({ status: 'success', exist: true, token, user });
  } catch (error) {
    // If an error occurs during login, log the error and send a 500 Internal Server Error response
    console.log(error);
    res.status(500).json({ status: 'error', exist: false, message: 'Failed to login' });
  }
};
