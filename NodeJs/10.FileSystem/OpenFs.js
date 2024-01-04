var fs = require('fs');

fs.open('tmp.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
