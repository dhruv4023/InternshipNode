// Example 1: Using call
function greet(name) {
  console.log(`Hello, ${name}! I'm ${this.title} ${this.name}.`);
}

const person = {
  name: "John",
  title: "Mr",
};

console.log("Example 1: Using call");
greet.call(person, "Alice"); // Hello, Alice! I'm Mr John.
console.log();

// Example 2: Using apply
function introduce(age, occupation) {
  console.log(
    `I'm ${this.name}, ${age} years old, and I work as a ${occupation}.`
  );
}

const personInfo = {
  name: "Alice",
  age: 25,
};

console.log("Example 2: Using apply");
introduce.apply(personInfo, [30, "software developer"]); // I'm Alice, 25 years old, and I work as a software developer.
console.log();

// Example 3: Using bind
function printDetails() {
  console.log(`Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`);
}

const user = {
  name: "Alex",
  age: 30,
  gender: "Male",
};

console.log("Example 3: Using bind");
const boundPrint = printDetails.bind(user);
boundPrint(); // Name: Alex, Age: 30, Gender: Male
console.log();
