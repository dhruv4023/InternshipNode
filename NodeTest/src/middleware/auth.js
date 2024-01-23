import jwt from "jsonwebtoken";
import RESPONSE from "../helper/response.js";
import config from "../config/config.js";

// Middleware to verify user token
export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      // If no token is provided, return a 403 Forbidden response     
      RESPONSE.error(res, 5002, 403)
      return
    }
    // Check if the token starts with "Bearer " and remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET
    const verified = jwt.verify(token, config.jwt_secret);

    // Attach the decoded token data to the request for future use
    req.tokenData = verified;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    // Log the error for debugging purposes
    console.error(err);
    // Return a 500 Internal Server Error response with an error message
    RESPONSE.error(res, 9999, 500, err);
  }
};

