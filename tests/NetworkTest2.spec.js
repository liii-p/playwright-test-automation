const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");

const loginPayLoad = {
  userEmail: "anotheremail@gmail.com",
  userPassword: "Password123!",
};

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
  //const email = "";
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=645af3a4568c3e9fb1682dc5",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=645a1db9568c3e9fb1679e6a",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
});
