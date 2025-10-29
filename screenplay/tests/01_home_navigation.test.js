import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { Click } from '../src/interactions/Click.js';
import { Target, by } from '../src/targets/Target.js';
import { CurrentUrl } from '../src/questions/CurrentUrl.js';

const BASE = 'http://localhost:5173';

const SeeVehiclesButton = Target.the('Ver Vehículos Disponibles button')
  .located(by.xpath("//button[contains(., 'Ver Vehículos Disponibles')]"));
const EnterpriseButton = Target.the('Información Empresarial button')
  .located(by.xpath("//button[contains(., 'Información Empresarial')]"));

describe('Screenplay: Home navegación', function () {
  this.timeout(90000);
  let driver;
  let user;

  before(async () => {
    driver = await buildDriver(true);
    user = new Actor('User').whoCan(BrowseTheWeb.using(driver));
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('Home -> /vehicles', async () => {
    await user.attemptsTo(
      Open.url(`${BASE}/`),
      Click.on(SeeVehiclesButton)
    );
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/vehicles');
  });

  it('Home -> /enterprise', async () => {
    await user.attemptsTo(
      Open.url(`${BASE}/`),
      Click.on(EnterpriseButton)
    );
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/enterprise');
  });
});
