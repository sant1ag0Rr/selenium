import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';

export const Text = {
  of: async (actor, target) => {
    const { driver } = actor.abilityTo(BrowseTheWeb);
    const el = await driver.findElement(target.locator);
    return el.getText();
  }
};
