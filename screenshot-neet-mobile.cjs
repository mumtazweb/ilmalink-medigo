const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const URL = "http://localhost:3000/neet/";
  const OUT = path.join(process.cwd(), "neet-mobile-shots");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });

  console.log("Opening:", URL);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(4000);

  await page.screenshot({ path: "neet-mobile-visible.png", fullPage: false });
  console.log("Created: neet-mobile-visible.png");

  const totalHeight = await page.evaluate(() =>
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    )
  );

  console.log("Full page height:", totalHeight);

  const viewportHeight = 844;
  let part = 1;
  let htmlImages = [];

  for (let y = 0; y < totalHeight; y += viewportHeight) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(700);

    const file = `neet-mobile-${String(part).padStart(3, "0")}.png`;
    const fullPath = path.join(OUT, file);

    await page.screenshot({ path: fullPath, fullPage: false });

    htmlImages.push(`<img src="./${file}" />`);
    console.log("Created:", file);
    part++;
  }

  const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>NEET Mobile Full Screenshot</title>
<style>
  body { margin: 0; background: #111; display: flex; flex-direction: column; align-items: center; }
  img { width: 390px; max-width: 100%; display: block; margin: 0; padding: 0; }
</style>
</head>
<body>
${htmlImages.join("\n")}
</body>
</html>`;

  fs.writeFileSync(path.join(OUT, "view.html"), html);

  await browser.close();
  console.log("Done. Total parts:", part - 1);
})();
