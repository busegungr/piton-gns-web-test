const { BasePage } = require('./BasePage');

class ElementsPage extends BasePage {
  constructor(page) {
    super(page);

    // Text Box
    this.textBoxFullName = page.locator('#userName');
    this.textBoxEmail = page.locator('#userEmail');
    this.textBoxCurrentAddress = page.locator('#currentAddress');
    this.textBoxPermanentAddress = page.locator('#permanentAddress');
    this.textBoxSubmit = page.locator('#submit');
    this.textBoxOutputName = page.locator('#output #name');
    this.textBoxOutputEmail = page.locator('#output #email');
    this.textBoxOutputCurrentAddress = page.locator('#output #currentAddress');
    this.textBoxOutputPermanentAddress = page.locator('#output #permanentAddress');

    // Check Box
    this.checkBoxResult = page.locator('#result');

    // Radio Button
    this.radioYesLabel = page.locator('label[for="yesRadio"]');
    this.radioImpressiveLabel = page.locator('label[for="impressiveRadio"]');
    this.radioNoInput = page.locator('#noRadio');
    this.radioResult = page.locator('.mt-3');

    // Web Tables
    this.webTablesAddBtn = page.locator('#addNewRecordButton');
    this.webTablesFirstName = page.locator('#firstName');
    this.webTablesLastName = page.locator('#lastName');
    this.webTablesEmail = page.locator('#userEmail');
    this.webTablesAge = page.locator('#age');
    this.webTablesSalary = page.locator('#salary');
    this.webTablesDepartment = page.locator('#department');
    this.webTablesSubmit = page.locator('#submit');
    this.webTablesSearchBox = page.locator('#searchBox');

    // Buttons
    this.doubleClickBtn = page.locator('#doubleClickBtn');
    this.rightClickBtn = page.locator('#rightClickBtn');
    this.dynamicClickBtn = page.getByRole('button', { name: 'Click Me', exact: true });
    this.doubleClickMsg = page.locator('#doubleClickMessage');
    this.rightClickMsg = page.locator('#rightClickMessage');
    this.dynamicClickMsg = page.locator('#dynamicClickMessage');

    // Links
    this.simpleLink = page.locator('#simpleLink');
    this.dynamicLink = page.locator('#dynamicLink');
    this.badRequestLink = page.locator('#bad-request');
    this.linkResponse = page.locator('#linkResponse');

    // Broken Links
    this.brokenImage = page.locator('img[src*="Toolsqa_1.jpg"]');
    this.validImage = page.locator('img[src*="Toolsqa.jpg"]').first();

    // Upload / Download
    this.uploadInput = page.locator('#uploadFile');
    this.uploadedFilePath = page.locator('#uploadedFilePath');
    this.downloadBtn = page.locator('#downloadButton');

    // Dynamic Properties
    this.enableAfterBtn = page.locator('#enableAfter');
    this.colorChangeBtn = page.locator('#colorChange');
    this.visibleAfterBtn = page.locator('#visibleAfter');
  }

  // ===== Text Box =====
  async openTextBox() {
    await this.goto('/text-box');
  }

  async fillTextBox({ fullName, email, currentAddress, permanentAddress }) {
    await this.textBoxFullName.fill(fullName);
    await this.textBoxEmail.fill(email);
    await this.textBoxCurrentAddress.fill(currentAddress);
    await this.textBoxPermanentAddress.fill(permanentAddress);
  }

  async submitTextBox() {
    await this.safeClick(this.textBoxSubmit);
  }

  // ===== Check Box =====
  async openCheckBox() {
    await this.goto('/checkbox');
  }

  async expandAll() {
    const closedSwitcher = this.page.locator('.rc-tree-switcher_close');
    while ((await closedSwitcher.count()) > 0) {
      await closedSwitcher.first().click();
    }
  }

  async toggleCheckBoxByLabel(label) {
    await this.page
      .locator('span.rc-tree-node-content-wrapper', { hasText: new RegExp(`^${label}$`, 'i') })
      .first()
      .locator('..')
      .locator('.rc-tree-checkbox')
      .first()
      .click();
  }

  // ===== Radio Button =====
  async openRadioButton() {
    await this.goto('/radio-button');
  }

  async selectYes() {
    await this.radioYesLabel.click();
  }

  async selectImpressive() {
    await this.radioImpressiveLabel.click();
  }

  // ===== Web Tables =====
  async openWebTables() {
    await this.goto('/webtables');
  }

  async addRecord({ firstName, lastName, email, age, salary, department }) {
    await this.webTablesAddBtn.click();
    await this.webTablesFirstName.fill(firstName);
    await this.webTablesLastName.fill(lastName);
    await this.webTablesEmail.fill(email);
    await this.webTablesAge.fill(age);
    await this.webTablesSalary.fill(salary);
    await this.webTablesDepartment.fill(department);
    await this.webTablesSubmit.click();
  }

  async searchRecord(term) {
    await this.webTablesSearchBox.fill(term);
  }

  // ===== Buttons =====
  async openButtons() {
    await this.goto('/buttons');
  }

  async doDoubleClick() {
    await this.doubleClickBtn.dblclick();
  }

  async doRightClick() {
    await this.rightClickBtn.click({ button: 'right' });
  }

  async doDynamicClick() {
    await this.dynamicClickBtn.click();
  }

  // ===== Links =====
  async openLinks() {
    await this.goto('/links');
  }

  async clickApiLink(linkId) {
    await this.page.locator(`#${linkId}`).click();
  }

  // ===== Broken Links =====
  async openBrokenLinks() {
    await this.goto('/broken');
  }

  async getImageNaturalWidth(locator) {
    return await locator.evaluate((img) => img.naturalWidth);
  }

  // ===== Upload / Download =====
  async openUploadDownload() {
    await this.goto('/upload-download');
  }

  async uploadFile(file) {
    await this.uploadInput.setInputFiles(file);
  }

  // ===== Dynamic Properties =====
  async openDynamicProperties() {
    await this.goto('/dynamic-properties');
  }
}

module.exports = { ElementsPage };
