const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CartPage } = require("../pageobjects/CartPage");
const { CheckoutPage } = require("../pageobjects/CheckoutPage");
const { OrdersPage } = require("../pageobjects/OrdersPage");
const { OrdersHistoryPage } = require("../pageobjects/OrdersHistoryPage");
const dataset = JSON.parse(
  JSON.stringify(require("../utils/placeorderTestData.json"))
);

for (const data of dataset) {
  test(`@Web End to End Test for ${data.productName}`, async ({ page }) => {
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
}
