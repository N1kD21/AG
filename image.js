'use strict';
const axios = require('axios');
const fs = require('fs');

const downloadImage = async (float) => {
  const url = float.img_link;
  const url_split = float.img_link.split('/');
  const path = `./${float.id}/${url_split[url_split.length - 1]}`
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });

  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });

    response.data.on('error', (err) => {
      reject(err);
    });
  });
};

// downloadImage('https://api-statements.tnet.ge/uploads/statements/lHwsJfy664fab8eb2332.webp', './18418933/18418933.jpeg')
//   .then(() => {
//     console.log('Изображение успешно скачано');
//   })
//   .catch((err) => {
//     console.error('Произошла ошибка при скачивании изображения:', err);
//   });

module.exports = downloadImage;
