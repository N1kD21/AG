'use strict';
const fs = require('fs');
const path = require('path');

async function createFolder(data) {
  //path to folder
  const folderPath = `${data.id}`;

  // Creating folder
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error when creating folder:', err);
      return;
    }
    console.log(`folder created by path: ${folderPath}`);

    // path to txt file
    const filePath = path.join(folderPath, `${data.id}.txt`);

    // data for txt file
    const fileContent = JSON.stringify(data.short_info, null, '\t');

    // writing to file
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error('error when creating file:', err);
        return;
      }
      console.log(`data wrote in file: ${filePath}`);
    });

  });

}

module.exports = createFolder;