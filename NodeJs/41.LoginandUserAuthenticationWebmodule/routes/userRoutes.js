import express from "express";

import {
  getUsers, updateUserData,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

// Create a new Express Router
const routes = express.Router();

// Define a GET route to fetch user data by UID
routes.get("/get/:UID", getUsers);

// Define a PUT route for updating user data by ID, with token verification and file upload
routes.post(
  "/update/:id",
  // verifyToken, // Middleware to verify JWT token
  updateUserData
);

// Export the router for use in other parts of the application
export default routes;
