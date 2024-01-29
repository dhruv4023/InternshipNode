// Import the necessary dependencies and controllers
import express from "express";
import {
  registerControl,
  loginControl,
  // changePassControl,
  getUserNames,
} from "../../controller/auth.controller.js";
import { verifyToken } from "../../middleware/auth.js";
import upload from "../../middleware/fileUploder.js";

// Create a new Express Router
const routes = express.Router();

// Define a POST route for user registration
routes.post("/register", upload.single("picPath"), registerControl);

// Define a POST route for user login
routes.post("/login", loginControl);

// Define a POST route for changing user passwords
// routes.post("/changepass", changePassControl);

// Define a GET route to fetch user usernames
routes.get("/usernames", getUserNames);

// Export the router for use in other parts of the application
export default routes;
