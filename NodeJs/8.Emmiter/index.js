const express = require('express');
const EventEmitter = require('events');

// Create an Express application
const app = express();

// Create a custom event emitter instance
const eventEmitter = new EventEmitter();

// Define an event handler
const logRequestHandler = (request) => {
  console.log(`Request received: ${request.method} ${request.url}`);
};

// Attach the event handler to the 'logRequest' event
eventEmitter.on('logRequest', logRequestHandler);

// Middleware to emit the 'logRequest' event for every incoming request
app.use((req, res, next) => {
  eventEmitter.emit('logRequest', req);
  next();
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
