const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
    // When a client connects, log it
    console.log('Client connected');

    // Handle data received from the client
    socket.on('data', (data) => {
        console.log('Data received from client:', data.toString());
    });

    // Handle client disconnection
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

// Start listening on a specific port
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
