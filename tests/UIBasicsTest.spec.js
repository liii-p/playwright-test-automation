const { test, expect } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("#username").type("rahulshetty");
  await page.locator("[type='password']").type("learning");
  await page.locator("#signInBtn").click();
  const warningMsg = await page.locator("[style*='block']").textContent();
  console.log(warningMsg);
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
