// Import the connection object from dbConnection.js
const connection = require('./dbConnection');

// Performing a join
const joinQuery = `
  SELECT users.username, orders.order_id, orders.product
  FROM users
  INNER JOIN orders ON users.id = orders.user_id
`;

connection.query(joinQuery, (err, result) => {
  if (err) throw err;
  console.log('Join result:', result);

  // Don't forget to end the connection when done
  connection.end();
});
