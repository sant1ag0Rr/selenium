import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { getText, waitForUrl, screenshot } from '../helpers/utils.js';

const BASE = 'http://localhost:5173';

describe('E2E: Páginas públicas (Enterprise/Contact)', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Abre /enterprise y muestra el título', async () => {
    await driver.get(`${BASE}/enterprise`);
    const title = await getText(driver, 'h1');
    expect(title).to.include('Lista tu vehículo');
    await screenshot(driver, './e2e/.artifacts/enterprise.png');
  });

  it('Abre /contact y muestra contenido', async () => {
    await driver.get(`${BASE}/contact`);
    const text = await getText(driver, 'div');
    expect(text.toLowerCase()).to.include('contacto');
    await screenshot(driver, './e2e/.artifacts/contact.png');
  });
});
