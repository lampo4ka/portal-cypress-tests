const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://wave-trial.getbynder.com/',
        specPattern: ['cypress/e2e/*.cy.js'],
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'reporter-config.json',
        },
    },
    env: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        name: process.env.NAME,
    },
});
