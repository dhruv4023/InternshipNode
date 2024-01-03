const base64String = 'SGVsbG8sIGJ0b2Eh';

// Decoding the base64 string to binary
const binaryString = atob(base64String);

console.log(binaryString);
// Output: Hello, btoa!


// Decoding the base64 string to binary using Buffer in Node.js
const binaryString2 = Buffer.from(base64String, 'base64').toString('binary');

console.log(binaryString2);
// Output: Hello, btoa!
