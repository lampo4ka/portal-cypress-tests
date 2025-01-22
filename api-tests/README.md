# Api-tests

## Prerequisites

Node.js and npm
Docker (optional)
TMDB api token

## Local Setup

1. Install dependencies:

```bash
npm i
```

2. Create `./cypress.env.json`:

```json
{
    "tmdbApiToken": "<token value>" // The token was provided in the email
}
```

3. Run tests

- Open Cypress: `npm start`
- Run in headless mode: `npm run headless`

## Docker Setup

1. Create `.env` file:

```env
# The token was provided in the email
TMDB_API_TOKEN=<token value>
```

2. Create `reports` directory

3. Build and run

```bash
docker build -t api-tests .
docker run -it -v ./reports:/app/cypress/results --env-file .env --rm api-tests
```

Response schema copppied from [tmdb oas](https://developer.themoviedb.org/openapi/64542913e1f86100738e227f) and saved to ./cypress/api/fixtures/tmdb-oas.json

## Test cases