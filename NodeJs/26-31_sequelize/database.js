// database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zz', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
