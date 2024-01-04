function fetchData(callback) {
    setTimeout(() => {
        const data = 'Async data';
        callback(null, data);
    }, 1000);
}

// Usage
fetchData((error, result) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', result);
    }
});
