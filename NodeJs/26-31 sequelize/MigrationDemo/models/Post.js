// models/post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Make sure to replace this with your Sequelize configuration
const User = require('./User'); // Make sure to replace this with your Sequelize configuration

const Post = sequelize.define('Post', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
// Define association
Post.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync();
module.exports = Post;
