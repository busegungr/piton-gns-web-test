const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class WidgetsPage extends BasePage {
  constructor(page) {
    super(page);
    this.datePickerInput = page.locator('#datePickerMonthYearInput');
    this.dateTimePickerInput = page.locator('#dateAndTimePickerInput');
    this.sliderInput = page.locator('.range-slider');
    this.sliderValue = page.locator('#sliderValue');
    this.progressBar = page.locator('.progress-bar');
    this.progressStartStopBtn = page.locator('#startStopButton');
    this.progressResetBtn = page.locator('#resetButton');
    this.tabWhat = page.locator('#demo-tab-what');
    this.tabOrigin = page.locator('#demo-tab-origin');
    this.tabUse = page.locator('#demo-tab-use');
    this.tabMore = page.locator('#demo-tab-more');
    this.tabPanelWhat = page.locator('#demo-tabpane-what');
    this.tabPanelOrigin = page.locator('#demo-tabpane-origin');
    this.tabPanelUse = page.locator('#demo-tabpane-use');
    this.multiAutoCompleteInput = page.locator('#autoCompleteMultipleInput');
    this.autoCompleteChips = page.locator('.auto-complete__multi-value__label');
    this.toolTipButton = page.locator('#toolTipButton');
    this.toolTipText = page.locator('.tooltip-inner');
    this.menuMainItem2 = page.locator('a', { hasText: 'Main Item 2' });
    this.menuSubSubList = page.locator('a', { hasText: 'SUB SUB LIST' });
    this.oldSelectMenu = page.locator('#oldSelectMenu');
  }

  async openDatePicker() {
    await this.goto('/date-picker');
  }

  async setDate(value) {
    await this.datePickerInput.click();
    await this.datePickerInput.fill(value);
    await this.page.keyboard.press('Enter');
  }

  async setDateTime(value) {
    await this.dateTimePickerInput.click();
    await this.dateTimePickerInput.fill(value);
    await this.page.keyboard.press('Enter');
  }

  async openSlider() {
    await this.goto('/slider');
  }

  async setSlider(value) {
    await this.sliderInput.focus();
    await this.sliderInput.fill(String(value));
  }

  async getSliderDisplayValue() {
    return (await this.sliderValue.inputValue()) ?? '';
  }

  async openProgressBar() {
    await this.goto('/progress-bar');
  }

  async startProgress() {
    await this.progressStartStopBtn.click();
  }

  async stopProgress() {
    await this.progressStartStopBtn.click();
  }

  async waitProgressComplete() {
    await expect(this.progressBar).toHaveAttribute('aria-valuenow', '100', { timeout: 35_000 });
  }

  async getProgressValue() {
    const v = await this.progressBar.getAttribute('aria-valuenow');
    return Number(v ?? 0);
  }

  async resetProgress() {
    await this.progressResetBtn.click();
  }

  async openTabs() {
    await this.goto('/tabs');
  }

  async clickTab(tab) {
    const map = {
      what: this.tabWhat,
      origin: this.tabOrigin,
      use: this.tabUse,
      more: this.tabMore,
    };
    await map[tab].click();
  }

  async openAutoComplete() {
    await this.goto('/auto-complete');
  }

  async addColorMulti(color) {
    await this.multiAutoCompleteInput.fill(color);
    await this.page.locator('.auto-complete__option', { hasText: color }).first().click();
  }

  async removeColorChip(color) {
    await this.page
      .locator('.auto-complete__multi-value', { hasText: color })
      .locator('.auto-complete__multi-value__remove')
      .click();
  }

  async openToolTips() {
    await this.goto('/tool-tips');
  }

  async hoverToolTipButton() {
    await this.toolTipButton.hover();
  }

  async openSelectMenu() {
    await this.goto('/select-menu');
  }

  async selectOldStyle(value) {
    await this.oldSelectMenu.selectOption(value);
  }
}

module.exports = { WidgetsPage };
