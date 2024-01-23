// Import necessary modules
import express from "express";
import cors from "cors";
import config from './config/config.js';
import bodyParser from "body-parser";

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON requests with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded requests with size limit
app.use(cors()); // Configure CORS for allowed origins

// Root route that returns a simple "Server is running..." message
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Import logger middleware
import { logger } from "./middleware/logger.js";

// Use logger middleware only in development environment
if (config.node_env == 'development') {
  app.use(logger);
}

// Import routes
import routes_v1 from './routes/index.routes.js';

// Define routes for API version 1 under '/api/v1/'
app.use('/api/v1/', routes_v1);

// Export the configured Express app
export default app;
