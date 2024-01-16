// book.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Book;
