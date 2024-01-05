// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Use the created database
connection.changeUser({ database: 'xyz' }, (err) => {
  if (err) throw err;

  // Create a table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL
    )
  `;
  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table created successfully');

    // Don't forget to end the connection when done
    connection.end();
  });
});
