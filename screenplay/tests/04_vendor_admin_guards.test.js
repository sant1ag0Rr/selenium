import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { CurrentUrl } from '../src/questions/CurrentUrl.js';

const BASE = 'http://localhost:5173';

describe('Screenplay: Vendor/Admin guards', function () {
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

  it('/vendorDashboard -> /vendorSignin', async () => {
    await user.attemptsTo(Open.url(`${BASE}/vendorDashboard`));
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/vendorSignin');
  });

  it('/adminDashboard -> /signin', async () => {
    await user.attemptsTo(Open.url(`${BASE}/adminDashboard`));
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/signin');
  });
});
