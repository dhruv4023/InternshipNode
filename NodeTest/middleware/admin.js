import jwt from "jsonwebtoken";

// Middleware to verify admin token
export const verifyAdminToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            // If no token is provided, return a 403 Forbidden response
            return res.status(403).send({ msg: "Access denied" });
        }

        // Check if the token starts with "Bearer " and remove it
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token using the JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRECT);

        // Attach the decoded token data to the request for future use
        req.tokenData = verified;

        // Check if the user has admin privileges in the token
        if (!req.tokenData.admin) {
            // If not an admin, return a 403 Forbidden response
            return res.status(403).json({ error: 'Unauthorized - Admin access required' });
        }

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token verification errors
        // Log the error for debugging purposes
        console.error(err);
        // Return a 500 Internal Server Error response with an error message
        res.status(500).json({ msg: "Error in token verification", error: err.message });
    }
};
