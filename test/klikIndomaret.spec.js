const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');

describe('Klik Indomaret - Add to Cart Flow (Without Login)', function () {
  this.timeout(120000);

  let driver;
  let homePage;
  let productPage;

  before(async function () {
    const options = new chrome.Options();
    // Anti-bot detection agar tidak diblokir Cloudflare
    options.addArguments('--disable-blink-features=AutomationControlled');
    options.addArguments(
      'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    options.excludeSwitches(['enable-automation']);

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    homePage = new HomePage(driver);
    productPage = new ProductPage(driver);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('Harus berhasil menambahkan produk Madu ke keranjang', async function () {
    // 1. Akses https://www.klikindomaret.com/
    await homePage.open();

    // 2. Pilih Meta Kategori "Makanan"
    await homePage.selectCategoryMakanan();

    // 3. Pilih kategori "Madu"
    await homePage.selectCategoryMadu();

    // 4 & 5. Pilih salah satu produk Madu & Masuk ke dalam halaman produk detail
    await homePage.clickFirstProduct();

    // 6. Klik button "+ Keranjang"
    await productPage.clickAddToCart();
  });
});
