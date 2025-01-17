const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://wave-trial.getbynder.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
