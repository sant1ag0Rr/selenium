export class BrowseTheWeb {
  constructor(driver) {
    this.driver = driver;
  }
  static using(driver) {
    return new BrowseTheWeb(driver);
  }
}
