const { setImmediate, clearInterval, clearTimeout, setInterval, setTimeout } = require('timers');

// Example using setImmediate
const immediate = setImmediate(() => {
    console.log('Immediate callback!');
});

// Clear the immediate callback
clearImmediate(immediate);

// Example using setInterval
const interval = setInterval(() => {
    console.log('Interval tick!');
}, 1000);

// Clear the interval
clearInterval(interval);

// Example using setTimeout
const timeout = setTimeout(() => {
    console.log('Timeout expired!');
}, 1000);

// Clear the timeout
clearTimeout(timeout);

// Example using ref and unref
const refTimeout = setTimeout(() => {
    console.log('Ref Timeout callback!');
}, 2000);

// Make the timeout active
refTimeout.ref();

// Make the timeout inactive (unref)
refTimeout.unref();
