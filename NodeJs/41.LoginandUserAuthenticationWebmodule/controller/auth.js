import bcrypt from "bcrypt";
import Users from "../models/Users.js"; // Import the Users model
import generateJWTToken from "../middleware/generateToken.js"; // Import JWT token generator
import { getUserData } from "../services/user.js";
import { hashValueGenerator } from "../services/generateHashValue.js";

/* REGISTER USER */
export const registerControl = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body; // Extract user registration data

    // Check if a user with the same email already exists
    const user = await Users.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Generate a salt and hash the user's password
    const passwordHash = await hashValueGenerator(password)

    // Create a new User document
    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: passwordHash,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response

    res.redirect("/")
  } catch (error) {
    console.error(error);
    res.redirect("/")
  }
};

// Controller function for user login
export const loginControl = async (req, res) => {
  try {
    const { uid, password } = req.body; // Extract email and password from the request body
    console.log(req.body)
    const user = await getUserData({ id: uid, delPassword: false });
    // console.log(user)
    if (!user)
      return res
        .status(400)
        .json({ exist: false, mess: "User doesn't exist!" }); // If the user doesn't exist, send a 400 (Bad Request) response

    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the stored password hash

    if (!isMatch)
      return res
        .status(400)
        .json({ exist: false, mess: "Invalid credentials" }); // If the password doesn't match, send a 400 (Bad Request) response

    const token = generateJWTToken({
      data: { userId: user.username },
      secretKey: process.env.JWT_SECRECT,
    }); // Generate a JWT token for the user

    user.password = undefined;   // Remove the password from the user object
    req.session.token = token;
    req.session.user = user;

    res.redirect("/")
  } catch (error) {
    res.redirect("/")
  }
};
