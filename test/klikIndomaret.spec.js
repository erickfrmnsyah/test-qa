const { Builder } = require('selenium-webdriver');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');

describe('Klik Indomaret - Add to Cart Flow (Without Login)', function () {
  this.timeout(60000);

  let driver;
  let homePage;
  let productPage;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    homePage = new HomePage(driver);
    productPage = new ProductPage(driver);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('Harus berhasil menambahkan produk Madu ke keranjang', async function () {
    await homePage.open();
    await homePage.selectCategoryMakananAndMadu();
    await homePage.clickFirstProduct();
    await productPage.clickAddToCart();
  });
});