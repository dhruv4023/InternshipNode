// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Create a database
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS xyz';
connection.query(createDatabaseQuery, (err, result) => {
  if (err) throw err;
  console.log('Database created successfully');

  // Don't forget to end the connection when done
  connection.end();
});
