// Represents a binary large object, often used for handling binary data. 
// Reference: https://openjavascript.info/2022/10/17/what-is-a-blob-object-in-javascript/
const text = "I'm a little bit of data";

const blob = new Blob([text], { type: 'text/plain' });

console.log(blob);

const img=fetch('https://picsum.photos/400/400')
    .then(res => res.blob())
    .then(res => console.log(res));