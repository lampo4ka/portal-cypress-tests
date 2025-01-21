const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        specPattern: [
            'cypress/api/top-rated-movies.cy.js',
            'cypress/api/save-movie-rate.cy.js',
            'cypress/api/auth.cy.js',
        ],
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'reporter-config.json',
        },
    },

    env: {
        apiUrl: 'https://api.themoviedb.org/3/',
        tmdbApiToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODA5Y2RkOTlhYmE1OTMzNWYzOTJjOTI0MmM1MmFiMCIsIm5iZiI6MTczNzEyNTM5OS4yMDUsInN1YiI6IjY3OGE2ZTE3ZGJmZTUwYWEzZDFkMjc4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SfTYxQeRyMJp2if1QKZjGV8hO8EGBjfcQUjYj8fQhWI',
    },
});
