const { defineConfig } = require('cypress');

module.exports = defineConfig({
    pageLoadTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 60000,
    e2e: {
        baseUrl: 'https://wave-trial.getbynder.com/',
        specPattern: ['cypress/e2e/*.cy.js'],
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'reporter-config.json',
        },

        retries: 2,
    },
});
