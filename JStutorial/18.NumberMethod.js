// 1. toString()
var number1 = 123;
var stringNumber = number1.toString();
console.log("1. toString():", stringNumber); // Output: "123"

// 2. toExponential()
var number2 = 12345;
var exponentialNotation = number2.toExponential(2);
console.log("2. toExponential():", exponentialNotation); // Output: "1.23e+4"

// 3. toFixed()
var number3 = 123.456789;
var fixedNumber = number3.toFixed(2);
console.log("3. toFixed():", fixedNumber); // Output: "123.46"

// 4. toPrecision()
var number4 = 123.456789;
var precisionNumber = number4.toPrecision(5);
console.log("4. toPrecision():", precisionNumber); // Output: "123.46"

// 5. valueOf()
var number5 = new Number(42);
var primitiveValue = number5.valueOf();
console.log("5. valueOf():", primitiveValue); // Output: 42

// 6. Number()
var stringNumber2 = "123";
var convertedNumber = Number(stringNumber2);
console.log("6. Number():", convertedNumber); // Output: 123

// 7. parseFloat()
var floatValue = parseFloat("3.14");
console.log("7. parseFloat():", floatValue); // Output: 3.14

// 8. parseInt()
var intValue = parseInt("42.9");
console.log("8. parseInt():", intValue); // Output: 42
