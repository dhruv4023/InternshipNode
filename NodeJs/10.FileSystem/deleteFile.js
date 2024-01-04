var fs = require('fs');

fs.unlink('tmp.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
