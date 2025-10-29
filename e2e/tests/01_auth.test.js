import { By } from 'selenium-webdriver';
import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { typeById, clickByCss, waitForUrl, getText, screenshot } from '../helpers/utils.js';
import fs from 'fs';

const BASE = 'http://localhost:5173';

function readFixture() {
  const raw = fs.readFileSync(new URL('../fixtures/users.json', import.meta.url));
  return JSON.parse(raw.toString());
}

describe('E2E: Autenticación', function () {
  this.timeout(120000);
  let driver;
  const { user } = readFixture();

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('Registra usuario si no existe y luego inicia sesión', async () => {
    // Intentar registro
    await driver.get(`${BASE}/signup`);
    await typeById(driver, 'username', user.username);
    await typeById(driver, 'email', user.email);
    await typeById(driver, 'password', user.password);
    await typeById(driver, 'confirmPassword', user.password);

    // enviar formulario
    await clickByCss(driver, 'form button');

    // navegar a signin directamente (registro puede existir ya)
    await driver.get(`${BASE}/signin`);

    await typeById(driver, 'email', user.email);
    await typeById(driver, 'password', user.password);
    await clickByCss(driver, 'form button');

    // esperar navegación al home
    await waitForUrl(driver, '/');

    // assert: aparece sección de reserva
    const h2Text = await getText(driver, 'section#booking-section h2');
    expect(h2Text.toLowerCase()).to.include('reservar');

    await screenshot(driver, './e2e/.artifacts/auth.png');
  });
});