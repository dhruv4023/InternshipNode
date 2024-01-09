const Book = require("./BookModel.js"); // Import your Mongoose model

const add = async (req, res) => {
  try {
    const book = new Book(req.body); // Create a new book instance with data from the request body
    const newBook = await book.save(); // Save the book to the database
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const books = await Book.find(); // Retrieve all books from the database
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const del = async (req, res) => {
  try {
    const { id: bookId } = req.params; // Extract the book ID from the request parameters
    const deletedBook = await Book.findOneAndRemove({ ISBN: bookId }); // Find and remove the book by its ID
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const update = async (req, res) => {
  try {
    const { id: bookId } = req.params; // Extract the book ID from the request parameters
    const updatedBookData = req.body; // New book data from the request body
    const updatedBook = await Book.findOneAndUpdate(
      { ISBN: bookId },
      updatedBookData,
      {
        new: true,
      }
    ); // Find and update the book by its ID
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { add, get, del, update } 