const fs = require('fs');

function readFileContent(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(err, data);
        }
    });
}

// Usage
readFileContent('example.txt', (error, content) => {
    if (error) {
        console.error('Error reading file:', error.message);
    } else {
        console.log('File Content:', content);
    }
});

