import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { path as chromedriverPath } from 'chromedriver';

/**
 * Build a Chrome driver instance.
 * Headless by default; pass false to run headed for debugging.
 */
export async function buildDriver(headless = true) {
  const options = new chrome.Options();
  if (headless) {
    options.addArguments('--headless=new');
  }
  options.addArguments(
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1280,800'
  );

  const service = new chrome.ServiceBuilder(chromedriverPath);

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .withCapabilities(Capabilities.chrome())
    .build();

  return driver;
}

export default buildDriver;