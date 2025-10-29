import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';

export const PageText = {
  value: async (actor) => {
    const { driver } = actor.abilityTo(BrowseTheWeb);
    const body = await driver.findElement({ css: 'body' });
    return body.getText();
  }
};
