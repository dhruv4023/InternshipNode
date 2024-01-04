const https = require('https');
const fs = require('fs');

// Read the SSL certificate and private key files
const privateKey = fs.readFileSync('server-key.pem', 'utf8');
const certificate = fs.readFileSync('server-cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, (req, res) => {
    // Handling HTTPS requests and responses
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, HTTPS Server!');
});

const PORT = 4430;

server.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}/`);
});
