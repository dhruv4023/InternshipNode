// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Read operation
const readQuery = 'SELECT * FROM users';
connection.query(readQuery, (err, rows) => {
  if (err) throw err;
  console.log('Data selected:', rows);

  // Don't forget to end the connection when done
  connection.end();
});
