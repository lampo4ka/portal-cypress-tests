const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://wave-trial.getbynder.com/',
    specPattern: [
      // 'cypress/e2e/*.cy.js',
      'cypress/api/*.cy.js'

    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    apiUrl: 'https://api.themoviedb.org/3/movie'
  }
});
