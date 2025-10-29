import { buildDriver } from '../helpers/driver.js';
import { waitForUrl, clickByCss, getText, screenshot } from '../helpers/utils.js';
import { expect } from 'chai';

const BASE = 'http://localhost:5173';

describe('E2E: Guardas Admin/Vendor y 404', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Redirige a /signin cuando visita /adminDashboard sin autenticación', async () => {
    await driver.get(`${BASE}/adminDashboard`);
    await waitForUrl(driver, '/signin');
  });

  it('Redirige a /vendorSignin cuando visita /vendorDashboard sin autenticación', async () => {
    await driver.get(`${BASE}/vendorDashboard`);
    await waitForUrl(driver, '/vendorSignin');
  });

  it('Desde /enterprise el enlace a vendorSignin está disponible', async () => {
    await driver.get(`${BASE}/enterprise`);
    const text = await getText(driver, 'a[href="/vendorSignin"]');
    expect(text.toLowerCase()).to.include('iniciar sesión como vendedor');
  });

  it('Visitar una ruta inexistente muestra la página 404', async () => {
    await driver.get(`${BASE}/ruta-que-no-existe-123`);
    const heading = await getText(driver, 'h1');
    expect(heading).to.match(/uh-oh!/i);
    await screenshot(driver, './e2e/.artifacts/404.png');
  });
});
