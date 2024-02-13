import https from 'https';
import http from 'http';
import fs from 'fs';
import config from './src/config/config.js';
import app from './src/app.js';
import { setupSocketIO } from './src/socket.js';

// Check for protocol 
let server;
if (config.protocol === 'https') {
    // Create server using https
    server = https.createServer(
        {
            key: fs.readFileSync(config.certificate.privkey, 'utf8'),
            cert: fs.readFileSync(config.certificate.fullchain, 'utf8'),
        },
        app
    );
} else {
    // Create server using http
    server = http.createServer(app);
}

// Set up socket.io
setupSocketIO(server);

// Start the Express server
server.listen(config.port, () => {
    console.log(
        `Server is listening on port ${config.port} in ${config.node_env} mode`
    );
});
