const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CartPage } = require("../pageobjects/CartPage");
const { CheckoutPage } = require("../pageobjects/CheckoutPage");
const { OrdersPage } = require("../pageobjects/OrdersPage");
const { OrdersHistoryPage } = require("../pageobjects/OrdersHistoryPage");
const data = JSON.parse(
  JSON.stringify(require("../utils/placeorderTestData.json"))
);

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

test.only("End to End Test", async ({ page }) => {
  const products = page.locator(".card-body");
  const loginPage = new LoginPage(page);
  await loginPage.goToPage();
  await loginPage.validLogin(data.email, data.password);

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.getProducts();
  await dashboardPage.addProductToCart(data.productName);
  await dashboardPage.goToCart();

  const cartPage = new CartPage(page, expect, data.productName);
  await cartPage.checkItems();
  await cartPage.goToCheckout();

  const checkoutPage = new CheckoutPage(page, expect);
  await checkoutPage.enterPersonalInfo("123", "James Bond");
  await checkoutPage.selectCountry("Australia");
  await checkoutPage.checkEmailAndSubmit(data.email);

  const ordersPage = new OrdersPage(page, expect);
  await ordersPage.confirmOrder();
  const orderId = await ordersPage.getOrderId();
  await ordersPage.goToOrdersHistory();
  const ordersHistoryPage = new OrdersHistoryPage(page, expect);
  await ordersHistoryPage.findOrderAndView(orderId);
  await ordersHistoryPage.verifyOrderDetails(orderId);
});
