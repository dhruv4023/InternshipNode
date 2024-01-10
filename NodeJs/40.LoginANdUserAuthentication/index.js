import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

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

// Define routes for authentication, user, and mail functionality
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";

app.use("/auth", authRoute); // Use the authentication route
app.use("/user", userRoute); // Use the user route

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT:", process.env.PORT);
});

/* ----------------------------MONGODB CONNECTION------------------- */

import mongoose from "mongoose";
mongoose.set("strictQuery", true);

// Connect to MongoDB using the provided DB_URL
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((e) => {
    console.log("db not connected");
  });

