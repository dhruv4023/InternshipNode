const net = require('net');

const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to server');
    client.write('Hello, server! This is the client.');
});

client.on('data', (data) => {
    console.log('Data received from server:', data.toString());
    client.end();
});

client.on('end', () => {
    console.log('Disconnected from server');
});
