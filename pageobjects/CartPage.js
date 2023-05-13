class CartPage {
  constructor(page, expect, productName) {
    this.expect = expect;
    this.page = page;
    this.items = page.locator("div li[class*='items']");
    this.itemTitle = page.locator("h3:has-text('" + productName + "')");
    this.checkoutBtn = page.locator("li[class='totalRow'] button");
  }

  async checkItems() {
    await this.items.waitFor();
    const bool = await this.itemTitle.isVisible();
    await this.expect(bool).toBeTruthy();
  }

  async goToCheckout() {
    await this.checkoutBtn.click();
  }
}

module.exports = { CartPage };
