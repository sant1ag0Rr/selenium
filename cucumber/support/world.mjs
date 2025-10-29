import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  constructor(options) {
    this.parameters = options.parameters;
    this.baseUrl = (this.parameters && this.parameters.baseUrl) || 'http://127.0.0.1:5173';
    this.driver = null;
  }
}

setWorldConstructor(CustomWorld);
