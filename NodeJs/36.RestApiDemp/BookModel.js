const { mongoose } = require("mongoose");

const bookSchema = mongoose.Schema({
  ISBN: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  }
  // Add more fields as needed to represent book information
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book
