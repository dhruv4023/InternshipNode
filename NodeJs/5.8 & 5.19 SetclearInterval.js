// Function to be executed at intervals
function printMessage() {
    console.log('Interval message!');
}

// Set up an interval to execute printMessage every 1000 milliseconds (1 second)
const intervalObject = setInterval(printMessage, 1000);

// Simulate some other code or conditions
console.log('Some other code...');

// Cancel the interval after 5 seconds
setTimeout(() => {
    clearInterval(intervalObject);
    console.log('Interval canceled after 5 seconds.');
}, 5000);
