// module.require
const fs = module.require('fs');
const content = fs.readFileSync('tmp.txt', 'utf8');
console.log(content);

// myModule.js
const myVariable = 'Hello from myModule!';
function myFunction() {
    console.log('Executing myFunction in myModule!');
}
module.exports = {
    myVariable,
    myFunction
};

// printModuleInfo.js
console.log('Module ID:', module.id);
console.log('Module Filename:', module.filename);
