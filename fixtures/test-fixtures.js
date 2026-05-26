const base = require('@playwright/test');
const { ElementsPage } = require('../pages/ElementsPage');
const { FormsPage } = require('../pages/FormsPage');
const { WidgetsPage } = require('../pages/WidgetsPage');

const test = base.test.extend({
  elementsPage: async ({ page }, use) => {
    await use(new ElementsPage(page));
  },
  formsPage: async ({ page }, use) => {
    await use(new FormsPage(page));
  },
  widgetsPage: async ({ page }, use) => {
    await use(new WidgetsPage(page));
  },
});

module.exports = { test, expect: base.expect };
