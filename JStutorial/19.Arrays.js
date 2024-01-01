// Creating an array
let fruits = ['apple', 'banana', 'orange'];

// Accessing elements
let firstFruit = fruits[0]; // 'apple'
console.log('First fruit:', firstFruit);

// Modifying elements
fruits[1] = 'grape'; // Changes 'banana' to 'grape'
console.log('Modified array:', fruits);

// Array methods
fruits.push('kiwi'); // Adds 'kiwi' to the end of the array
console.log('After push:', fruits);

let removedElement = fruits.pop(); // Removes and returns the last element ('kiwi')
console.log('Removed element:', removedElement);

// Iterating through the array
console.log('Iterating through the array:');
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Using forEach for iteration
console.log('Using forEach for iteration:');
fruits.forEach(function (fruit) {
  console.log(fruit);
});

// Multidimensional array
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log('Accessing element in the matrix:', matrix[1][2]); // Output: 6
