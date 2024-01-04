
// 2. Promises with Asynchronous Operations
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = 'Async data';
            resolve(data);
        }, 1000);
    });
}

// Usage
fetchData()
    .then(result => console.log('2. Async Promise:', result))
    .catch(error => console.error('2. Async Promise Error:', error.message));
