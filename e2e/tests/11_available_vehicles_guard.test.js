import { buildDriver } from '../helpers/driver.js';
import { waitForUrl } from '../helpers/utils.js';

describe('E2E: Guard - /availableVehicles requiere autenticación', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Redirige a /signin al visitar /availableVehicles sin sesión', async () => {
    await driver.get('http://localhost:5173/availableVehicles');
    await waitForUrl(driver, '/signin');
  });
});
