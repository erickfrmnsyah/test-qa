const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.klikindomaret.com/';
    
    // Selector untuk popup close button jika muncul
    this.popupCloseButton = By.css('button[aria-label="Close"], .modal button.close');

    // Selector untuk Meta Kategori "Makanan"
    this.makananCategory = By.xpath("//a[contains(@href, '/xpress/category/makanan')] | //*[contains(text(), 'Makanan')]");
    
    // Selector untuk Kategori "Madu"
    this.maduCategory = By.xpath("//a[contains(@href, 'madu')] | //span[contains(text(), 'Madu')] | //*[contains(text(), 'Madu')]");
    
    // Selector untuk Produk pertama di list
    this.firstProduct = By.xpath("//a[contains(@href, '/xpress/') and not(contains(@href, 'category')) and .//h2] | //div[contains(@class, 'box-item')]//a | .product-collection .item:first-child");
  }

  // 1. Akses website Klik Indomaret
  async open() {
    await this.driver.get(this.url);
    await this.driver.manage().window().maximize();
    // Beri jeda agar halaman selesai loading
    await this.driver.sleep(3000);

    // Tutup popup jika ada
    try {
      const closeBtn = await this.driver.findElement(this.popupCloseButton);
      if (await closeBtn.isDisplayed()) {
        await closeBtn.click();
        await this.driver.sleep(3000);
      }
    } catch (e) {
      // Lewati jika popup tidak muncul
    }
  }

  // 2. Pilih Meta Kategori "Makanan"
  async selectCategoryMakanan() {
    const makananEl = await this.driver.wait(until.elementLocated(this.makananCategory), 15000);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", makananEl);
    await this.driver.sleep(1000);
    await this.driver.executeScript("arguments[0].click();", makananEl);
    // Beri jeda 3 detik untuk memuat halaman kategori
    await this.driver.sleep(3000);
  }

  // 3. Pilih Kategori "Madu"
  async selectCategoryMadu() {
    const maduEl = await this.driver.wait(until.elementLocated(this.maduCategory), 15000);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", maduEl);
    await this.driver.sleep(1000);
    await this.driver.executeScript("arguments[0].click();", maduEl);
    // Beri jeda 3 detik untuk memuat produk Madu
    await this.driver.sleep(3000);
  }

  // Method gabungan untuk kompatibilitas
  async selectCategoryMakananAndMadu() {
    await this.selectCategoryMakanan();
    await this.selectCategoryMadu();
  }

  // 4 & 5. Pilih salah satu produk Madu & Masuk ke detail produk
  async clickFirstProduct() {
    const productEl = await this.driver.wait(until.elementLocated(this.firstProduct), 15000);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", productEl);
    await this.driver.sleep(1000);
    await this.driver.executeScript("arguments[0].click();", productEl);
    // Beri jeda 3 detik untuk memuat halaman detail produk
    await this.driver.sleep(3000);
  }
}

module.exports = HomePage;
