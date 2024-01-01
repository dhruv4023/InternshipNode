var x = 10; // assignment


var y = 5;
y += 3; // Equivalent to: y = y + 3;


var z = 8;
z -= 2; // Equivalent to: z = z - 2;


var a = 4;
a *= 3; // Equivalent to: a = a * 3;


var c = 11;
c %= 3; // Equivalent to: c = c % 3;


var b = 12;
b /= 4; // Equivalent to: b = b / 4;


var d = 2;
d **= 3; // Equivalent to: d = d ** 3;

// Bitwise assignment operators 
var x = 5;
x &= 3; // Equivalent to: x = x & 3;


var y = 8;
y |= 2; // Equivalent to: y = y | 2;


var z = 6;
z ^= 1; // Equivalent to: z = z ^ 1;  XOR

// left shift
var x = 5; // 1 0 1 
x <<= 3; // 1 0 1 0 0 0
console.log(x); 


// right shift
var x = 5; // 1 0 1 
x >>= 1; // 1 0
console.log(x); 
