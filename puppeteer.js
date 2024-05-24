'use strict';
const puppeteer = require('puppeteer');

async function takingFloatData(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  //open link
  await page.goto(url);

  //close cookies popap
  await page.waitForSelector('.w-full.md\\:w-\\[176px\\]');
  await page.click('.w-full.md\\:w-\\[176px\\]');

  //swap price to usd
  await page.click('.relative.inline-flex.h-5.w-10.cursor-default.items-center.rounded-full.border.border-gray-50.bg-gray-5.lg\\:cursor-pointer');

  //taking every float
  const data = await page.$$eval('a.outline-none.group.relative.flex.h-\\[200px\\].w-full.overflow-hidden.rounded-xl.border.border-gray-20.py-4.pl-4.transition-all.duration-500.lg\\:hover\\:shadow-devCard', elements => {
    return elements.map(element => {
      //taking data

      //id
      const id = element.href.split('/')[5];
      //price in usd
      const spanText = element.querySelector('span.text-base.truncate.text-secondary-100').textContent;
      //floor?, rooms, bedrooms, area
      const divText = element.querySelector('div.flex.h-full.gap-4.text-sm.text-secondary-70.items-center').textContent.split(' ');
      const short_info = {
        id,
        floor: 1,
        rooms: 1,
        bedrooms: 1,
        area: 1
      }
      // check any words in data
      if (!/[a-zA-Zа-яА-Я\u10A0-\u10FF\u2D00-\u2D2F]/.test(divText[3])) {
        short_info.floor = divText[0];
        short_info.rooms = divText[1];
        short_info.bedrooms = divText[2];
        short_info.area = divText[3];
      } else {
        short_info.rooms = divText[0];
        short_info.bedrooms = divText[1];
        short_info.area = divText[2];
      }
      //img link
      const img_link = element.querySelector('img').src;

      return { id, short_info, img_link };
    });
  });
  await browser.close();
  return data;
}

module.exports = takingFloatData;
