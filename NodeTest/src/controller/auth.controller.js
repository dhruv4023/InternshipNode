import { Op } from 'sequelize';
import Validator from "validatorjs";

import db from '../models/index.js';
import RESPONSE from '../helper/response.helper.js';
import generateJWTToken from '../helper/generate_token.helper.js';
import { uidPattern } from '../helper/custom_validation_patterns/uid_pattern.helper.js';
import { passwordPattern } from '../helper/custom_validation_patterns/password_pattern.helper.js';
import { namePattern } from '../helper/custom_validation_patterns/name_pattern.helper.js';
import { comparePassword, hashPassword } from '../helper/bcrypt_password.helper.js';

const { Users, Roles, sequelize } = db;

// Controller for user registration
export const registerControl = async (req, res) => {

  namePattern(); // add custom validation - name 
  passwordPattern(); // add custom validation - password

  let validation = new Validator(req.body, {
    firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
    lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
    username: 'required|string',
    email: 'required|email',
    password: 'required|password',
  });

  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }

  try {
    // Extracting user registration data from the request body
    const {
      body: { firstName, lastName, username, email, password },
    } = req;

    // Check if a user with the same email already exists
    const user = await Users.findOne({ where: { email } });

    if (user) {
      // If user with the same email exists, return a 400 Bad Request response
      return RESPONSE.error(res, 1003, 400);
    }

    // Create a new User document in the database
    const newUser = await Users.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword(password),
    });

    // Send a success response with the registered user's details
    RESPONSE.success(res, 1001, { user: newUser });
  } catch (error) {

    // If an error occurs during registration, log the error and send a 500 Internal Server Error response
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller for user login
export const loginControl = async (req, res) => {

  uidPattern(); // add custom validation - uid 
  passwordPattern(); // add custom validation - password

  let validation = new Validator(req.body, {
    uid: 'required|isEmailOrUsername',
    password: 'required|password',
  });

  if (validation.fails()) {
    const firstMessage = Object.keys(validation.errors.all())[0];
    return RESPONSE.error(res, validation.errors.first(firstMessage));
  }

  try {
    // Extracting user login data from the request body
    const { body: { uid, password } } = req;

    // Begin the transaction
    const t = await sequelize.transaction();

    try {
      // Retrieve user data for the provided username or email
      const user = await Users.findOne({
        where: isNaN(uid) ? { [Op.or]: [{ email: uid }, { username: uid }] } : { id: uid },
        include: [{ model: Roles }],
        attributes: { include: ["password"] },
        transaction: t,
      });

      // If user doesn't exist, rollback the transaction and return a 400 Bad Request response
      if (!user) {
        await t.rollback();
        return RESPONSE.error(res, 1027, 400);
      }

      // If passwords don't match, rollback the transaction and return a 400 Bad Request response
      if (!comparePassword(password, user.password)) {
        await t.rollback();
        return RESPONSE.error(res, 1005, 400);
      }

      // Generate a JWT token for the authenticated user
      const token = generateJWTToken({
        data: { userId: user.id, admin: user.role.name === "admin" ? true : false },
      });

      // Hide the password in the user object before sending the response
      user.password = undefined;

      // Commit the transaction if everything is successful
      await t.commit();

      // Send a success response with the JWT token and user details
      RESPONSE.success(res, 1002, { token, user });
    } catch (error) {
      // Rollback the transaction if there is an error
      await t.rollback();
      throw error; // Re-throw the error to be caught by the outer catch block
    }
  } catch (error) {
    // If an error occurs during login, log the error and send a 500 Internal Server Error response
    RESPONSE.error(res, 9999, 500, error);
  }
};
