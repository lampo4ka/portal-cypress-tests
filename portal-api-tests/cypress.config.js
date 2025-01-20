const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        specPattern: [
            'cypress/api/top-rated-movies.cy.js',
            'cypress/api/save-movie-rate.cy.js',
        ],
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'reporter-config.json',
        },
    },

    env: {
        apiUrl: 'https://api.themoviedb.org/3/movie',
        tmdbApiKey: process.env.TMDB_API_KEY,
        tmdbApiToken: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
});
