const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
  });

  await page.goto("https://www.ilmalink.com/mbbs-abroad/georgia/", {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.screenshot({
    path: "mobile-georgia-page-full.png",
    fullPage: true,
    scale: "css"
  });

  await browser.close();
})();
