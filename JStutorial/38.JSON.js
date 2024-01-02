// Example 1: Converting JavaScript Object to JSON String
const person = {
  name: "John",
  age: 30,
  city: "New York",
};

const jsonPerson = JSON.stringify(person);
console.log("Example 1: Converting JavaScript Object to JSON String");
console.log("JavaScript Object:", person);
console.log("JSON String:", jsonPerson);
console.log();

// Example 2: Parsing JSON String to JavaScript Object
const jsonString = '{"name":"Alice","age":25,"city":"London"}';
const parsedPerson = JSON.parse(jsonString);
console.log("Example 2: Parsing JSON String to JavaScript Object");
console.log("JSON String:", jsonString);
console.log("JavaScript Object:", parsedPerson);
console.log();

// Example 3: Handling JSON with Arrays
const fruitsArray = ["apple", "banana", "orange"];
const jsonFruits = JSON.stringify(fruitsArray);
console.log("Example 3: Handling JSON with Arrays");
console.log("JavaScript Array:", fruitsArray);
console.log("JSON String:", jsonFruits);
console.log();

// Example 4: Handling JSON with Nested Objects
const nestedObject = {
  name: "Tom",
  details: {
    age: 35,
    location: "Paris",
  },
};

const jsonNestedObject = JSON.stringify(nestedObject);
console.log("Example 4: Handling JSON with Nested Objects");
console.log("JavaScript Nested Object:", nestedObject);
console.log("JSON String:", jsonNestedObject);
console.log();
