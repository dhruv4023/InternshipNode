const mysql = require('mysql');

// Create a connection
const connection = mysql.createConnection({
    host: 'localhost',     // Your MySQL server host
    user: 'root',          // Your MySQL username
    password: '',  // Your MySQL password
    database: 'sampledatabase'   // Your MySQL database name
});


// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', connection.threadId);
});

// Export the connection object
module.exports = connection;

