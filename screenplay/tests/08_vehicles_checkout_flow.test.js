import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { Click } from '../src/interactions/Click.js';
import { Target, by } from '../src/targets/Target.js';
import { CurrentUrl } from '../src/questions/CurrentUrl.js';

const BASE = 'http://localhost:5173';

const ReserveButton = Target.the('Reservar Auto button')
  .located(by.xpath("//button[contains(., 'Reservar Auto')]"));

const VehiclesNav = Target.the('Ver Vehículos Disponibles button')
  .located(by.xpath("//button[contains(., 'Ver Vehículos Disponibles')]"));

describe('Screenplay: Vehicles -> Checkout flow (sin sesión)', function () {
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

  it('desde Home ir a Vehicles y al intentar reservar, cae en /signin', async () => {
    await user.attemptsTo(
      Open.url(`${BASE}/`),
      Click.on(VehiclesNav)
    );
    // Intentar click en un botón "Reservar Auto" si existe; si no, navegar directo a checkout
    try {
      await user.attemptsTo(Click.on(ReserveButton));
    } catch (e) {
      await user.attemptsTo(Open.url(`${BASE}/checkoutPage`));
    }
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/signin');
  });
});
