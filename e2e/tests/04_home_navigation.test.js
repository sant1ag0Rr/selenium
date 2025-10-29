import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { getText, waitForUrl, clickByCss, screenshot } from '../helpers/utils.js';

const BASE = 'http://localhost:5173';

describe('E2E: Home navegación básica', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Carga Home y navega a /vehicles', async () => {
    await driver.get(`${BASE}/`);
    // Botón "Ver Vehículos Disponibles" navega a /vehicles
    await clickByCss(driver, 'button');
    await waitForUrl(driver, '/vehicles');
    const anyHeading = await getText(driver, 'h1, h2, h3');
    expect(anyHeading).to.be.a('string');
    await screenshot(driver, './e2e/.artifacts/home_nav.png');
  });
});
