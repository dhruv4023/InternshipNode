import bcrypt from 'bcrypt';
import db from '../models/index.js';
import RESPONSE from '../helper/response.js';
import { hashValueGenerator } from '../helper/generateHashValue.js';
import generateJWTToken from '../helper/generateToken.js';
import isValidData from '../helper/bodyValidation.js';
import { Op } from 'sequelize';
const { Users, Roles } = db;
// Controller for user registration
export const registerControl = async (req, res) => {
  try {
    // Extracting user registration data from the request body
    const {
      body: { firstName, lastName, username, email, password },
    } = req;

    if (await isValidData(req.body, res, {
      firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
      lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
      username: 'required|string',
      email: 'required|email',
      password: 'required|password',
    })) return;

    // Check if a user with the same email already exists
    const user = await Users.findOne({ where: { email } });
    if (user) {
      // If user with the same email exists, return a 400 Bad Request response
      return RESPONSE.error(res, 1003, 400);
    }

    // Generate a salt and hash the user's password
    const passwordHash = await hashValueGenerator(password);

    // Create a new User document in the database
    const newUser = await Users.create({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
    });

    // Send a success response with the registered user's details
    RESPONSE.success(res, 1001, { user: newUser });
  } catch (error) {
    // If an error occurs during registration, log the error and send a 500 Internal Server Error response
    console.error(error);
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller for user login
export const loginControl = async (req, res) => {
  try {
    // Extracting user login data from the request body
    const { body: { uid, password } } = req;

    if (await isValidData(req.body, res, {
      uid: 'required|isEmailOrUsername',
      password: 'required|password',
    })) return;

    // Retrieve user data for the provided username or email
    const user = await Users.findOne({
      where: isNaN(uid) ? { [Op.or]: [{ email: uid }, { username: uid }] } : { id: uid },
      include: [{ model: Roles }],
      attributes: { include: ["password"] }
    });
    // If user doesn't exist, return a 400 Bad Request response
    if (!user)
      return RESPONSE.error(res, 1027, 400);

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return a 400 Bad Request response
    if (!isMatch)
      return RESPONSE.error(res, 1005, 400);

    // Generate a JWT token for the authenticated user
    const token = generateJWTToken({
      data: { userId: user.id, admin: user.role.name === "admin" ? true : false },
      secretKey: process.env.JWT_SECRECT,
    });

    // Hide the password in the user object before sending the response
    user.password = undefined;

    // Send a success response with the JWT token and user details
    RESPONSE.success(res, 1002, { token, user });
  } catch (error) {
    // If an error occurs during login, log the error and send a 500 Internal Server Error response
    console.log(error);
    RESPONSE.error(res, 9999, 500, error);
  }
};
