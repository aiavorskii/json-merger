const fs = require('fs');
const path = require('path');
const jsonMerger = require('json-merger');

const folderPath = './jsons'; // The folder path where your JSON files are located (current directory in this case).

const outputFile = 'result_' + Date.now() + '.json'; // The name of the output file.
// Read the files in the folder and filter for JSON files.
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

  if (jsonFiles.length === 0) {
    console.log('No JSON files found in the folder.');
    return;
  }

  // Merge the JSON files.
  const result = jsonMerger.mergeFiles(jsonFiles.map(file => path.join(folderPath, file)));

  console.log('Merged JSON result:', result);

  fs.writeFile(outputFile, JSON.stringify(result, null, 2), err => {
    if (err) {
      console.error('Error writing result.json:', err);
      return;
    }
    console.log('Merged JSON saved to result.json');
  });
});
