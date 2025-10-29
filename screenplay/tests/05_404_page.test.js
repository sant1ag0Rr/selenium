import { expect } from 'chai';
import { buildDriver } from '../src/driver.js';
import { Actor } from '../src/screenplay/Actor.js';
import { BrowseTheWeb } from '../src/abilities/BrowseTheWeb.js';
import { Open } from '../src/interactions/Open.js';
import { PageText } from '../src/questions/PageText.js';

const BASE = 'http://localhost:5173';

describe('Screenplay: 404 page', function () {
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

  it('ruta inexistente muestra Uh-oh!', async () => {
    await user.attemptsTo(Open.url(`${BASE}/ruta-que-no-existe-123`));
    const text = await user.asks(PageText);
    expect(text.toLowerCase()).to.include('uh-oh');
  });
});
