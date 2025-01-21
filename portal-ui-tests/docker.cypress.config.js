const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.config');

module.exports = defineConfig({
    ...baseConfig,
    env: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        name: process.env.NAME,
    },
});
