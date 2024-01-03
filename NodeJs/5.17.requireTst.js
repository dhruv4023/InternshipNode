// is used to include and use external modules

// Example: Caching behavior
// const moduleA = require('./moduleA'); // ModuleA initializes some state
// const moduleB = require('./moduleB'); // ModuleB will reuse the initialized state from ModuleA


// const thirdPartyModule = require('<module-name>');



// Example: Loading the 'fs' (file system) module
const fs = require('fs');

// Now, you can use functions and objects from the 'fs' module
fs.readFile('tmp.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
