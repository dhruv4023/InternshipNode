// myModule.js

// Exporting a variable
exports.myVariable = 'Hello from myModule!';

// Exporting a function
exports.myFunction = function() {
  console.log('Executing myFunction in myModule!');
};

// Exporting an object
exports.myObject = {
  key: 'value',
  method: function() {
    console.log('Executing method in myObject!');
  }
};
