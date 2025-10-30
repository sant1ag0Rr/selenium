const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { By, until, Key } = require('selenium-webdriver');
const { getDriver, quitDriver } = require('../support/driver');
const assert = require('assert');

// Aumentar el timeout por defecto a 120 segundos
setDefaultTimeout(120 * 1000);

// Variables para controlar intentos fallidos
let failedAttempts = 0;
const MAX_ATTEMPTS = 3;

// Hooks para configuración y limpieza
Before(async function() {
    console.log('Starting test scenario...');
    try {
        console.log('Initializing WebDriver...');
        this.driver = await getDriver();
        console.log('WebDriver initialized successfully');
    } catch (error) {
        console.error('Error in Before hook:', error);
        throw error;
    }
});

After(async function() {
    console.log('Cleaning up after test...');
    try {
        await quitDriver();
        console.log('Driver quit successfully');
    } catch (error) {
        console.error('Error in After hook:', error);
    }
});

Given('I am on the login page', async function() {
    console.log('Navigating to login page...');
    try {
        await this.driver.get('http://localhost:3000/signin');
        console.log('Navigation successful');
        
        // Esperar a que el formulario de login esté visible
        console.log('Waiting for login form...');
        await this.driver.wait(until.elementLocated(By.css('form')), 30000);
        console.log('Login form found');
    } catch (error) {
        console.error('Error in login page navigation:', error);
        throw error;
    }
});

When('I enter valid credentials', async function(dataTable) {
    const credentials = dataTable.rowsHash();
    await this.driver.findElement(By.css('#email')).sendKeys(credentials.username);
    await this.driver.findElement(By.css('#password')).sendKeys(credentials.password);
});

When('I enter invalid credentials', async function(dataTable) {
    const credentials = dataTable.rowsHash();
    await this.driver.findElement(By.css('#email')).sendKeys(credentials.username);
    await this.driver.findElement(By.css('#password')).sendKeys(credentials.password);
});

When('I click the login button', async function() {
    await this.driver.findElement(By.css('button[type="submit"]')).click();
});

Then('I should be logged in successfully', async function() {
    // Esperar y verificar el mensaje de bienvenida
    const welcomeMessage = await this.driver.wait(
        until.elementLocated(By.css('.welcome-message')),
        5000
    );
    const text = await welcomeMessage.getText();
    assert.strictEqual(text, 'Welcome back!');
});

Then('I should see an error message', async function() {
    // Esperar y verificar el mensaje de error
    const errorMessage = await this.driver.wait(
        until.elementLocated(By.css('.error-message')),
        5000
    );
    const text = await errorMessage.getText();
    assert.strictEqual(text, 'Invalid credentials');
});

Then('I should see successful login message', async function() {
    // Esperar y verificar el mensaje de bienvenida o el redirect al dashboard
    try {
        // Primero intentamos encontrar un mensaje de bienvenida
        const welcomeMessage = await this.driver.wait(
            until.elementLocated(By.css('.welcome-message, .success-message, .dashboard-welcome')),
            10000
        );
        const text = await welcomeMessage.getText();
        assert(text.includes('Welcome') || text.includes('success'), `Expected welcome message but got: ${text}`);
    } catch (error) {
        // Si no hay mensaje, verificamos que estamos en el dashboard
        const currentUrl = await this.driver.getCurrentUrl();
        assert(currentUrl.includes('/dashboard') || currentUrl.includes('/home'),
            `Expected to be redirected to dashboard but current URL is: ${currentUrl}`);
    }
});

Then('I should see login error message', async function() {
    // Esperar y verificar el mensaje de error
    const errorMessage = await this.driver.wait(
        until.elementLocated(By.css('.error-message, .alert-error, .error-feedback')),
        10000
    );
    const text = await errorMessage.getText();
    assert(text.includes('Invalid') || text.includes('failed') || text.includes('error'),
        `Expected error message but got: ${text}`);
});

// --- Implementación de los primeros 4 escenarios adicionales ---
Then('I should see required field errors', async function() {
    // Comprobamos mensajes cerca de los campos o estados de validación HTML5
    const email = await this.driver.findElement(By.css('#email'));
    const password = await this.driver.findElement(By.css('#password'));

    // Intentamos usar propiedades de validación si existen
    const emailValidity = await email.getAttribute('validationMessage');
    const passwordValidity = await password.getAttribute('validationMessage');

    if ((emailValidity && emailValidity.length) || (passwordValidity && passwordValidity.length)) {
        // Si hay mensajes nativos
        assert.ok(emailValidity.length || passwordValidity.length, 'Expected required field validation messages');
        return;
    }

    // Fallback: buscar mensajes en DOM
    const emailError = await this.driver.findElements(By.css('#email + .error, .email-error, .error-email'));
    const passwordError = await this.driver.findElements(By.css('#password + .error, .password-error, .error-password'));
    assert.ok(emailError.length || passwordError.length, 'Expected error nodes for required fields');
});

Then('I should see invalid email format error', async function() {
    // Esperar y verificar mensaje de formato inválido
    const errorMessage = await this.driver.wait(
        until.elementLocated(By.css('.error-message, .validation-error, .email-error')),
        5000
    );
    const text = await errorMessage.getText();
    assert.ok(/email|correo/i.test(text) && /invalid|form/i.test(text) || /formato/i.test(text), `Expected invalid email format message but got: ${text}`);
});

Then('I should see password length error', async function() {
    const errorMessage = await this.driver.wait(
        until.elementLocated(By.css('.error-message, .validation-error, .password-error')),
        5000
    );
    const text = await errorMessage.getText();
    assert.ok(/password/i.test(text) && (/least|min|minimo|mínimo|characters|caracteres/i.test(text)), `Expected password length error but got: ${text}`);
});

When('I enter incorrect password multiple times', async function(dataTable) {
    const credentials = dataTable.rowsHash();
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        // Limpiar y rellenar
        const emailEl = await this.driver.findElement(By.css('#email'));
        const passEl = await this.driver.findElement(By.css('#password'));
        await emailEl.clear();
        await passEl.clear();
        await emailEl.sendKeys(credentials.username);
        // usamos la misma contraseña incorrecta cada vez o variación para evitar cache
        await passEl.sendKeys(credentials.password + i);
        await this.driver.findElement(By.css('button[type="submit"]')).click();
        // pequeña espera entre intentos
        await this.driver.sleep(1000);
    }
});

Then('I should see account lockout message', async function() {
    const errorMessage = await this.driver.wait(
        until.elementLocated(By.css('.error-message, .alert-error, .account-locked, .lockout-message')),
        10000
    );
    const text = await errorMessage.getText();
    assert.ok(/locked|blocked|too many attempts|bloquead|bloqueo|intentos/i.test(text), `Expected account lockout message but got: ${text}`);
});