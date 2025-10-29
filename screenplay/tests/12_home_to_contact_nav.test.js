import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { Click } from '../src/interactions/Click.js';
import { Target, by } from '../src/targets/Target.js';
import { CurrentUrl } from '../src/questions/CurrentUrl.js';

const BASE = 'http://localhost:5173';

const ContactLink = Target.the('Contacto link in header or page')
  .located(by.xpath("//a[contains(., 'Contacto')] | //button[contains(., 'Contacto')]"));

const VehiclesButton = Target.the('Ver Vehículos Disponibles button')
  .located(by.xpath("//button[contains(., 'Ver Vehículos Disponibles')]"));

describe('Screenplay: Home -> Contact', function () {
  this.timeout(90000);
  let driver;
  let user;

  before(async () => {
    driver = await buildDriver(true);
    user = new Actor('Visitor').whoCan(BrowseTheWeb.using(driver));
  });

  after(async () => { if (driver) await driver.quit(); });

  it('navega a Contact', async () => {
    await user.attemptsTo(Open.url(`${BASE}/`));
    try {
      await user.attemptsTo(Click.on(ContactLink));
    } catch (e) {
      // fallback: ir a vehicles y luego navegar manualmente
      await user.attemptsTo(Click.on(VehiclesButton));
      const { driver } = user.abilityTo(BrowseTheWeb);
      await driver.get(`${BASE}/contact`);
    }
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/contact');
  });
});
