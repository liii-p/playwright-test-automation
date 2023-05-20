const { test, expect } = require("@playwright/test");

//test.describe.configure({ mode: "parallel" });

test(`@Web Popup validations`, async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://google.com");
  //   await page.goBack();
  //   await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const iframe = page.frameLocator("#courses-iframe");
  await iframe.locator("li a[href*='lifetime']:visible").click();
  //   const textCheck = await iframe.locator(".text h2").textContent();
  //   console.log(textCheck.split(" ")[1]);
  await iframe.locator(".text h2").waitFor();
  await expect(iframe.locator("span[style*='color']")).toBeVisible();
});

test("Screenshot", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "focusScreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
