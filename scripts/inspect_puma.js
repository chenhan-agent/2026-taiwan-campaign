const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');

async function inspectPuma() {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to Puma Shen IG: https://www.instagram.com/pumashen/');
  await page.goto('https://www.instagram.com/pumashen/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'instagram_沈伯洋.png') });
  console.log('Saved instagram_沈伯洋.png');

  const igText = await page.evaluate(() => document.body.innerText.substring(0, 800));
  console.log('IG text preview:\n', igText);

  console.log('\nNavigating to Puma Shen Threads: https://www.threads.net/@pumashen');
  await page.goto('https://www.threads.net/@pumashen', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'threads_沈伯洋.png') });
  console.log('Saved threads_沈伯洋.png');

  const threadsText = await page.evaluate(() => document.body.innerText.substring(0, 800));
  console.log('Threads text preview:\n', threadsText);

  await page.close();
  browser.disconnect();
}

inspectPuma().catch(console.error);
