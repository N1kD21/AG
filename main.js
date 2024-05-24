'use strict';
const takingFloatData = require('./puppeteer.js');
const createFolder = require('./folders.js');
const saveImage = require('./image.js');

const link = 'https://www.myhome.ge/ka/s/iyideba-bina-Tbilisi/?Keyword=%E1%83%95%E1%83%';
//taking data from link
(async() => {
  const data = await takingFloatData(link);

  for (const float of data) {
    // creating folders
    await createFolder(float);
    //saving image into folder
    await saveImage(float);
  }

})()