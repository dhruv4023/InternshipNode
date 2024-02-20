import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import serviceAccount from "./liquid-virtue-370510-firebase-adminsdk-w9cyn-f455ffe729.json" assert { type: "json" };

dotenv.config(); // Load environment variables from a .env file

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Create an Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies

// Root route that returns a simple "Server is running..." message
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Signup route
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create user with email and password
        const userRecord = await admin.auth().createUser({ email, password,emailVerified:false });

        res.status(200).send({ message: "User created successfully", uid: userRecord.uid });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Error creating user" });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
