import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { waitForVisible } from '../helpers/utils.js';
import { By } from 'selenium-webdriver';

const BASE = 'http://localhost:5173';

describe('E2E: Vendor Signin - elementos', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Carga /vendorSignin y muestra inputs email y password', async () => {
    await driver.get(`${BASE}/vendorSignin`);
    const email = await waitForVisible(driver, By.id('email'));
    const password = await waitForVisible(driver, By.id('password'));
    expect(await email.isDisplayed()).to.equal(true);
    expect(await password.isDisplayed()).to.equal(true);
  });
});
