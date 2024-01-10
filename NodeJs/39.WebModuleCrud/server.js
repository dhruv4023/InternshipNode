const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8030;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/webModule', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("mongodb connected")).catch(() => console.log("mongodb not connected"));

// Define a simple schema
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.json());

// CRUD operations

// Create
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read (get all items)
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read (get a specific item by ID)
app.get('/items/:itemId', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
app.put('/items/:itemId', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete
app.delete('/items/:itemId', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
