// Example 1: Simple if statement
let temperature = 25;

if (temperature > 30) {
  console.log('It\'s a hot day!');
} else {
  console.log('It\'s not too hot today.');
}

// Example 2: if, else if, and else statements
let timeOfDay = 15;

if (timeOfDay < 12) {
  console.log('Good morning!');
} else if (timeOfDay < 18) {
  console.log('Good afternoon!');
} else {
  console.log('Good evening!');
}

// Example 3: Combining conditions with logical operators
let isWeekend = true;
let isSunny = false;

if (isWeekend && isSunny) {
  console.log('Perfect weather for outdoor activities!');
} else if (isWeekend || !isSunny) {
  console.log('You can still have a good time.');
} else {
  console.log('It\'s a regular weekday.');
}
