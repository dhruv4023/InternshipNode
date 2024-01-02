// Example 1: Arrow function syntax
const add = (a, b) => a + b;
console.log('Example 1: Arrow function syntax');
console.log('Result of add(3, 5):', add(3, 5));
console.log();

// Example 2: Arrow function with one parameter
const square = x => x * x;
console.log('Example 2: Arrow function with one parameter');
console.log('Result of square(4):', square(4));
console.log();

// Example 3: Arrow function with no parameters
const greet = () => console.log('Hello, world!');
console.log('Example 3: Arrow function with no parameters');
greet();
console.log();

// Example 4: Arrow function as a method
const person = {
  name: 'Alice',
  greet: function () {
    console.log('Example 4: Arrow function as a method');
    console.log('Hello, ' + this.name + '!');
  },
};

person.greet();
console.log();

// Example 5: Arrow function in a setTimeout
console.log('Example 5: Arrow function in a setTimeout');
setTimeout(() => {
  console.log('Delayed execution with arrow function');
}, 1000);
console.log();

// Example 6: Arrow function and the "this" keyword
console.log('Example 6: Arrow function and the "this" keyword');
function Counter() {
  this.count = 0;
  this.increment = () => {
    this.count++;
    console.log('Current count:', this.count);
  };
}

const counter = new Counter();
counter.increment(); // Current count: 1
counter.increment(); // Current count: 2
console.log();
