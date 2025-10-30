const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

let driver = null;

async function getDriver() {
    if (!driver) {
        console.log('Creating new WebDriver instance...');
        
        const options = new chrome.Options();
        options.addArguments(
            '--headless=new',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1920,1080',
            '--remote-debugging-port=9222'
        );

        try {
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();

            console.log('Driver built successfully');

            await driver.manage().setTimeouts({
                implicit: 30000,
                pageLoad: 60000,
                script: 30000
            });

            console.log('Timeouts set successfully');
        } catch (error) {
            console.error('Error creating WebDriver:', error);
            throw error;
        }

        await driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 30000,
            script: 30000
        });

        console.log('WebDriver instance created successfully');
    }
    return driver;
}

async function quitDriver() {
    if (driver) {
        await driver.quit();
        driver = null;
    }
}

module.exports = {
    getDriver,
    quitDriver
};