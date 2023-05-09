const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");

const loginPayLoad = { userEmail: "li@gmail.com", userPassword: "Testing123!" };

const orderPayLoad = {
  orders: [
    { country: "Australia", productOrderedId: "6262e990e26b7e1a10e89bfa" },
  ],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  //
});

test("Client App order with API", async ({ page }) => {
  await page.addInitScript((i) => {
    window.localStorage.setItem("token", i);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  //const email = "";
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
