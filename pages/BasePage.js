const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path) {
    await this.page.goto(path);
    await this.removeAds();
  }

  async removeAds() {
    await this.page.addStyleTag({
      content: `#fixedban, footer, #adplus-anchor { display: none !important; }`,
    });
  }

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async safeClick(locator) {
    await this.scrollIntoView(locator);
    await locator.click();
  }
}

module.exports = { BasePage };
