module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/step_definitions/**/*.js'],
        format: ['html:./reports/cucumber-report.html', 'summary'],
        paths: ['features/**/*.feature'],
        publishQuiet: true,
        parallel: 1,
        worldParameters: {
            baseUrl: 'http://localhost:3000'
        }
    }
};