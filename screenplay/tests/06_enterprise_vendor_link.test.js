import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { Target, by } from '../src/targets/Target.js';
import { Click } from '../src/interactions/Click.js';
import { CurrentUrl } from '../src/questions/CurrentUrl.js';

const BASE = 'http://localhost:5173';

const VendorLink = Target.the('Vendor Signin link')
  .located(by.css('a[href="/vendorSignin"]'));

describe('Screenplay: Enterprise vendor link', function () {
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

  it('desde /enterprise hacia /vendorSignin', async () => {
    await user.attemptsTo(
      Open.url(`${BASE}/enterprise`),
      Click.on(VendorLink)
    );
    const url = await user.asks(CurrentUrl);
    expect(url).to.include('/vendorSignin');
  });
});
