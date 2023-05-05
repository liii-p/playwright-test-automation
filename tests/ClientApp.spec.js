const { test } = require("@playwright/test");

test("Get Product Title", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  const user = page.locator("[type='email']");
  const pass = page.locator("[type='password']");
  const signIn = page.locator("input#login");
  await user.type("li@gmail.com");
  await pass.type("Testing123!");
  await signIn.click();
  await page.waitForLoadState("networkidle");
  console.log(await page.locator(".card-body b").first().textContent());
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

//login
//get first product title
