function recursiveSort(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        obj.sort((a, b) => a.type < (b.type) ? -1 : 1);
        obj.forEach(item => recursiveSort(item));
    } else {
        Object.keys(obj).forEach(k => {
            obj[k] = recursiveSort(obj[k]);
        });
    }

    return obj;
}

const fs = require('fs');

const jsonFileName = 'data.json';

fs.readFile(jsonFileName, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        var jsonData = JSON.parse(data);

        jsonData = recursiveSort(jsonData)

        fs.writeFile("output.json", JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
                return;
            }

            console.log('Data has been written to the JSON file successfully.');
        });
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
