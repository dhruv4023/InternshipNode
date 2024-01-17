import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from a .env file
import { sequelize } from "./db.js"

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON requests with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded requests with size limit
app.use(cors({ origin: JSON.parse(process.env.ORIGIN_URL_List) })); // Configure CORS for allowed origins

// Root route that returns a simple "Server is running..." message
app.get("/", (req, res) => {
  res.send("Server is running...");
});

import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const routes = [authRoute, userRoute, productRoutes, orderRoutes, cartRoutes];

routes.forEach((route) => {
    app.use(route);
});

const PORT = 3000
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
