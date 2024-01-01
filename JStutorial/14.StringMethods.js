var originalString = "   Hello, World!   ";

// String length
console.log("String length:", originalString.length);

// String slice(start, end)
console.log("String slice(0, 10):", originalString.slice(0, 10));

// String substring(start, end)
console.log("String substring(7, 12):", originalString.substring(7, 12));

// String substr(start, length)
console.log("String substr(7, 5):", originalString.substr(7, 5));

// String replace(oldStr, newStr)
var replacedString = originalString.replace("World", "JavaScript"); // case sensitivw
console.log("String replace('World', 'JavaScript'):", replacedString);

// String replaceAll(oldStr, newStr) (ES2021+)
var replacedAllString = originalString.replaceAll("World", "JavaScript");
console.log("String replaceAll('World', 'JavaScript'):", replacedAllString);

// String toUpperCase() / toLowerCase()
console.log("String toUpperCase():", originalString.toUpperCase());

// String concat()
var concatenatedString = "Goodbye".concat(originalString);
console.log("String concat('Goodbye'):", concatenatedString);

// String trim()
console.log("String trim():", originalString.trim());

// String trimStart() / trimEnd() (ES2019+)
console.log("String trimStart():", originalString.trimStart());
console.log("String trimEnd():", originalString.trimEnd());

// String padStart(length, padString) / padEnd(length, padString) (ES2017+)
console.log("String padStart(15, '0'):", originalString.padStart(15, '0'));
console.log("String padEnd(15, '0'):", originalString.padEnd(15, '0'));
console.log("dhruv".padStart(7,"*").padEnd(9,"*"))


// String charAt(index)
console.log("String charAt(1):", originalString.charAt(1));

// String charCodeAt(index)
console.log("String charCodeAt(1):", originalString.charCodeAt(1));

// String split(separator)
var fruitsString = "apple,orange,banana";
var fruitsArray = fruitsString.split(",");
console.log("String split(','): ", fruitsArray);


let text = "Please visit Microsoft and Microsoft!, Sicrsoft";
let newText = text.replace(/.soft/g, "W3Schools");
console.log(newText)

