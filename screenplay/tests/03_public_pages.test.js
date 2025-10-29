import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { PageText } from '../src/questions/PageText.js';

const BASE = 'http://localhost:5173';

describe('Screenplay: Páginas públicas', function () {
  this.timeout(90000);
  let driver;
  let user;

  before(async () => {
    driver = await buildDriver(true);
    user = new Actor('Visitor').whoCan(BrowseTheWeb.using(driver));
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('/enterprise muestra título', async () => {
    await user.attemptsTo(Open.url(`${BASE}/enterprise`));
    const text = await user.asks(PageText);
    expect(text.toLowerCase()).to.include('lista tu vehículo');
  });

  it('/contact muestra "Contacto"', async () => {
    await user.attemptsTo(Open.url(`${BASE}/contact`));
    const text = await user.asks(PageText);
    expect(text.toLowerCase()).to.include('contacto');
  });
});
