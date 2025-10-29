import { buildDriver } from '../helpers/driver.js';
import { waitForUrl, clickByCss, getText, screenshot } from '../helpers/utils.js';
import { expect } from 'chai';

const BASE = 'http://localhost:5173';

describe('E2E: Enterprise -> Vendor Signin link', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Hace click en el enlace de vendor y navega a /vendorSignin', async () => {
    await driver.get(`${BASE}/enterprise`);
    await clickByCss(driver, 'a[href="/vendorSignin"]');
    await waitForUrl(driver, '/vendorSignin');
    const heading = await getText(driver, 'h1');
    expect(heading.toLowerCase()).to.include('iniciar sesión');
    await screenshot(driver, './e2e/.artifacts/vendor_link.png');
  });
});
