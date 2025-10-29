import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { CurrentUrl } from '../src/questions/CurrentUrl.js';

const BASE = 'http://localhost:5173';

describe('Screenplay: Guards de usuario (sin sesión)', function () {
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

  it('/checkoutPage -> /signin', async () => {
    await user.attemptsTo(
      Open.url(`${BASE}/checkoutPage`)
    );
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/signin');
  });

  it('/profile -> /signin', async () => {
    await user.attemptsTo(
      Open.url(`${BASE}/profile`)
    );
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/signin');
  });
});
