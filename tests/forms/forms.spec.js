const { test, expect } = require('../../fixtures/test-fixtures');
const { pixelBuffer } = require('../../utils/testUtils');
const users = require('../../test-data/users.json');

test.describe('Forms Modülü', () => {
  test.beforeEach(async ({ formsPage }) => {
    await formsPage.open();
  });

  // TC-FRM-P-01
  test('TC-FRM-P-01: Sadece zorunlu alanlar dolu — modal açılmalı ve değerler doğru', async ({
    formsPage,
  }) => {
    await formsPage.fillForm({
      firstName: users.validUser.firstName,
      lastName: users.validUser.lastName,
      gender: 'Male',
      mobile: users.validUser.mobile,
    });
    await formsPage.submit();

    await expect(formsPage.modal).toBeVisible();
    await expect(formsPage.modalTitle).toHaveText('Thanks for submitting the form');
    expect(await formsPage.getModalRowValue('Student Name')).toBe(
      `${users.validUser.firstName} ${users.validUser.lastName}`,
    );
    expect(await formsPage.getModalRowValue('Mobile')).toBe(users.validUser.mobile);
  });

  // TC-FRM-P-02
  test('TC-FRM-P-02: Tüm alanlar dolu — modal içinde tüm veriler doğru', async ({ formsPage }) => {
    await formsPage.fillForm({
      firstName: 'Ayşe',
      lastName: 'Demir',
      email: 'ayse@example.com',
      gender: 'Female',
      mobile: '5559876543',
      dob: { day: '15', month: 'June', year: '1995' },
      subjects: ['Maths'],
      hobbies: ['Sports', 'Reading'],
      currentAddress: 'İstanbul',
      state: 'NCR',
      city: 'Delhi',
    });
    await formsPage.submit();

    await expect(formsPage.modal).toBeVisible();
    expect(await formsPage.getModalRowValue('Student Email')).toBe('ayse@example.com');
    expect(await formsPage.getModalRowValue('Gender')).toBe('Female');
    expect(await formsPage.getModalRowValue('Date of Birth')).toBe('15 June,1995');
    expect(await formsPage.getModalRowValue('Subjects')).toContain('Maths');
    expect(await formsPage.getModalRowValue('Hobbies')).toContain('Sports');
    expect(await formsPage.getModalRowValue('State and City')).toBe('NCR Delhi');
  });

  // TC-FRM-N-03
  test('TC-FRM-N-03: Mobile 9 hane — submit edilse de modal açılmamalı', async ({
    formsPage,
  }) => {
    await formsPage.fillForm({
      firstName: 'A',
      lastName: 'B',
      gender: 'Male',
      mobile: '123456789',
    });
    await formsPage.submit();

    await expect(formsPage.modal).toHaveCount(0);
    await expect(formsPage.userNumber).toHaveClass(/form-control/);
  });

  // TC-FRM-N-04
  test('TC-FRM-N-04: Tüm zorunlu alanlar boş — submit modal açmamalı', async ({ formsPage }) => {
    await formsPage.submit();
    await expect(formsPage.modal).toHaveCount(0);
  });

  // TC-FRM-P-05
  test('TC-FRM-P-05: Picture upload — dosya adı input value olarak görünmeli', async ({
    formsPage,
  }) => {
    await formsPage.uploadPictureFile({
      name: 'avatar.png',
      mimeType: 'image/png',
      buffer: pixelBuffer(),
    });
    await expect(formsPage.uploadPicture).toHaveJSProperty('files.length', 1);
  });

  // TC-FRM-N-06
  test('TC-FRM-N-06: Mobile karakter olarak harf — input rakam dışı kabul etmemeli', async ({
    formsPage,
  }) => {
    await formsPage.firstName.fill('A');
    await formsPage.lastName.fill('B');
    await formsPage.selectGender('Male');
    await formsPage.userNumber.fill('abcdefghij');
    await formsPage.submit();
    await expect(formsPage.modal).toHaveCount(0);
  });
});
