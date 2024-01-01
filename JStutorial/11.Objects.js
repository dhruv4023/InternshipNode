function Person(name, age, isStudent) {
  this.name = name;
  this.age = age;
  this.isStudent = isStudent;
}

var person = new Person("John", 30, false);

// Accessing properties using dot notation
console.log(person.name); // Output: John

// Accessing properties using bracket notation
console.log(person["age"]); // Output: 30

// Modifying a property
person.age = 31;
console.log(person.age);

// Adding a new property
person.country = "USA";

var car = {
  brand: "Toyota",
  model: "Camry",
  start() {
    console.log("The car is starting...");
  },
};

// Calling an object method
car.start(); // Output: The car is starting...

// nested object
var student = {
  name: "Alice",
  grades: {
    math: 90,
    english: 85,
    science: 92,
  },
};

// Accessing nested properties
console.log(student.grades.math); // Output: 90

// Destructuring assignment
var { name, age } = person;
console.log(name, age); // Output: John 31

// Object.keys returns an array of object keys
var keys = Object.keys(student);
console.log(keys); // Output: ["name", "grade"]

// Object.values returns an array of object values
var values = Object.values(person);
console.log(values); // Output: ["John", 31, false, "USA"]

var person = {
  name: "abc",
  age: "20",
  hobbies: ["reading", "sleepy", "mobile", "gaming"],
};
console.log(person);
// {
//      name: 'abc',
//      age: '20',
//      hobbies: [ 'reading', 'sleepy', 'mobile', 'gaming' ]
// }
console.log(person.hobbies); // [ 'reading', 'sleepy', 'mobile', 'gaming' ]
console.log(person.hobbies[1]); // sleepy
console.log(person.age); // 20



// Trying to modify the frozen object will result in an error
var frozenObj = Object.freeze({ key: "value" });


// Properties can't be added or removed, but existing ones can be modified
var sealedObj = Object.seal({ key: "value" });
