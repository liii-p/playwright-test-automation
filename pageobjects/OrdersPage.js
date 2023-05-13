class OrdersPage {
  constructor(page, expect) {
    this.expect = expect;
    this.confirmOrderTitle = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    this.ordersPage = page.locator("button[routerlink*='myorders']");
  }

  async confirmOrder() {
    await this.expect(this.confirmOrderTitle).toHaveText(
      " Thankyou for the order. "
    );
  }

  async getOrderId() {
    return await this.orderId.textContent();
  }

  async goToOrdersHistory() {
    await this.ordersPage.click();
  }
}

module.exports = { OrdersPage };
