module.exports = {
    baseUrl: "http://localhost:3000",
    
    serenity: {
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            ['@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' }]
        ],
        dialect: 'cucumber',
        outputDirectory: 'target/site/serenity'
    },

    playwright: {
        browser: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 }
    }
};