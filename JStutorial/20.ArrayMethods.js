// Creating an array
let fruits = ['apple', 'banana', 'orange'];

// Array length
console.log('Array length:', fruits.length);

// Array toString()
let fruitsString = fruits.toString();
console.log('Array as a string:', fruitsString);

// Array at()
let secondFruit = fruits.at(1);
console.log('Element at index 1:', secondFruit);

// Array join()
let joinedFruits = fruits.join(', '); // Joins array elements with a comma and space
console.log('Joined array:', joinedFruits);

// Array pop()
let removedLastFruit = fruits.pop();
console.log('Removed last element:', removedLastFruit);
console.log('Array after pop:', fruits);

// Array push()
fruits.push('kiwi');
console.log('Array after push:', fruits);

// Array shift()
let removedFirstFruit = fruits.shift();
console.log('Removed first element:', removedFirstFruit);
console.log('Array after shift:', fruits);

// Array unshift()
fruits.unshift('grape');
console.log('Array after unshift:', fruits);

// Array delete() - Note: delete leaves a gap, and the length is not affected
delete fruits[1];
console.log('Array after delete:', fruits);

// Array concat()
let moreFruits = ['melon', 'cherry'];
let combinedFruits = fruits.concat(moreFruits);
console.log('Combined arrays:', combinedFruits);

// Array flat() - Example with nested arrays
let nestedArray = [1, [2, 3], [4, [5, 6]]];
let flattenedArray = nestedArray.flat(2);
console.log('Flattened array:', flattenedArray);

// Array splice() - Removes elements and/or inserts new elements
let splicedElements = fruits.splice(1, 2); // Removes 2 elements starting from index 1
console.log('Spliced elements:', splicedElements);
console.log('Array after splice:', fruits);

// Array slice() - Creates a shallow copy of a portion of the array
let slicedFruits = fruits.slice(1, 3); // Extracts elements from index 1 to 2 (not including 3)
console.log('Sliced array:', slicedFruits);

// Additional array methods (not covered in detail)
// See Also: Search Methods, Sort Methods, Iteration Methods
