const fs = require('fs');

const jsonFileName = 'data.json';

fs.readFile(jsonFileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log(jsonData.sort((x, y) => y.id - x.id))
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
