
// 3. Promise Chaining
const multiplyByTwo = value =>
    new Promise((resolve, reject) => {
        const result = value * 2;
        resolve(result);
    });

// Usage
fetchData()
    .then(multiplyByTwo)
    .then(result => console.log('3. Chained Promises:', result))
    .catch(error => console.error('3. Chained Promises Error:', error.message));
