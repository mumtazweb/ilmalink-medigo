import { test, devices } from "@playwright/test";

test.use({
  ...devices["Pixel 7"],
});

test("ILMALINK mobile homepage screenshot", async ({ page }) => {
  await page.goto("https://ilmalink.com", {
    waitUntil: "networkidle",
  });

  await page.screenshot({
    path: "ilmalink-mobile-homepage.png",
    fullPage: true,
  });
});
