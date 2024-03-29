import jwt from "jsonwebtoken";
import RESPONSE from "../helper/response.helper.js";
import config from "../config/config.js";

// Middleware to verify admin token
export const verifyAdminToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            // If no token is provided, return a 403 Forbidden response
            RESPONSE.error(res, 5001, 403);
            return;
        }

        // Check if the token starts with "Bearer " and remove it
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token using the JWT_SECRET
        const verified = jwt.verify(token, config.jwt_secret);

        // Attach the decoded token data to the request for future use
        req.tokenData = verified;

        // Check if the user has admin privileges in the token
        if (!req.tokenData.admin) {
            // If not an admin, return a 403 Forbidden response
            RESPONSE.error(res, 5001, 403);
            return;
        }

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            // If token is expired, return a 401 Unauthorized response
            RESPONSE.error(res, 5003, 401, 'Token expired');
        } else {
            // Return a 500 Internal Server Error response with an error message
            RESPONSE.error(res, 9999, 500, error);
        }
    }
};
