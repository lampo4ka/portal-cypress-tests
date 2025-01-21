import 'cypress-ajv-schema-validator';
import tmdbOas from '../fixtures/tmdb-oas';

const API_URL = tmdbOas.servers[0].url

function tmdbApiRequest({method, path, searchParams, body, headers}) {
    const url = new URL(path, API_URL);
    url.search = new URLSearchParams(searchParams).toString();

    return cy.request({
        method,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${Cypress.env('tmdbApiToken')}`,
            ...headers
        },
        url: url.toString(),
        body,
        failOnStatusCode: false,
    })
}

function tmdbValidateSchema(request, schemaPath) {
    cy.wrap(request).validateSchema(tmdbOas, schemaPath);

} 

Cypress.Commands.add('tmdbApiRequest', tmdbApiRequest);
Cypress.Commands.add('tmdbValidateSchema', { prevSubject: true }, tmdbValidateSchema);

