import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { By } from 'selenium-webdriver';
import { buildDriver } from '../../support/driver.mjs';

Before(async function() {
  this.driver = await buildDriver(true);
  if (!this.baseUrl) this.baseUrl = 'http://127.0.0.1:5173';
});

After(async function() {
  if (this.driver) await this.driver.quit();
});

Given('I open the Home page', async function() {
  const url = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;
  await this.driver.get(url);
});

When('I click the {string} button', async function(label) {
  const buttons = await this.driver.findElements(By.css('button'));
  for (const btn of buttons) {
    const text = (await btn.getText()).trim();
    if (text.includes(label)) {
      await btn.click();
      return;
    }
  }
  throw new Error(`Button with label ${label} not found`);
});

When('I open the {string} page', async function(path) {
  const base = this.baseUrl || 'http://127.0.0.1:5173';
  const target = new URL(path, base).href;
  await this.driver.get(target);
});

Then('I should be on the {string} page', async function(path) {
  const url = await this.driver.getCurrentUrl();
  if (!url.includes(path)) {
    throw new Error(`Expected URL to include ${path} but got ${url}`);
  }
});

Then('I should see text {string}', async function(text) {
  const body = await this.driver.findElement(By.css('body')).getText();
  if (!body.toLowerCase().includes(text.toLowerCase())) {
    throw new Error(`Expected to find text ${text} in page`);
  }
});
