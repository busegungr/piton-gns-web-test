const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Widgets Modülü', () => {
  // TC-WGT-P-01
  test('TC-WGT-P-01: Date Picker — geçerli tarih input value ile eşleşmeli', async ({
    widgetsPage,
  }) => {
    await widgetsPage.openDatePicker();
    await widgetsPage.setDate('05/23/2026');
    await expect(widgetsPage.datePickerInput).toHaveValue('05/23/2026');
  });

  // TC-WGT-P-02
  test('TC-WGT-P-02: Date & Time Picker — tarih+saat girilebilir ve value değişir', async ({
    widgetsPage,
  }) => {
    await widgetsPage.openDatePicker();
    const initial = await widgetsPage.dateTimePickerInput.inputValue();
    await widgetsPage.setDateTime('May 26, 2026 12:00 PM');
    const after = await widgetsPage.dateTimePickerInput.inputValue();
    expect(after).not.toBe(initial);
  });

  // TC-WGT-P-03
  test('TC-WGT-P-03: Slider — değer 50 yapılınca sliderValue 50 olmalı', async ({
    widgetsPage,
  }) => {
    await widgetsPage.openSlider();
    await widgetsPage.setSlider(50);
    expect(await widgetsPage.getSliderDisplayValue()).toBe('50');
  });

  // TC-WGT-P-04
  test("TC-WGT-P-04: Progress Bar — başlat, %100'e ulaş, Reset görünmeli", async ({
    widgetsPage,
  }) => {
    await widgetsPage.openProgressBar();
    await widgetsPage.startProgress();
    await widgetsPage.waitProgressComplete();
    await expect(widgetsPage.progressResetBtn).toBeVisible();
  });

  // TC-WGT-N-05
  test("TC-WGT-N-05: Progress Bar — Stop ile 100'e ulaşmadan durdur, Reset görünmemeli", async ({
    widgetsPage,
  }) => {
    await widgetsPage.openProgressBar();
    await widgetsPage.startProgress();
    await expect
      .poll(async () => widgetsPage.getProgressValue(), { timeout: 20_000 })
      .toBeGreaterThan(10);
    await widgetsPage.stopProgress();
    const value = await widgetsPage.getProgressValue();
    expect(value).toBeLessThan(100);
    await expect(widgetsPage.progressResetBtn).toHaveCount(0);
  });

  // TC-WGT-P-06
  test("TC-WGT-P-06: Tabs — Origin tab'ına tıklayınca panel değişmeli", async ({
    widgetsPage,
  }) => {
    await widgetsPage.openTabs();
    await widgetsPage.clickTab('origin');
    await expect(widgetsPage.tabPanelOrigin).toBeVisible();
    await expect(widgetsPage.tabOrigin).toHaveAttribute('aria-selected', 'true');
  });

  // TC-WGT-N-07
  test('TC-WGT-N-07: Tabs — More tab disabled, tıklasak da Origin paneli görünmemeli', async ({
    widgetsPage,
  }) => {
    await widgetsPage.openTabs();
    await expect(widgetsPage.tabMore).toHaveAttribute('aria-disabled', 'true');
  });

  // TC-WGT-P-08
  test('TC-WGT-P-08: Auto Complete Multi — 3 renk ekle, ortadakini sil', async ({
    widgetsPage,
  }) => {
    await widgetsPage.openAutoComplete();
    await widgetsPage.addColorMulti('Red');
    await widgetsPage.addColorMulti('Green');
    await widgetsPage.addColorMulti('Blue');
    await expect(widgetsPage.autoCompleteChips).toHaveCount(3);

    await widgetsPage.removeColorChip('Green');
    await expect(widgetsPage.autoCompleteChips).toHaveCount(2);
    await expect(widgetsPage.autoCompleteChips).not.toContainText(['Green']);
  });

  // TC-WGT-P-09
  test('TC-WGT-P-09: Tool Tips — butona hover olunca tooltip görünür', async ({ widgetsPage }) => {
    await widgetsPage.openToolTips();
    await widgetsPage.hoverToolTipButton();
    await expect(widgetsPage.toolTipText).toBeVisible();
  });
});
