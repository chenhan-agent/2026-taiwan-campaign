/**
 * 2026 臺灣縣市長選舉 | 社群行程檢查腳本
 * 透過 CDP 連線至 devbot-browser 巡察參選人 Facebook / Instagram 最新行程
 */

const puppeteer = require('puppeteer-core');

const CANDIDATES_TO_CHECK = [
  { name: '蘇巧慧 (新北)', url: 'https://www.facebook.com/chiaohui.su' },
  { name: '蔣萬安 (台北)', url: 'https://www.facebook.com/chiangwanan' },
  { name: '何欣純 (台中)', url: 'https://www.facebook.com/hohsinchun' },
  { name: '柯志恩 (高雄)', url: 'https://www.facebook.com/DrChihEnKo' }
];

async function checkCandidateSocial(endpoint = 'http://127.0.0.1:9222') {
  let browser;
  try {
    console.log(`Connecting to CDP endpoint at ${endpoint}...`);
    browser = await puppeteer.connect({ browserURL: endpoint });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const cand of CANDIDATES_TO_CHECK) {
      console.log(`\n檢查候選人：${cand.name} (${cand.url})`);
      try {
        await page.goto(cand.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await new Promise(r => setTimeout(r, 3000));

        // 嘗試關閉登入彈窗
        const closeBtn = await page.$('div[aria-label="Close"], div[aria-label="關閉"]');
        if (closeBtn) await closeBtn.click();

        const title = await page.title();
        console.log(`頁面標題: ${title}`);
      } catch (e) {
        console.warn(`存取 ${cand.name} 逾時或受限：${e.message}`);
      }
    }

    await page.close();
  } catch (err) {
    console.error('CDP 連線失敗：', err.message);
  } finally {
    if (browser) browser.disconnect();
  }
}

if (require.main === module) {
  checkCandidateSocial();
}

module.exports = { checkCandidateSocial };
