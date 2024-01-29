import mongoose from 'mongoose';
import db from '../models/index.js';
import RESPONSE from '../helper/response.helper.js';
import { uploadFile } from '../helper/uploadFileToCloudnary.js';
import isValidData from '../helper/validation/data_validator.js';

const { Users } = db;

// Controller function to get user information by uid (User ID or username)
export const getUsers = async (req, res) => {

    const validationErr = await isValidData(req.body, {
        uid: 'required|isEmailOrUsername',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {
        const { params: { uid } } = req;

        const user = await Users.findOne(mongoose.isValidObjectId(uid)
            ? { _id: uid } : {
                $or: [{ email: uid }, { username: uid }],
            }
        );
        // If user doesn't exist, rollback the transaction and return a 400 Bad Request response
        if (!user) {
            return RESPONSE.error(res, 1027, 400);
        }

        RESPONSE.success(res, 1006, { user });
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status with an error message
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Controller function to update user data
export const updateUserData = async (req, res) => {

    const validationErr = await isValidData(req.body, {
        firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
        lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
        username: 'required|string|min:3|max:20',
        email: 'required|email',
        password: 'required|password',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {
        const _file = req.file; // Get the uploaded file, if any
        const {
            params: { id: _id },
            body: {
                firstName,
                lastName,
                username,
                email,
                about,
                location,
            }
        } = req;
        const user = await Users.findOne({ username: _id }); // Find the user by their username

        // Check if the provided email is already used by another user
        if (user.email !== email && (await Users.findOne({ email: email }))) {
            return res.status(400).json({ msg: "Email already used!" });
        }

        // upload image to cloudnary
        let filePath = null;
        if (_file) {
            const fileData = await uploadFile({
                file: _file,
                newImgFileName: "profileImg",
                dirAddress: "Users/" + username,
            });
            filePath = fileData.public_id;
        }
        // console.log(filePath)
        // Update the user's data in the database
        await Users.findOneAndUpdate(
            { username: _id },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    about: about,
                    picPath: filePath ? filePath : user?.picPath,
                    location: location,
                },
            }
        );
        const updatedUser = await Users.findOne({ username: _id });
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {
        // Send a 500 (Internal Server Error) response with an error message if there's an error
        RESPONSE.error(res, 9999, 500, error)
    }
};