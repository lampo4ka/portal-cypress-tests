const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://wave-trial.getbynder.com/',
    specPattern: [
      'cypress/e2e/*.cy.js',
      'cypress/api/top-rated-movies.cy.js',
      'cypress/api/save-movie-rate.cy.js',

    ],
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/test-results-[hash].xml',
      outputs: true,
      testCaseSwitchClassnameAndName: true
  },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    apiUrl: 'https://api.themoviedb.org/3/movie'
  }
});
