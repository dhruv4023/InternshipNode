const fs = require('fs');
const EventEmitter = require('events');
// 1. Try-Catch Blocks
try {
    // Code that may throw an exception
    throw new Error('An example error');
} catch (error) {
    console.error('1. Caught an error:', error.message);
}

// 2. Error-First Callbacks
function readFileAndHandleError(filename, callback) {
    fs.readFile(filename, (err, data) => {
        if (err) {
            // Handle error
            return callback(err);
        }

        // Process data
        callback(null, data);
    });
}

// 3. Promises and Async/Await
// Using .catch() with promises
function someAsyncFunction() {
    return new Promise((resolve, reject) => {
        // Simulating asynchronous operation
        setTimeout(() => {
            reject(new Error('Promise rejected'));
        }, 1000);
    });
}

someAsyncFunction()
    .then(result => {
        // Handle success
    })
    .catch(error => {
        // Handle error
        console.error('3. Promise rejected:', error.message);
    });

// Using try-catch with async/await
async function fetchDataFromAPI() {
    return new Promise((resolve, reject) => {
        // Simulating asynchronous operation
        setTimeout(() => {
            reject(new Error('Error fetching data from API'));
        }, 1000);
    });
}

async function fetchData() {
    try {
        const data = await fetchDataFromAPI();
        // Process data
    } catch (error) {
        console.error('3. Error fetching data:', error.message);
    }
}

// 4. Event Emitters
const emitter = new EventEmitter();

emitter.on('error', (error) => {
    console.error('4. Error event:', error.message);
});

emitter.emit('error', new Error('Something went wrong'));

// 5. Global Unhandled Rejection and Uncaught Exception Events
process.on('unhandledRejection', (reason, promise) => {
    console.error('5. Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('5. Uncaught Exception:', error.message);
    process.exit(1); // Exit the process to prevent further execution
});

// 6. Logging Errors
try {
    // Code that may throw an exception
} catch (error) {
    console.error('6. Caught an error:', error);
    // Log the error or send it to a logging service
}


// 7. Custom Error Classes
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'CustomError';
        this.statusCode = statusCode || 500;
    }
}

const customError = new CustomError('Custom error message', 404);
console.error('7. Custom Error:', customError.message);
console.error('7. Custom Error Status Code:', customError.statusCode);
