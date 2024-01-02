// Example 1: Arrays
const fruits = ['apple', 'banana', 'orange'];
console.log('Array Iteration:');
for (const fruit of fruits) {
  console.log(fruit);
}

// Example 2: Strings
const message = 'Hello';
console.log('\nString Iteration:');
for (const char of message) {
  console.log(char);
}

// Example 3: Maps
const myMap = new Map();
myMap.set('name', 'John');
myMap.set('age', 30);
console.log('\nMap Iteration:');
for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}

// Example 4: Sets
const mySet = new Set([1, 2, 3, 4, 5]);
console.log('\nSet Iteration:');
for (const value of mySet) {
  console.log(value);
}

// Example : Arguments Object
function exampleFunction() {
  console.log('\nArguments Object Iteration:');
  for (const arg of arguments) {
    console.log(arg);
  }
}

exampleFunction(1, 'two', true);
