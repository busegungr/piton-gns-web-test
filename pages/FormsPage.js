const { BasePage } = require('./BasePage');

class FormsPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.userEmail = page.locator('#userEmail');
    this.userNumber = page.locator('#userNumber');
    this.dobInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.currentAddress = page.locator('#currentAddress');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.uploadPicture = page.locator('#uploadPicture');
    this.submitBtn = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.modalClose = page.locator('#closeLargeModal');
  }

  async open() {
    await this.goto('/automation-practice-form');
  }

  async selectGender(gender) {
    await this.page.locator('label', { hasText: new RegExp(`^${gender}$`) }).first().click();
  }

  async checkHobby(hobby) {
    await this.page.locator('label', { hasText: new RegExp(`^${hobby}$`) }).first().click();
  }

  async setDateOfBirth(day, month, year) {
    await this.dobInput.click();
    await this.page.locator('.react-datepicker__month-select').selectOption({ label: month });
    await this.page.locator('.react-datepicker__year-select').selectOption(year);
    await this.page
      .locator(`.react-datepicker__day--0${day.padStart(2, '0')}:not(.react-datepicker__day--outside-month)`)
      .first()
      .click();
  }

  async addSubject(subject) {
    await this.subjectsInput.fill(subject);
    await this.page.locator('.subjects-auto-complete__option', { hasText: subject }).first().click();
  }

  async selectState(state) {
    await this.scrollIntoView(this.state);
    await this.state.click();
    await this.page.locator('div', { hasText: new RegExp(`^${state}$`) }).last().click();
  }

  async selectCity(city) {
    await this.city.click();
    await this.page.locator('div', { hasText: new RegExp(`^${city}$`) }).last().click();
  }

  async uploadPictureFile(file) {
    await this.uploadPicture.setInputFiles(file);
  }

  async fillForm(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    if (data.email) await this.userEmail.fill(data.email);
    await this.selectGender(data.gender);
    await this.userNumber.fill(data.mobile);

    if (data.dob) await this.setDateOfBirth(data.dob.day, data.dob.month, data.dob.year);
    if (data.subjects) for (const s of data.subjects) await this.addSubject(s);
    if (data.hobbies) for (const h of data.hobbies) await this.checkHobby(h);
    if (data.picturePath) await this.uploadPicture.setInputFiles(data.picturePath);
    if (data.currentAddress) await this.currentAddress.fill(data.currentAddress);
    if (data.state) await this.selectState(data.state);
    if (data.city) await this.selectCity(data.city);
  }

  async submit() {
    await this.safeClick(this.submitBtn);
  }

  async getModalRowValue(label) {
    return await this.page.locator('tr', { hasText: label }).locator('td').nth(1).textContent();
  }

  async isModalVisible() {
    return await this.modal.isVisible();
  }
}

module.exports = { FormsPage };
