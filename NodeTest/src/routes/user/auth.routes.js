// Import the necessary dependencies and controllers
import express from "express";
import {
  registerControl,
  loginControl,
} from "../../controller/auth.controller.js";

// Create a new Express Router
const routes = express.Router();

// Define a POST route for user registration
routes.post("/register", registerControl);

// Define a POST route for user login
routes.post("/login", loginControl);


// Export the router for use in other parts of the application
export default routes;
