const express = require('express');
const statusMonitor = require('express-status-monitor');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Use express-status-monitor middleware
app.use(statusMonitor());

app.get('/', (req, res) => {
    // Set the content type to text/plain
    res.type('text/plain');

    // Construct the file path
    const filename = 'data.txt';

    // / -----------------------------with stream---------------------------------------------------------------
    // Create a readable stream from the file
    const readableStream = fs.createReadStream(filename, 'utf-8');

    // Pipe the stream to the response
    readableStream.pipe(res);

    // Handle errors during streaming
    readableStream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
        res.status(404).end('404 Not Found');
    });
    // / -----------------------------without stream---------------------------------------------------------------
    // fs.readFile(filename, 'utf-8', (err, data) => {
    //     if (err) {
    //         console.error(`Error reading file: ${err.message}`);
    //         res.status(404).end('404 Not Found');
    //     } else {
    //         // Send the entire file content as the response
    //         res.end(data);
    //     }
    // });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Express Status Monitor running at http://localhost:${PORT}/status`);
});


