// Example Array
const numbers = [1, 2, 3, 4, 5];

// Example 1: Using map() to create a new array with squared values
const squaredNumbers = numbers.map((num) => num ** 2);
console.log("Using map():", squaredNumbers);

// Example 2: Using forEach() to log each element in the array
console.log("\nUsing forEach():");
numbers.forEach((num) => {
  console.log(num);
});

// Example 3: Using reduce() to calculate the sum of all elements
const sum = numbers.reduce((tmpSum, num) => tmpSum + num, 0);
console.log("\nUsing reduce():", sum);

// Example 4: Using some() to check if there is at least one even number
const hasEvenNumber = numbers.some((num) => num % 2 === 0);
console.log("\nUsing some():", hasEvenNumber);

// Example 4: Using every() to check if there is all even number
const hasAllEvenNumber = numbers.every((num) => num % 2 === 0);
console.log("\nUsing every():", hasAllEvenNumber);

// Example 5: Using filter() to create a new array with only even numbers
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("\nUsing filter():", evenNumbers);

// Example 6: Using find() to find the first even number in the array
const firstEvenNumber = numbers.find((num) => num % 2 === 0);
console.log("\nUsing find():", firstEvenNumber);
