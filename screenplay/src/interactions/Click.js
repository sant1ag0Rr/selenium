import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';

export class Click {
  constructor(target) {
    this.target = target;
  }
  static on(target) {
    return new Click(target);
  }
  async performAs(actor) {
    const { driver } = actor.abilityTo(BrowseTheWeb);
    const el = await driver.findElement(this.target.locator);
    await el.click();
  }
}
