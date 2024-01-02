// Creating a new Set
const mySet = new Set();

// Adding elements to the Set using add()
mySet.add('apple');
mySet.add('banana');
mySet.add('orange');

// Checking the size of the Set using size
console.log('Size of the Set:', mySet.size);

// Adding a duplicate element (won't be added, as Sets only store unique values)
mySet.add('apple');

// Checking the size again after attempting to add a duplicate
console.log('Size of the Set after attempting to add a duplicate:', mySet.size);

// Checking if an element exists in the Set using has()
console.log('Does the Set have "banana"?', mySet.has('banana'));
console.log('Does the Set have "grape"?', mySet.has('grape'));

// Removing an element from the Set using delete()
mySet.delete('banana');

// Checking the size after deletion
console.log('Size of the Set after deleting "banana":', mySet.size);

// Iterating over the Set using forEach()
console.log('Iterating over the Set using forEach:');
mySet.forEach((value) => {
  console.log(value);
});

// Creating an iterator using values()
const iterator = mySet.values();

// Iterating over the Set using the iterator
console.log('\nIterating over the Set using iterator:');
let next = iterator.next();
while (!next.done) {
  console.log(next.value);
  next = iterator.next();
}
