
const fs = require('fs');

const jsonFileName = 'data.json';

fs.readFile(jsonFileName, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        var jsonData = JSON.parse(data);

        const keys = Object.keys(jsonData[0])
        console.log(keys)

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
