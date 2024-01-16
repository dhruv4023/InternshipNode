const Book = require('./book.js');
const Author = require('./author.js');

Author.hasMany(Book);
Book.belongsTo(Author);
const modules = { Book, Author }
module.exports = modules