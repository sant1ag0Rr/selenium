export default {
  default: {
    paths: [
      'features/**/*.feature'
    ],
    require: [
      'features/step_definitions/**/*.mjs',
      'support/**/*.mjs'
    ],
    format: ['progress', '@cucumber/html-formatter:reports/cucumber-report.html'],
    publishQuiet: true,
    worldParameters: {
      baseUrl: 'http://127.0.0.1:5173'
    },
    import: true
  }
};
