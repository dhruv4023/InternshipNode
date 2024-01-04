var fs = require('fs');

fs.rename('tmp.txt', 'xyz.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
});
