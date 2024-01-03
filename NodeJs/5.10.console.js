// Output a simple message to the console
console.log('Hello, World!');

// Output an informational message
console.info('This is an informational message.');

// Output a warning message
console.warn('This is a warning message.');

// Output an error message
console.error('This is an error message.');

// Display tabular data as a table
const data = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
console.table(data);

// Group log messages together
console.group('Group');
console.log('Message 1');
console.log('Message 2');
console.groupEnd();

// Output the number of times console.count() has been called
for (let i = 3; i < 5; i++) {
  console.count('Loop iteration');
}

// Measure the time it takes to execute a block of code
console.time('Timer');
// Code to be timed
console.timeEnd('Timer');

// Assert a condition and output an error message if the condition is false
console.assert(1 === "1", 'Assertion failed: 1 is not equal to "1"');

// // Clear the console
// console.clear();


console.count()
// default: 1
// undefined
console.count('default')
// default: 2
// undefined
console.count('abc')
// abc: 1
// undefined
console.count('xyz')
// xyz: 1
// undefined
console.count('abc')
// abc: 2
// undefined
console.count()
// default: 3
// undefined


console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']);


// -----------------------------------------------------------------------
// Start the timer
console.time('MyTimer');

// Simulate a time-consuming operation (e.g., a loop)
for (let i = 0; i < 1000000; i++) {
  // Do some work
}

// Stop the timer and display the elapsed time
console.timeEnd('MyTimer');
// -----------------------------------------------------------------------
function expensiveProcess() {
    // Simulate a time-consuming calculation
    for (let i = 0; i < 1000000000; i++) {
        // Some computational work
    }

    // Simulate I/O operations or other resource-intensive tasks
    const result = Math.random();

    return result;
}

console.time('process');
const result = expensiveProcess();
console.timeLog('process', 'Result:', result);
console.timeEnd('process');


console.trace('Show me');



function timeConsumingOperation() {
    for (let i = 0; i < 1000000; i++) {
        Math.sqrt(i);
    }
}

console.profile('MyProfile');  // Start recording a profile with the label 'MyProfile'

// Perform some time-consuming operation
timeConsumingOperation();

console.profileEnd();  // Stop recording the profile


console.timeStamp("1")