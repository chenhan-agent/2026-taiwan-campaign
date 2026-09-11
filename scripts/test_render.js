const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');

// Simple static server
const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png'
  };
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3333, async () => {
  console.log('Static test server listening on http://127.0.0.1:3333');

  try {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1 });

    // 1. Capture Schedule view
    console.log('Loading page at http://127.0.0.1:3333 ...');
    await page.goto('http://127.0.0.1:3333', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({ path: path.join(OUTPUT_DIR, 'new_design_schedule.png'), fullPage: false });
    console.log('Captured new_design_schedule.png');

    // 2. Click Candidate Wall
    await page.click('.nav-tab[data-target="tab-candidates"]');
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'new_design_candidates.png'), fullPage: false });
    console.log('Captured new_design_candidates.png');

    // 3. Click Map tab
    await page.click('.nav-tab[data-target="tab-map"]');
    await new Promise(r => setTimeout(r, 2500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'new_design_map.png'), fullPage: false });
    console.log('Captured new_design_map.png');

    await page.close();
    browser.disconnect();
  } catch (err) {
    console.error('Error during test render:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
