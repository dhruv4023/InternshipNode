const fs = require("fs")

// 5. Converting Callbacks to Promises
function readFileContentPromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Usage
readFileContentPromise('example.txt')
    .then(content => console.log('5. Callback to Promise:', content))
    .catch(error => console.error('5. Callback to Promise Error:', error.message));
