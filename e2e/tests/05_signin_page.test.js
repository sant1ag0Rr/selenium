import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { waitForVisible } from '../helpers/utils.js';
import { By } from 'selenium-webdriver';

const BASE = 'http://localhost:5173';

describe('E2E: SignIn - elementos y navegación', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Carga /signin y muestra inputs email y password', async () => {
    await driver.get(`${BASE}/signin`);
    const email = await waitForVisible(driver, By.id('email'));
    const password = await waitForVisible(driver, By.id('password'));
    expect(await email.isDisplayed()).to.equal(true);
    expect(await password.isDisplayed()).to.equal(true);
  });

  it('Tiene link para ir a /signup', async () => {
    const signupLink = await waitForVisible(driver, By.linkText('Registrarse'));
    expect(await signupLink.isDisplayed()).to.equal(true);
  });
});
