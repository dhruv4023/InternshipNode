// controllers/userController.js
import bcrypt from 'bcrypt';
import { Roles, Users } from '../db.js';
import generateJWTToken from '../middleware/generateToken.js';
import { getUserData } from '../services/user.js';
import { hashValueGenerator } from '../services/generateHashValue.js';

/* REGISTER USER */
export const registerControl = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if a user with the same email already exists
    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    // Generate a salt and hash the user's password
    const passwordHash = await hashValueGenerator(password);

    // Create a new User document
    const newUser = await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: passwordHash,
    });

    // Send a success response
    res.status(200).json({ msg: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong', error: error });
  }
};

// Controller function for user login
export const loginControl = async (req, res) => {
  try {
    const { uid, password } = req.body;

    const user = await getUserData({ id: uid, delPassword: false });

    if (!user)
      return res.status(400).json({ exist: false, mess: "User doesn't exist!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ exist: false, mess: 'Invalid credentials' });

    const token = generateJWTToken({
      data: { userId: user.id, admin: user.Role.name === "admin" ? true : false },
      secretKey: process.env.JWT_SECRECT,
    });

    user.password = undefined;

    res.status(200).json({ exist: true, token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ exist: false, mess: 'Failed to login' });
  }
};
