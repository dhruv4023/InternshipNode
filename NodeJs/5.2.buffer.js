// Import the 'fs' (File System) module for file operations
const fs = require('fs'); 

// Create a Buffer from a string
const bufferFromString = Buffer.from('Hello, Buffer!', 'utf-8');

// Display the Buffer content
console.log('Buffer from string:', bufferFromString);

// Create a Buffer from an array
const bufferFromArray = Buffer.from([72, 101, 108, 108, 111, 44, 32, 66, 117, 102, 102, 101, 114, 33]);

// Display the Buffer content
console.log('Buffer from array:', bufferFromArray);

// Create a Buffer from a file
const filePath = 'tmp.txt';

// Read the content of the file into a Buffer
fs.readFile(filePath, (err, bufferFromFile) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Display the Buffer content
    console.log('Buffer from file:', bufferFromFile);
});
