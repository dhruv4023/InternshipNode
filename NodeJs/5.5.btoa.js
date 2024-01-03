const binaryString = 'Hello, btoa!';

// Encoding the binary string to base64
const base64String = btoa(binaryString);

console.log(base64String);
// Output: SGVsbG8sIGJ0b2Eh


// btoa is a global function available in browsers
// not natively available in Node.js

// Encoding the binary string to base64
const base64String2 = btoa(binaryString);

console.log(base64String2);
// Output: SGVsbG8sIGJ0b2Eh
