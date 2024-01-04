function greet(name, callback) {
    const message = `Hello, ${name}!`;
    callback(null, message);
}

// Usage
greet('John', (error, result) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(result);
    }
});
