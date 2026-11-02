const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.klikindomaret.com/';
    
    this.makananCategory = By.xpath("//a[contains(@class, 'nav-link') and contains(text(), 'Makanan')] | //div[contains(text(), 'Makanan')]");
    this.maduCategory = By.xpath("//a[contains(text(), 'Madu')] | //span[contains(text(), 'Madu')]");
    this.firstProduct = By.css('.product-collection .item:first-child, .box-item:first-child, .product-tile:first-child');
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.manage().window().maximize();
  }

  async selectCategoryMakananAndMadu() {
    const makananEl = await this.driver.wait(until.elementLocated(this.makananCategory), 15000);
    await this.driver.wait(until.elementIsVisible(makananEl), 15000);
    await makananEl.click();

    const maduEl = await this.driver.wait(until.elementLocated(this.maduCategory), 15000);
    await this.driver.wait(until.elementIsVisible(maduEl), 15000);
    await maduEl.click();
  }

  async clickFirstProduct() {
    const productEl = await this.driver.wait(until.elementLocated(this.firstProduct), 15000);
    await this.driver.wait(until.elementIsVisible(productEl), 15000);
    await productEl.click();
  }
}

module.exports = HomePage;