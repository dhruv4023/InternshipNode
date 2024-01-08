// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Make sure to replace this with your Sequelize configuration

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
});
sequelize.sync();
module.exports = User;
