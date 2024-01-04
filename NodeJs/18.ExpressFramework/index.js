const express = require('express');
const app = express();

// Middleware function
app.use((req, res, next) => {
    console.log(`Received a ${req.method} request for ${req.url}`);
    next(); // Call the next middleware in the stack
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
