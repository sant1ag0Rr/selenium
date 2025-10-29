import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { path as chromedriverPath } from 'chromedriver';

export async function buildDriver(headless = true) {
  const service = new chrome.ServiceBuilder(chromedriverPath);
  const options = new chrome.Options();
  if (headless) {
    options.addArguments('--headless=new', '--window-size=1366,768');
  }
  return await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .setChromeOptions(options)
    .build();
}
