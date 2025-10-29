import { BrowseTheWeb } from '../abilities/BrowseTheWeb.js';

export const CurrentUrl = {
  value: async (actor) => {
    const { driver } = actor.abilityTo(BrowseTheWeb);
    return driver.getCurrentUrl();
  }
};
