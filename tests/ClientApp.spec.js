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

test.skip("End to End Test", async ({ page }) => {
  const email = "li@gmail.com";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type("Testing123!");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  //await page.pause();

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();

  await page.locator("[placeholder*='Country']").type("aus");

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  let optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    let text = await dropdown.locator("button").nth(i).textContent();
    if (text === " Australia") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator("label[type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
