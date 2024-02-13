const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up a route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Initialize an array to store connected clients
const clients = [];

// Listen for socket.io connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Add the new client to the clients array
    clients.push(socket);

    // Listen for messages from this client
    socket.on('message', (data) => {
        // Broadcast the message to all connected clients
        clients.forEach((client) => {
            // if (client !== socket) {
                client.emit('message', data);
            // }
        });
    });

    // Listen for client disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        
        // Remove the client from the clients array
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
