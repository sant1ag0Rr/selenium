import { By, Key, until } from 'selenium-webdriver';
import fs from 'fs';
import path from 'path';

export async function waitForVisible(driver, locator, timeout = 10000) {
  const el = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}

export async function typeById(driver, id, value, clear = true) {
  const el = await waitForVisible(driver, By.id(id));
  if (clear) {
    await el.clear();
  }
  await el.sendKeys(value);
  return el;
}

export async function clickByCss(driver, css) {
  const el = await waitForVisible(driver, By.css(css));
  await el.click();
  return el;
}

export async function getText(driver, css) {
  const el = await waitForVisible(driver, By.css(css));
  return await el.getText();
}

export async function submitForm(driver, css = 'form') {
  const form = await waitForVisible(driver, By.css(css));
  await form.sendKeys(Key.ENTER);
}

export async function screenshot(driver, filepath) {
  const image = await driver.takeScreenshot();
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, image, 'base64');
}

export async function waitForUrl(driver, fragment, timeout = 15000) {
  await driver.wait(async () => {
    const url = await driver.getCurrentUrl();
    return url.includes(fragment);
  }, timeout);
}