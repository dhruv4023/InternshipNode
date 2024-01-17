// What's the output? Add write reason also.
let a = 3;
let b = new Number(3);
let c = 3;
// ==   --> checks only data of the varible 
console.log(a == b); // true - both a and b contains same number 3 

// ==   --> checks both type and data of the varible 
console.log(a === b); // false - both a and b contains same number 3 however type of a is number while type of b is an object 
console.log(b === c); // false - both a and b contains same number 3 however type of c is number while type of b is an object
