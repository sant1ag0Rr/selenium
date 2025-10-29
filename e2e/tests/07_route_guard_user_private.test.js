import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { waitForUrl } from '../helpers/utils.js';

const BASE = 'http://localhost:5173';

describe('E2E: Guardas de ruta - usuario', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Redirige a /signin si no autenticado al visitar /checkoutPage', async () => {
    await driver.get(`${BASE}/checkoutPage`);
    await waitForUrl(driver, '/signin');
  });

  it('Redirige a /signin si no autenticado al visitar /profile', async () => {
    await driver.get(`${BASE}/profile`);
    await waitForUrl(driver, '/signin');
  });
});
