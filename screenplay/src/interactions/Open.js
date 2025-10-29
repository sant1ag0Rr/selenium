import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';

export class Open {
  constructor(url) {
    this.url = url;
  }
  static url(url) {
    return new Open(url);
  }
  async performAs(actor) {
    const { driver } = actor.abilityTo(BrowseTheWeb);
    await driver.get(this.url);
  }
}
