import { By } from 'selenium-webdriver';

export class Target {
  constructor(description, locator) {
    this.description = description;
    this.locator = locator;
  }

  static the(description) {
    return {
      located: (locator) => new Target(description, locator),
    };
  }

  toString() {
    return this.description;
  }
}

export const by = By;
