import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configure CORS policy
app.use(morgan("common")); // Log HTTP requests
app.use(cors({ origin: 'http://localhost:3000' })); // Configure CORS for allowed origins

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Importing routes
import routes_v1 from './routes/index.routes.js';

// Defining routes
app.use('/api/v1', routes_v1);

export default app;
