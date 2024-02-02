import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from "express-session";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

app.use(session({
  secret: process.env.SESSION_SK, 
  resave: false,
  saveUninitialized: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON requests with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded requests with size limit
app.use(cors()); // Configure CORS for allowed origins

const header_footer = {
  pageTitle: "Login and User Authentication task", currentYear: 2024
}

// views -----------------------------------------------------------------
// Root route that returns a simple "Server is running..." message
app.get("/", (req, res) => {
  res.render("index", { ...header_footer, user: req.session.user })
});

app.get("/signup", (req, res) => {
  res.render("signup", { ...header_footer })
});

app.get("/login", (req, res) => {
  res.render("login", { ...header_footer })
});
app.get("/update", (req, res) => {
  res.setHeader('Authorization', `Bearer ${req.session.token}`);
  res.render("update", { ...header_footer, user: req.session.user })
});


// Define routes for authentication, user, and mail functionality
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";

// controller -----------------------------------------------------------------
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
    dbName:"zzz"
  })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((e) => {
    console.log("db not connected");
  });

