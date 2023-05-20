const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pageobjects/LoginPage");
const { DashboardPage } = require("../../pageobjects/DashboardPage");
const { CartPage } = require("../../pageobjects/CartPage");
const { CheckoutPage } = require("../../pageobjects/CheckoutPage");
const { OrdersPage } = require("../../pageobjects/OrdersPage");
const { OrdersHistoryPage } = require("../../pageobjects/OrdersHistoryPage");

Given(
  "I login to the Ecommerce application with {string} and {string}",
  { timeout: 500 * 1000 },
  async function (email, password) {
    const products = this.page.locator(".card-body");
    const loginPage = new LoginPage(this.page);
    await loginPage.goToPage();
    await loginPage.validLogin(email, password);
  }
);

When(
  "{string} is added to cart",
  { timeout: 500 * 1000 },
  async function (productName) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.getProducts();
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.goToCart();
  }
);

Then(
  "verify {string} is displayed in the cart",
  { timeout: 100 * 1000 },
  async function (productName) {
    const cartPage = new CartPage(this.page, expect, productName);
    await cartPage.checkItems();
    await cartPage.goToCheckout();
  }
);

When(
  "valid details are entered with {string} and order is placed",
  async function (email) {
    const checkoutPage = new CheckoutPage(this.page, expect);
    await checkoutPage.enterPersonalInfo("123", "James Bond");
    await checkoutPage.selectCountry("Australia");
    await checkoutPage.checkEmailAndSubmit(email);
  }
);

Then(
  "verify order is correct and present in the order history page",
  async function () {
    const ordersPage = new OrdersPage(this.page, expect);
    await ordersPage.confirmOrder();
    const orderId = await ordersPage.getOrderId();
    await ordersPage.goToOrdersHistory();
    const ordersHistoryPage = new OrdersHistoryPage(this.page, expect);
    await ordersHistoryPage.findOrderAndView(orderId);
    await ordersHistoryPage.verifyOrderDetails(orderId);
  }
);

Given(
  "I login to the Ecommerce2 application with {string} and {string}",
  async function (user, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = this.page.locator("#username");
    const pass = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");
    console.log(await this.page.title());
    await userName.type(user);
    await pass.type(password);
    await signIn.click();
  }
);

Then("verify error message is displayed", async function () {
  const warningMsg = await this.page.locator("[style*='block']").textContent();
  console.log(warningMsg);
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});
