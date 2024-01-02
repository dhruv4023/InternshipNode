// Using a for loop
console.log("Using for loop:");
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Using for-in loop with an object
console.log("\nUsing for-in loop:");
const person = { name: "Alice", age: 25 };
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// Using for-of loop with an array
console.log("\nUsing for-of loop:");
const numbers = [1, 2, 3, 4, 5];
for (let num of numbers) {
  console.log(num);
}

// Using a while loop
console.log("\nUsing while loop:");
let counter = 0;
while (counter < 5) {
  console.log(counter);
  counter++;
}


let language = "JavaScript";

let text = "";
for (let x of language) {
text += x;
}