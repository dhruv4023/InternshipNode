// Example 1: Using the ternary operator to determine if it's raining
let isRaining = true;
let weather = isRaining ? "Bring an umbrella" : "No need for an umbrella";
console.log("Weather:", weather);

// Example 2: Using the ternary operator to check if a number is even or odd
let number = 10;
let isEven = number % 2 === 0 ? "Even" : "Odd";
console.log(`${number} is ${isEven}`);

// Example 3: Nesting ternary operators for multiple conditions
let temperature = 25;
let weatherType = temperature > 30 ? "Hot" : temperature > 20 ? "Warm" : "Cool";
console.log(`Weather type: ${weatherType}`);

// if-else

let age = 4;
let drink;

if (age >= 5) {
  drink = "coffee";
} else {
  drink = "milk";
}

console.log(drink);

// ternary operator / conditional operator

age = 3;
drink = age >= 5 ? "coffee" : "milk";
console.log(drink);
