function delayedMessage(message) {
    console.log(`Delayed message: ${message}`);
}

// Set up a timeout to execute delayedMessage after 2000 milliseconds (2 seconds)
const timeoutObject = setTimeout(delayedMessage, 2000, 'Hello, setTimeout!');

// Simulate some other code or conditions
console.log('Some other code...');

// const intervalObject = setTimeout(()=>{
clearTimeout(timeoutObject)
console.log('Timeout canceled.');
// }, 3000);

// it used to Cancel the timeout before it occurs
