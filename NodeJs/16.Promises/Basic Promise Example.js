const fs = require('fs');

// 1. Basic Promise Example
const basicPromise = new Promise((resolve, reject) => {
    const success = true; // Change to false to simulate rejection

    if (success) {
        resolve('Promise resolved successfully');
    } else {
        reject(new Error('Promise rejected'));
    }
});

basicPromise
    .then(result => console.log('1. Basic Promise:', result))
    .catch(error => console.error('1. Basic Promise Error:', error.message));


    