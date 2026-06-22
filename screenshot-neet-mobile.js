const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });

  await page.goto("http://localhost:3000/neet/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const width = 390;
  const partHeight = 10000;
  let part = 1;

  for (let y = 0; y < totalHeight; y += partHeight) {
    const height = Math.min(partHeight, totalHeight - y);
    await page.screenshot({
      path: `neet-mobile-part-${String(part).padStart(2, "0")}.png`,
      clip: { x: 0, y, width, height },
    });
    part++;
  }

  await browser.close();
  console.log(`Done. Created ${part - 1} mobile screenshot parts.`);
})();
