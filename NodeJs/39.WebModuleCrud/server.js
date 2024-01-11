const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8030;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/webModule', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB not connected"));

// Define a simple schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Read (get all items)
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read (get a specific item by ID)
app.get('/items/:itemId', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.render('item', { item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit (render the edit form)
app.get('/items/:itemId/edit', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.render('edit', { item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD operations

// Create
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update
app.post('/items/:itemId/edit', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.post('/items/:itemId/delete', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.itemId);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
