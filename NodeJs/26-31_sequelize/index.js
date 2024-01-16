// index.js

const express = require('express');
const { Book, Author } = require("./models/models.js")
const sequelize = require('./database.js');

// Create an Express application 
const app = express();
const PORT = 3000;

// Sync the models with the database
sequelize.sync() // Use force: true only during development to drop and recreate tables
  .then(() => {
    console.log('Database and tables synced.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Express route to create a new author with books
app.post('/auth', async (req, res) => {
  try {
    // Create a new author
    const newAuthor = await Author.create({
      name: 'J.K. Rowling',
    });

    // Create books and associate them with the author
    const booksData = [
      { title: 'Harry Potter and the Sorcerer\'s Stone', description: "description" },
      { title: 'Harry Potter and the Chamber of Secrets', description: "description" },
    ];

    const createdBooks = await Promise.all(booksData.map(book => Book.create(book)));
    await newAuthor.setBooks(createdBooks);

    // Fetch the author with the associated books
    const authorWithBooks = await Author.findOne({
      where: { id: newAuthor.id },
      include: Book,
    });

    // Send the created author with books as a JSON response
    res.json(authorWithBooks);
  } catch (err) {
    console.error('Error creating author with books:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Express route to fetch all authors with their books
app.get('/auth', async (req, res) => {
  try {
    // Fetch all authors with their associated books
    const authors = await Author.findAll({ include: Book });

    // Send the list of authors as a JSON response
    res.json(authors);
  } catch (err) {
    console.error('Error fetching authors with books:', err);
    res.status(500).send('Internal Server Error');
  }
});
// index.js

// ... (other imports and setup)

// Express route to fetch all books with their authors
app.get('/book', async (req, res) => {
  try {
    // Fetch all books with their associated authors
    const books = await Book.findAll({ include: Author });

    // Format the response to include book title and author name
    const formattedBooks = books.map(book => ({
      title: book.title,
      author: book.Author ? book.Author.name : 'Unknown',
    }));

    // Send the list of books with authors as a JSON response
    res.json(formattedBooks);
  } catch (err) {
    console.error('Error fetching books with authors:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ... (other routes and server setup)

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
