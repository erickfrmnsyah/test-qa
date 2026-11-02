const { By, until } = require('selenium-webdriver');

class ProductPage {
  constructor(driver) {
    this.driver = driver;
    // Selector untuk button "+ Keranjang"
    this.addToCartButton = By.xpath("//button[contains(@class, 'bg-primary') and contains(., 'Keranjang')] | //button[contains(., '+ Keranjang') or contains(., 'Keranjang')]");
  }

  // 6. Klik button "+ Keranjang"
  async clickAddToCart() {
    const btn = await this.driver.wait(until.elementLocated(this.addToCartButton), 15000);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", btn);
    await this.driver.sleep(1000);
    await this.driver.executeScript("arguments[0].click();", btn);
    // Beri jeda setelah menambahkan ke keranjang
    await this.driver.sleep(3000);
  }
}

module.exports = ProductPage;
