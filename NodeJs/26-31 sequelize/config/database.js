// config.js
const config = {
    development: {
        username: 'root',
        password: '',
        database: 'sequelize_db',
        host: 'localhost',
        dialect: 'mysql', // Choose the appropriate dialect for your database (e.g., 'mysql', 'postgres', 'sqlite')
    },
    test: {
        // similar configuration as development
    },
    production: {
        // production configuration
    },
};

// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.development); // Use the appropriate environment (development, production, etc.)

module.exports = sequelize;
