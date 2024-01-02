// main.js
const math = require('./maths.js'); // This will import the add function
const { sub } = require('./maths.js');   // This will import the sub function directly

console.log(sub(1,2))
console.log(math.sub(1,2))
console.log(math.add(1,2))
