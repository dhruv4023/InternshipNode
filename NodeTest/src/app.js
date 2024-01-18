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

import { logger } from "./middleware/logger.js";

if (config.node_env == 'development') {
  app.use(logger);
}

// importing routes
import routes_v1 from './routes/index.routes.js';

// defining routes
app.use('/api/v1/', routes_v1);

export default app