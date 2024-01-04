var fs = require('fs');

fs.appendFile('tmp.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
