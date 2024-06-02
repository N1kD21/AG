'use strict';
const axios = require('axios');
const fs = require('fs');

const downloadImage = async (float) => {
  const urls = float.photos;
  for (const url of urls) {
  const url_split = url.split('/');
  const path = `./${float.id}/${url_split[url_split.length - 1]}`
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });
  
    await response.data.pipe(fs.createWriteStream(path));
  
    await new Promise((resolve, reject) => {
      response.data.on('end', () => {
        resolve();
      });
  
      response.data.on('error', (err) => {
        reject(err);
      });
    });
  };
}

module.exports = downloadImage;
