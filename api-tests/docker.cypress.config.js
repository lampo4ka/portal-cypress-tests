const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        specPattern: [ 'cypress/api/*.cy.js' ],
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'reporter-config.json',
        },
        retries: 2
    },
    env: {
        tmdbApiToken: process.env.TMDB_API_TOKEN
    },
});
