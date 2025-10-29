import { By } from 'selenium-webdriver';
import { expect } from 'chai';
import { buildDriver } from '../helpers/driver.js';
import { typeById, clickByCss, waitForUrl, getText, screenshot } from '../helpers/utils.js';

const BASE = 'http://localhost:5173';

describe('E2E: Buscar vehículo', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    driver = await buildDriver(true);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Completa campos y envía búsqueda', async () => {
    await driver.get(`${BASE}/`);

    // Rellenar campos de texto
    await typeById(driver, 'pickup_district', 'Madrid');
    await typeById(driver, 'pickup_location', 'Centro : Puerta del Sol');
    await typeById(driver, 'dropoff_location', 'Retiro : Parque del Retiro');

    // Intentar escribir en los DateTimePickers por placeholder
    const pickupInput = await driver.findElement(By.css('input[placeholder="Hora de recogida"]'));
    await pickupInput.clear();
    await pickupInput.sendKeys('2025-01-01 10:00');

    const dropInput = await driver.findElement(By.css('input[placeholder="Hora de devolución"]'));
    await dropInput.clear();
    await dropInput.sendKeys('2025-01-02 10:00');

    // Enviar búsqueda
    await clickByCss(driver, 'button.book-content__box_button');

    // La app navega a /availableVehicles tras búsqueda válida
    await waitForUrl(driver, '/availableVehicles');

    // Verificar que la página de resultados cargó (encabezado o tarjetas)
    const heading = await getText(driver, 'h1, h2, h3');
    expect(heading).to.be.a('string');

    await screenshot(driver, './e2e/.artifacts/search.png');
  });
});