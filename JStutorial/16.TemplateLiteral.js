// Using backticks to create a template literal
const greeting = `Hello, World!`;

// Embedding expressions using ${}
const name = "John";
const message = `Welcome, ${name}!`;

console.log(greeting); // Output: Hello, World!
console.log(message); // Output: Welcome, John!

// Multiline string using template literals
const multilineString = `
  This is a multiline string.
  It can span multiple lines.
  Great for readability.
`;

console.log(multilineString);

const a = 5;
const b = 10;

// Embedding expressions in a template literal
const result = `The sum of a=${a} and b=${b} is a+b=${a + b}.`;

console.log(result); // Output: The sum of 5 and 10 is 15.

function myTagFunction(strings, ...values) {
  console.log(strings); // Array of string literals
  console.log(values); // Array of evaluated expressions
}

const x = 5;
const y = 10;

myTagFunction`The result is: ${x + y}.`;
// Output: ["The result is: ", "."], [15]



let text = `He's often called "Johnny"`;

let price = 7;
let VAT = 0.348;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;
console.log(total,(price * (1 + VAT)))



let header = "Templates Literals";
let tags = ["template literals", "javascript", "es6"];

let html = `<h2>${header}</h2><ul>`;
for (const x of tags) {
  html += `<li>${x}</li>`;
}

html += `</ul>`;

console.log(html)