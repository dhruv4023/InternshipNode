// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Delete operation
const deleteQuery = 'DELETE FROM users WHERE username = ?';
const usernameToDelete = 'JohnDoe';

connection.query(deleteQuery, usernameToDelete, (err, result) => {
  if (err) throw err;
  console.log('Data deleted successfully');

  // Don't forget to end the connection when done
  connection.end();
});
