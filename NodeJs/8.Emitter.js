const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('this happens asynchronously: ', a, b);
    });
});
myEmitter.emit('event', 'a1', 'b2');











console.log("-----------------------------------------------")
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter { }
const myEmitterEvery = new MyEmitter();
let m = 0;
myEmitterEvery.on('event', () => {
    console.log(++m);
});
myEmitterEvery.emit('event');
// Prints: 1
myEmitterEvery.emit('event');
// Prints: 2

console.log("-----------------------------------------------")

let x = 0;
const myEmitterOnce = new MyEmitter();
myEmitterOnce.once('event', () => {
    console.log(++x);
});
myEmitterOnce.emit('event');
// Prints: 1
myEmitterOnce.emit('event');
// Ignored
console.log("-----------------------------------------------")


const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter { }
const myEmitterErr = new MyEmitter();
// myEmitterErr.emit('error', new Error('whoops!'));
// Throws and crashes Node.js