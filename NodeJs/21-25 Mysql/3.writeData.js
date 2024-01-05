// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Create operation
const createQuery = 'INSERT INTO users (username, email) VALUES (?, ?)';
const createData = ['JohnDoe', 'john.doe@example.com'];

connection.query(createQuery, createData, (err, result) => {
  if (err) throw err;
  console.log('Data inserted successfully');

  // Don't forget to end the connection when done
  connection.end();
});
