const { By, until } = require('selenium-webdriver');

class ProductPage {
  constructor(driver) {
    this.driver = driver;
    this.addToCartButton = By.xpath("//button[contains(., '+ Keranjang') or contains(., 'Keranjang')]");
  }

  async clickAddToCart() {
    const btnBtn = await this.driver.wait(until.elementLocated(this.addToCartButton), 15000);
    await this.driver.wait(until.elementIsVisible(btnBtn), 15000);
    await btnBtn.click();
  }
}

module.exports = ProductPage;