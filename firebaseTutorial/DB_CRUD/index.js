import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import serviceAccount from "./liquid-virtue-370510-firebase-adminsdk-w9cyn-f455ffe729.json" assert { type: "json" };

dotenv.config(); // Load environment variables from a .env file

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
const db = admin.firestore();
// Create an Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies

// Root route that returns a simple "Server is running..." message
app.get("/", (req, res) => {
    res.send("Server is running...");
});

const getUserRef = async (email) => {

    // Query the users collection to find the user with the specified email
    const userSnapshot = await db.collection('USER').where('email', '==', email).get();

    // Check if the user exists
    if (userSnapshot.empty)
        return false;

    return userSnapshot.docs[0].ref;
}
// Add a new product for a specific user
app.post('/products', async (req, res) => {
    try {
        const { name, price, quantity, email } = req.body;

        const userRef = await getUserRef(email)

        if (!userRef)
            res.status(404).json({ error: 'User not found' });

        // Add the product with a reference to the user document
        const productRef = await db.collection('PRODUCTS').add({
            name,
            price,
            quantity,
            userRef: userRef // Store reference to the user document
        });

        res.status(201).json({ id: productRef.id, ...req.body });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all products
app.get('/products/:email', async (req, res) => {
    try {
        const { params: { email } } = req
        console.log(email)
        const userRef = await getUserRef(email)

        if (!userRef)
            res.status(404).json({ error: 'User not found' });

        const snapshot = await db.collection('PRODUCTS').where('userRef', "==", userRef).get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        res.json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        await db.collection('PRODUCTS').doc(id).update({
            name,
            price,
            quantity
        });
        res.status(200).json({ id, name, price, quantity });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('PRODUCTS').doc(id).delete();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
