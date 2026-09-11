const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  const targets = [
    {
      name: '沈伯洋 (Threads)',
      platform: 'threads',
      candidate: '沈伯洋',
      url: 'https://www.threads.net/@pumashen',
      screenshot: 'threads_沈伯洋_detail.png'
    },
    {
      name: '沈伯洋 (Instagram)',
      platform: 'instagram',
      candidate: '沈伯洋',
      url: 'https://www.instagram.com/pumashen/',
      screenshot: 'instagram_沈伯洋_detail.png'
    },
    {
      name: '蔣萬安 (Instagram)',
      platform: 'instagram',
      candidate: '蔣萬安',
      url: 'https://www.instagram.com/wanan.chiang/',
      screenshot: 'instagram_蔣萬安_detail.png'
    },
    {
      name: '蘇巧慧 (Instagram)',
      platform: 'instagram',
      candidate: '蘇巧慧',
      url: 'https://www.instagram.com/suchiaohui/',
      screenshot: 'instagram_蘇巧慧_detail.png'
    },
    {
      name: '蘇巧慧 (Threads)',
      platform: 'threads',
      candidate: '蘇巧慧',
      url: 'https://www.threads.net/@suchiaohui',
      screenshot: 'threads_蘇巧慧_detail.png'
    }
  ];

  const results = [];

  for (const t of targets) {
    console.log(`\n========================================`);
    console.log(`Checking ${t.name}: ${t.url}`);
    try {
      await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 4500));

      const screenshotPath = path.join(OUTPUT_DIR, t.screenshot);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Saved screenshot to ${screenshotPath}`);

      const pageData = await page.evaluate(() => {
        const title = document.title;
        const bodySnippet = document.body.innerText.split('\n').map(s => s.trim()).filter(s => s.length > 10);
        return {
          title,
          bodySnippet: Array.from(new Set(bodySnippet)).slice(0, 30)
        };
      });

      results.push({
        name: t.name,
        candidate: t.candidate,
        url: t.url,
        status: 'success',
        data: pageData
      });
      console.log(`Success! Title: ${pageData.title}`);
      console.log(`Snippets preview:`, pageData.bodySnippet.slice(0, 6));

    } catch (err) {
      console.error(`Error loading ${t.url}:`, err.message);
      results.push({
        name: t.name,
        candidate: t.candidate,
        url: t.url,
        status: 'error',
        error: err.message
      });
    }
  }

  const outJson = path.join(OUTPUT_DIR, 'threads_ig_summary.json');
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  console.log(`\nWrote complete summary to ${outJson}`);

  await page.close();
  browser.disconnect();
}

run().catch(console.error);
