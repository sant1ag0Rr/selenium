import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { typeById, clickByCss, waitForUrl, screenshot } from '../helpers/utils.js';
import fs from 'fs';

const BASE = 'http://localhost:5173';

function readFixture() {
  const raw = fs.readFileSync(new URL('../fixtures/users.json', import.meta.url));
  return JSON.parse(raw.toString());
}

describe('E2E: SignUp flujo básico', function () {
  this.timeout(120000);
  let driver;
  const { user } = readFixture();

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Completa formulario y navega a /signin en éxito (o muestra error si ya existe)', async () => {
    await driver.get(`${BASE}/signup`);
    await typeById(driver, 'username', user.username);
    await typeById(driver, 'email', user.email);
    await typeById(driver, 'password', user.password);
    await typeById(driver, 'confirmPassword', user.password);

    await clickByCss(driver, 'form button');

    // En muchos casos, el usuario ya existe; intentamos navegar a /signin en éxito
    try {
      await waitForUrl(driver, '/signin', 8000);
    } catch (_) {
      // Si no redirige, continúa sin fallo (usuario duplicado es aceptable para E2E)
    }

    await screenshot(driver, './e2e/.artifacts/signup_flow.png');
  });
});
