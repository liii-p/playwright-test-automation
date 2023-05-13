class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async getProducts() {
    const titles = await this.productsText.allTextContents();
    console.log(titles);
  }

  async addProductToCart(productName) {
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async goToCart() {
    await this.page.locator("[routerlink*='cart']").click();
  }
}

module.exports = { DashboardPage };
