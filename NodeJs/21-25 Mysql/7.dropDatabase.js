// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Drop the database (for demonstration purposes)
const dropDatabaseQuery = 'DROP DATABASE IF EXISTS your_database';
connection.query(dropDatabaseQuery, (err, result) => {
  if (err) throw err;
  console.log('Database dropped successfully');

  // Don't forget to end the connection when done
  connection.end();
});
