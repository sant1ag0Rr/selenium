import { By } from 'selenium-webdriver';
import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { waitForUrl, clickByCss, getText, screenshot } from '../helpers/utils.js';

const BASE = 'http://localhost:5173';

describe('E2E: Reservar vehículo', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Navega a vehículos, elige uno y llega a Checkout', async () => {
    await driver.get(`${BASE}/vehicles`);

    // Esperar que aparezca el botón "Reservar Auto" y hacer click
    await clickByCss(driver, 'button'); // primer botón en la tarjeta

    // muchas tarjetas tienen dos botones; asegurarnos de llegar a checkout
    await waitForUrl(driver, '/checkoutPage');

    const title = await getText(driver, 'h1');
    expect(title).to.include('Resumen del Pedido');

    await screenshot(driver, './e2e/.artifacts/checkout.png');
  });
});