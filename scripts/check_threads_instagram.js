const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TARGET_ACCOUNTS = [
  { platform: 'Threads', name: '蘇巧慧', url: 'https://www.threads.net/@chiaohui_su' },
  { platform: 'Threads', name: '沈伯洋', url: 'https://www.threads.net/@puma.shen' },
  { platform: 'Instagram', name: '蘇巧慧', url: 'https://www.instagram.com/chiaohui_su/' },
  { platform: 'Instagram', name: '蔣萬安', url: 'https://www.instagram.com/wanan.chiang/' },
  { platform: 'Instagram', name: '柯志恩', url: 'https://www.instagram.com/drchihenko/' }
];

async function inspectSocial() {
  let browser;
  const results = {};

  try {
    console.log('Connecting to remote browser at http://127.0.0.1:9222...');
    browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const acc of TARGET_ACCOUNTS) {
      console.log(`\n========================================`);
      console.log(`Checking [${acc.platform}] ${acc.name}: ${acc.url}`);
      console.log(`========================================`);

      try {
        await page.goto(acc.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await new Promise(r => setTimeout(r, 4000));

        // Take a screenshot
        const safeName = `${acc.platform.toLowerCase()}_${acc.name}`;
        const screenshotPath = path.join(OUTPUT_DIR, `${safeName}.png`);
        await page.screenshot({ path: screenshotPath });
        console.log(`Saved screenshot: ${screenshotPath}`);

        // Extract title, bio, and visible posts
        const data = await page.evaluate((platform) => {
          const title = document.title;
          const bodyText = document.body.innerText;
          const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 5);

          // Filter out typical UI strings
          const filtered = lines.filter(l => 
            !l.includes('Log in') && 
            !l.includes('Sign up') && 
            !l.includes('Cookie') && 
            !l.includes('Meta ©') &&
            !l.includes('Terms') &&
            !l.includes('Privacy Policy')
          );

          return {
            title,
            sampleSnippets: filtered.slice(0, 15)
          };
        }, acc.platform);

        results[`${acc.platform}_${acc.name}`] = data;
        console.log(`Page Title: ${data.title}`);
        console.log(`Found ${data.sampleSnippets.length} snippets.`);
        data.sampleSnippets.slice(0, 5).forEach((s, idx) => console.log(`  [${idx}] ${s}`));

      } catch (err) {
        console.warn(`Could not fetch ${acc.name}:`, err.message);
        results[`${acc.platform}_${acc.name}`] = { error: err.message };
      }
    }

    const reportPath = path.join(OUTPUT_DIR, 'social_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\nResults written to: ${reportPath}`);

    await page.close();
  } catch (err) {
    console.error('Fatal error connecting to browser:', err);
  } finally {
    if (browser) browser.disconnect();
    process.exit(0);
  }
}

inspectSocial();
