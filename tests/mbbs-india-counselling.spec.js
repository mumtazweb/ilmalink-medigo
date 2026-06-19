import { expect, test } from "@playwright/test";

const baseUrl = "http://127.0.0.1:3012";

test("renders crawlable West Bengal counselling data", async ({ page }) => {
  await page.goto(`${baseUrl}/mbbs-india/west-bengal/`, {
    waitUntil: "networkidle",
  });

  await expect(page).toHaveTitle(/MBBS Colleges in West Bengal/);
  await expect(
    page.getByRole("heading", {
      name: "MBBS Colleges in West Bengal",
      exact: true,
    })
  ).toBeVisible();
  await expect(page.getByText("85%")).toBeVisible();
  await expect(page.getByText("33%")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "College and quota-wise MBBS seats",
    })
  ).toBeVisible();
  await expect(
    page.locator(
      'a[href="/mbbs-india/west-bengal/kpc-medical-college-jadavpur-kolkata/"]'
    )
  ).toHaveCount(2);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    3
  );

  await page.screenshot({
    path: "artifacts/mbbs-counselling-state.png",
    fullPage: true,
  });
});

test("renders college seat matrix and cutoff values", async ({ page }) => {
  await page.goto(
    `${baseUrl}/mbbs-india/west-bengal/kpc-medical-college-jadavpur-kolkata/`,
    { waitUntil: "networkidle" }
  );

  await expect(
    page.getByRole("heading", {
      name: "KPC Medical College, Jadavpur, Kolkata",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Quota and category-wise MBBS seats",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Round-wise closing score and rank",
    })
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "25,770" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "2,11,553" })).toBeVisible();

  await page.screenshot({
    path: "artifacts/mbbs-counselling-college.png",
    fullPage: true,
  });
});

test("global search finds counselling data and opens the college route", async ({
  page,
}) => {
  await page.goto(`${baseUrl}/mbbs-india/`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "Search", exact: true }).click();

  const searchInput = page.getByPlaceholder(
    "Search keywords or ask questions..."
  );
  await expect(searchInput).toBeVisible();
  await searchInput.fill("KPC OBC-B 2025 cutoff");

  const result = page.getByRole("button", {
    name: /KPC Medical College, Jadavpur, Kolkata/,
  });
  await expect(result).toBeVisible();

  await page.screenshot({
    path: "artifacts/mbbs-counselling-search.png",
    fullPage: false,
  });
});

test("keeps the counselling pages usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    `${baseUrl}/mbbs-india/west-bengal/kpc-medical-college-jadavpur-kolkata/`,
    { waitUntil: "networkidle" }
  );

  await expect(
    page.getByRole("heading", {
      name: "KPC Medical College, Jadavpur, Kolkata",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Round-wise closing score and rank",
    })
  ).toBeVisible();

  const hasBodyOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(hasBodyOverflow).toBe(false);

  await page.screenshot({
    path: "artifacts/mbbs-counselling-mobile.png",
    fullPage: false,
  });
});
