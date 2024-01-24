import express from "express";

import {
  getUsers, updateUserData,
} from "../../controller/user.controller.js";
import { verifyToken } from "../../middleware/auth.js";

// Create a new Express Router
const routes = express.Router();

// Define a GET route to fetch user data by uid
routes.get("/get/:uid", getUsers);

// Define a PUT route for updating user data by ID, with token verification and file upload
routes.put(
  "/update/",
  verifyToken, // Middleware to verify JWT token
  updateUserData
);

// Export the router for use in other parts of the application
export default routes;
 