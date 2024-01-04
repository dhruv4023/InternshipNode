const http = require('http');

const options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    res.on('end', () => {
        console.log(data);
    });
});

// Handle errors during the request.
req.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
});

// End the request.
req.end();
