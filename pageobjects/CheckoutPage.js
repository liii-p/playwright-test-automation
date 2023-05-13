class CheckoutPage {
  constructor(page, expect) {
    this.expect = expect;
    this.page = page;
    this.countryInput = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.input = page.locator("div[class*='field'] input");
    this.userEmail = page.locator("label[type='text']");
    this.submitBtn = page.locator(".action__submit");
  }

  async enterPersonalInfo(cvv, name) {
    //cvv
    await this.input.nth(1).type(cvv);
    await this.input.nth(2).type(name);
  }

  async selectCountry(country) {
    const countryName = country.substring(0, 3);
    console.log(countryName);
    await this.countryInput.type(countryName, { delay: 100 });

    const dropdown = this.dropdown;
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      let text = await dropdown.locator("button").nth(i).textContent();
      if (text.includes(country)) {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async checkEmailAndSubmit(email) {
    await this.expect(this.userEmail.first()).toHaveText(email);
    await this.submitBtn.click();
  }
}

module.exports = { CheckoutPage };
