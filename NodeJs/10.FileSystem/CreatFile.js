var fs = require('fs');

fs.appendFile('tmp.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});
