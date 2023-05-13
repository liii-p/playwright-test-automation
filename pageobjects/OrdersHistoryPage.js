class OrdersHistoryPage {
  constructor(page, expect) {
    this.expect = expect;
    this.ordersTable = page.locator("tbody");
    this.ordersRows = page.locator("tbody tr");
    this.orderSummaryId = page.locator(".col-text");
  }

  async findOrderAndView(orderId) {
    await this.ordersTable.waitFor();
    const rows = await this.ordersRows;
    for (let i = 0; i < (await rows.count()); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async verifyOrderDetails(orderId) {
    const orderIdDetails = await this.orderSummaryId.textContent();
    await this.expect(orderId.includes(orderIdDetails)).toBeTruthy();
  }
}

module.exports = { OrdersHistoryPage };
