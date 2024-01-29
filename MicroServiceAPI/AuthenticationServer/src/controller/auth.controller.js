import mongoose from "mongoose";
import db from '../models/index.js';
import RESPONSE from '../helper/response.helper.js';
import generateJWTToken from '../helper/generate_token.helper.js';
import { comparePassword, hashPassword } from '../helper/bcrypt_password.helper.js';
import { sendVerificationLink } from "../services/verificationlink.service.js";
const { Users } = db;

// Controller for user registration
export const registerControl = async (req, res) => {

  // validateData(req.body, {
  //   firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
  //   lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
  //   username: 'required|string',
  //   email: 'required|email',
  //   password: 'required|password',
  // })

  try {
    const _file = req.file; // Get the uploaded file, if any
    const { body: { firstName, lastName, username, email, password, about } } = req; // Extract user registration data
    const location = {
      state: req.body["location.state"],
      city: req.body["location.city"],
      pincode: req.body["location.pincode"],
    };

    // Check if a user with the same email already exists
    const user = await Users.findOne({ email });

    // If user with the same email exists, return a 400 Bad Request response
    if (user)
      return RESPONSE.error(res, 1003, 400);

    let filePath = null;
    if (_file) {
      const fileData = await uploadFile({
        file: _file,
        newImgFileName: "profileImg",
        dirAddress: "Users/" + username,
      });
      filePath = fileData.public_id;
    }
    // console.log("filePath :-  ", filePath);
    // Create a new User document
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      about: about,
      picPath: filePath ? filePath : null,
      password: hashPassword(password),
      location: location,
    };

    await sendVerificationLink(newUser);
    // Save the new user to the database
    // await newUser.save();
    // Send a success response
    RESPONSE.success(res, 1008);
  } catch (error) {

    // If an error occurs during registration, log the error and send a 500 Internal Server Error response
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller for user login
export const loginControl = async (req, res) => {

  // let validation = new Validator(req.body, {
  //   uid: 'required|isEmailOrUsername',
  //   password: 'required|password',
  // });

  // if (validation.fails()) {
  //   const firstMessage = Object.keys(validation.errors.all())[0];
  //   return RESPONSE.error(res, validation.errors.first(firstMessage));
  // }

  try {
    // Extracting user login data from the request body
    const { body: { uid, password } } = req;

    try {
      // Retrieve user data for the provided username or email
      const user = await Users.findOne(mongoose.isValidObjectId(id)
        ? { _id: id }
        : {
          $or: [{ email: id }, { username: id }],
        }
      );

      // If user doesn't exist, rollback the transaction and return a 400 Bad Request response
      if (!user) {
        return RESPONSE.error(res, 1027, 400);
      }

      // If passwords don't match, rollback the transaction and return a 400 Bad Request response
      if (!comparePassword(password, user.password)) {
        return RESPONSE.error(res, 1005, 400);
      }

      // Generate a JWT token for the authenticated user
      const token = generateJWTToken({
        data: { userId: user.id, admin: user.roles === "admin" },
      });

      // Hide the password in the user object before sending the response
      user.password = undefined;

      // Send a success response with the JWT token and user details
      RESPONSE.success(res, 1002, { token, user });
    } catch (error) {
      throw error; // Re-throw the error to be caught by the outer catch block
    }
  } catch (error) {
    // If an error occurs during login, log the error and send a 500 Internal Server Error response
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller function to get user names
export const getUserNames = async (req, res) => {
  try {
    const useNames = await Users.distinct("username");
    RESPONSE.success(res, 1009, useNames);
  } catch (error) {
    RESPONSE.error(res, 9999, 500, error);
  }
};

// // Controller function to change user password
// export const changePassControl = async (req, res) => {
//   try {
//     const { body: { email, password } } = req; // Extract email and new password from the request body

//     const user = await Users.findOne({ email: email }); // Find the user by their email

//     if (!user)
//       return res.status(400).json({ exist: false, msg: "User doesn't exist!" }); // If the user doesn't exist, send a 400 (Bad Request) response

//     await Users.findByIdAndUpdate(user._id, {
//       $set: { password: hashPassword(password) },
//     }); // Update the user's password in the database

//     res.status(200).json({ msg: "Password changed successfully!" }); // Send a 200 (OK) response upon successful password change
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to change password" }); // Send a 500 (Internal Server Error) response if there's an error
//   }
// };
