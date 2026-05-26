const { test, expect } = require('../../fixtures/test-fixtures');
const { pixelBuffer, uniqueEmail } = require('../../utils/testUtils');
const users = require('../../test-data/users.json');

test.describe('Elements Modülü', () => {
  // TC-ELE-P-01
  test('TC-ELE-P-01: Text Box — geçerli verilerle gönder ve çıktıyı doğrula', async ({
    elementsPage,
  }) => {
    await elementsPage.openTextBox();
    await elementsPage.fillTextBox({
      fullName: users.validUser.firstName + ' ' + users.validUser.lastName,
      email: users.validUser.email,
      currentAddress: users.validUser.currentAddress,
      permanentAddress: users.validUser.permanentAddress,
    });
    await elementsPage.submitTextBox();

    await expect(elementsPage.textBoxOutputName).toContainText(users.validUser.firstName);
    await expect(elementsPage.textBoxOutputEmail).toContainText(users.validUser.email);
    await expect(elementsPage.textBoxOutputCurrentAddress).toContainText(
      users.validUser.currentAddress,
    );
    await expect(elementsPage.textBoxOutputPermanentAddress).toContainText(
      users.validUser.permanentAddress,
    );
  });

  // TC-ELE-N-02
  test('TC-ELE-N-02: Text Box — geçersiz email gönderildiğinde input invalid olmalı, çıktı basılmamalı', async ({
    elementsPage,
  }) => {
    await elementsPage.openTextBox();
    await elementsPage.fillTextBox({
      fullName: 'Test',
      email: users.invalidEmail,
      currentAddress: 'addr',
      permanentAddress: 'addr',
    });
    await elementsPage.submitTextBox();

    await expect(elementsPage.textBoxEmail).toHaveClass(/field-error/);
    await expect(elementsPage.textBoxOutputName).toHaveCount(0);
  });

  // TC-ELE-P-03
  test('TC-ELE-P-03: Check Box — Home expand → Documents → Workspace seçimi sonucu doğrula', async ({
    elementsPage,
  }) => {
    await elementsPage.openCheckBox();
    await elementsPage.expandAll();
    await elementsPage.toggleCheckBoxByLabel('Workspace');

    await expect(elementsPage.checkBoxResult).toContainText('workspace');
  });

  // TC-ELE-P-04
  test('TC-ELE-P-04: Radio Button — Yes ve Impressive seçilebilir, No disabled', async ({
    elementsPage,
  }) => {
    await elementsPage.openRadioButton();

    await elementsPage.selectYes();
    await expect(elementsPage.radioResult).toContainText('Yes');

    await elementsPage.selectImpressive();
    await expect(elementsPage.radioResult).toContainText('Impressive');

    await expect(elementsPage.radioNoInput).toBeDisabled();
  });

  // TC-ELE-P-05
  test('TC-ELE-P-05: Web Tables — yeni kayıt ekle ve tabloda göster', async ({
    elementsPage,
    page,
  }) => {
    await elementsPage.openWebTables();
    const u = users.webTablesUser;
    const email = uniqueEmail('webtable');
    await elementsPage.addRecord({ ...u, email });

    await expect(page.getByRole('cell', { name: u.firstName, exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: email, exact: true })).toBeVisible();
  });

  // TC-ELE-N-06
  test('TC-ELE-N-06: Web Tables — geçersiz email ile form kapanmaz', async ({
    elementsPage,
    page,
  }) => {
    await elementsPage.openWebTables();
    await elementsPage.webTablesAddBtn.click();
    await elementsPage.webTablesFirstName.fill('Ali');
    await elementsPage.webTablesLastName.fill('Veli');
    await elementsPage.webTablesEmail.fill('hatali-email');
    await elementsPage.webTablesAge.fill('30');
    await elementsPage.webTablesSalary.fill('5000');
    await elementsPage.webTablesDepartment.fill('QA');
    await elementsPage.webTablesSubmit.click();

    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(elementsPage.webTablesEmail).toHaveClass(/form-control/);
  });

  // TC-ELE-P-07
  test('TC-ELE-P-07: Buttons — double / right / dynamic click mesajları görünür', async ({
    elementsPage,
  }) => {
    await elementsPage.openButtons();

    await elementsPage.doDoubleClick();
    await expect(elementsPage.doubleClickMsg).toBeVisible();

    await elementsPage.doRightClick();
    await expect(elementsPage.rightClickMsg).toBeVisible();

    await elementsPage.doDynamicClick();
    await expect(elementsPage.dynamicClickMsg).toBeVisible();
  });

  // TC-ELE-P-08
  test('TC-ELE-P-08: Dynamic Properties — enable-after butonu 5sn sonra etkin olur', async ({
    elementsPage,
  }) => {
    await elementsPage.openDynamicProperties();
    await expect(elementsPage.enableAfterBtn).toBeDisabled();
    await expect(elementsPage.enableAfterBtn).toBeEnabled({ timeout: 7_000 });
  });

  // TC-ELE-N-09
  test('TC-ELE-N-09: Broken Images — broken image naturalWidth 0 olmalı', async ({
    elementsPage,
  }) => {
    await elementsPage.openBrokenLinks();
    await expect(elementsPage.brokenImage).toBeVisible();
    const w = await elementsPage.getImageNaturalWidth(elementsPage.brokenImage);
    expect(w).toBe(0);
  });

  // TC-ELE-P-10
  test('TC-ELE-P-10: Upload — dosya seçildikten sonra path görünmeli', async ({
    elementsPage,
  }) => {
    await elementsPage.openUploadDownload();
    await elementsPage.uploadFile({
      name: 'sample.png',
      mimeType: 'image/png',
      buffer: pixelBuffer(),
    });
    await expect(elementsPage.uploadedFilePath).toContainText('sample.png');
  });
});
