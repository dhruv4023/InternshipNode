// function call (invoke)(run)
function hello() {
  console.log("helloooo ... ");
}
hello();
// hello();
// hello();
// hello();
// hello();
// hello();

// function even(x) {
//     return x%2===0;
// }
// console.log(even(1));

// function sum(x, y) {
//     return x + y;
// }
// const x = sum(2, 8);
// console.log(x);

// function declaration
function ArrayIndex(arr, ele) {
  let i = 0;
  for (; i < arr.length; i++) if (arr[i] == ele) return i;
  return -1;
}
arr = [1, 4, 8, 52, 9, 3];
console.log(ArrayIndex(arr, 4));

// function expression
let ArrayIndexExpression = function (arr, ele) {
  let i = 0;
  for (; i < arr.length; i++) if (arr[i] == ele) return i;
  return -1;
};

console.log(ArrayIndexExpression(arr, 9));

const sum = function (x, y) {
  return x + y;
};
console.log(sum(5, 6));

// Arrow function

const hello2 = () => {
  console.log("hello2........");
};
hello2();
const sum2 = (x, y) => {
  return x + y;
};
console.log(sum2(5, 6));

const isEven = (x) => x % 2 === 0;
console.log(isEven(6));

// Anonymous function created using function expression
var add = function (x, y) {
  return x + y;
};
add(4, 8);
// Anonymous function used as an argument
setTimeout(function () {
  console.log("This is an anonymous function.");
}, 1000);

// Function expression
var multiply = function (a, b) {
  return a * b;
};

// Using the function expression
var result = multiply(3, 4); // Result: 12

// Function with default parameter
function power(base, exponent = 2) {
  return Math.pow(base, exponent);
}

// Call the function
var result1 = power(3); // Result: 9 (default exponent is 2)
var result2 = power(3, 3); // Result: 27 (provided exponent is 3)

// Function with rest parameter
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Call the function
var total = sumAll(1, 2, 3, 4, 5); // Result: 15
console.log(total);

// Callback function
function doSomethingAsync(callback) {
  setTimeout(function () {
    console.log("Task completed!");
    callback();
  }, 1000);
}

// Call the function with a callback
doSomethingAsync(function () {
  console.log("Callback executed!");
});

// IIFE (Immediately Invoked Function Expression)
(function () {
  console.log("IIFE executed!");
})();
