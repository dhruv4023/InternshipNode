function divide(dividend, divisor, callback) {
    if (divisor === 0) {
        callback(new Error('Division by zero is not allowed'));
    } else {
        const result = dividend / divisor;
        callback(null, result);
    }
}

// Usage
divide(10, 2, (error, result) => {
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Result:', result);
    }
});
