import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { Target, by } from '../src/targets/Target.js';

const BASE = 'http://localhost:5173';

const VendorLink = Target.the('Vendor Signin link')
  .located(by.css('a[href="/vendorSignin"]'));

describe('Screenplay: Enterprise link text', function () {
  this.timeout(90000);
  let driver;
  let user;

  before(async () => {
    driver = await buildDriver(true);
    user = new Actor('Visitor').whoCan(BrowseTheWeb.using(driver));
  });

  after(async () => { if (driver) await driver.quit(); });

  it('link a vendorSignin visible en /enterprise', async () => {
    await user.attemptsTo(Open.url(`${BASE}/enterprise`));
    const { driver } = user.abilityTo(BrowseTheWeb);
    const el = await driver.findElement(VendorLink.locator);
    const text = await el.getText();
    expect(text.toLowerCase()).to.contain('iniciar sesión como vendedor');
  });
});
