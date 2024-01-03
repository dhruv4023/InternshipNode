// // Using setImmediate to schedule a callback
// const immediateObject = setImmediate(() => {
//     console.log('Immediate callback executed!');
// });

// // Clearing the immediate callback before it gets a chance to execute
// console.log(1)
// console.log(2)
// clearImmediate(immediateObject);
// console.log(4)
// console.log(5)
// console.log('Immediate callback cleared.');

function performAsyncTask() {
    console.log('Async task is being performed...');
}

// Schedule the async task to run in the next iteration of the event loop
const immediateObject = setImmediate(performAsyncTask);

// Simulate some other code or conditions
console.log('Some other code...');

// Cancel the scheduled async task
clearImmediate(immediateObject);

console.log('Async task canceled.');
