const { expect } = require("@playwright/test");
const { customtest } = require("../utils/test-base");
const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CartPage } = require("../pageobjects/CartPage");

customtest(`Custom Test`, async ({ page, testDataForOrder }) => {
  const products = page.locator(".card-body");
  const loginPage = new LoginPage(page);
  await loginPage.goToPage();
  await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.getProducts();
  await dashboardPage.addProductToCart(testDataForOrder.productName);
  await dashboardPage.goToCart();

  const cartPage = new CartPage(page, expect, testDataForOrder.productName);
  await cartPage.checkItems();
  await cartPage.goToCheckout();
});
