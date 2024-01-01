var sum = 5 + 3; // Result: 8
var difference = 7 - 2; // Result: 5
var product = 4 * 6; // Result: 24
var quotient = 10 / 2; // Result: 5
var remainder = 11 % 3; // Result: 2 (11 divided by 3 is 3 with a remainder of 2)
var x = 5;
x++; // Increment x by 1, now x is 6
x--; // Decrement x by 1, now x is 5 again
var result = 2 ** 3; // Result: 8 (2 raised to the power of 3)
var result = (5 + 3) * 2; // Result: 16 (5 + 3 is evaluated first, then multiplied by 2)


// left shift
var x = 5; // 1 0 1 
y = x << 3; // 1 0 1 0 0 0
console.log(x); 


// right shift
var x = -5; // 0 1 0 1 
x >>= 1; // 1 0
console.log(x); 


// unsigned right shift
var x = 5; // 0 1 0 1 
x >>>= 1; // 1 0
console.log(x); 
