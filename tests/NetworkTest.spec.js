const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");

const loginPayLoad = { userEmail: "li@gmail.com", userPassword: "Testing123!" };

const orderPayLoad = {
  orders: [
    { country: "Australia", productOrderedId: "6262e990e26b7e1a10e89bfa" },
  ],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

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
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6439eaed568c3e9fb1521e98",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = fakePayLoadOrders;
      route.fulfill({
        response,
        body,
      });
    }
  );
  //const email = "";
  await page.locator("button[routerlink*='myorders']").click();
  console.log(await page.locator("[class*='mt-4']").textContent());
});
