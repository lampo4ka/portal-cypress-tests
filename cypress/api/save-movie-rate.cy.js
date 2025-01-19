import 'cypress-ajv-schema-validator';
import { validateSchema } from 'cypress-ajv-schema-validator';

import { schema } from '../schemas/movieSchema.js'
describe('Save movie rate api tests', () => {
    const apiKey = Cypress.env('TMDB_API_KEY');
    const apiToken = Cypress.env('TMDB_API_TOKEN');
    const apiUrl = Cypress.env('apiUrl');
    const INVALID_API_KEY = 'invalid-api-key';

    let movieId;

    before(() => {
        cy.topRatedMovieRequest({apiUrl, apiKey}).then(data => {
            const {
                results
              } = data;
        movieId = results[0].id
        return movieId;
        })
    })

    it.only('should get 200 status code', () => {
        cy.saveMovieRateRequest({apiUrl, apiToken, movieId}).then(data => {
            const {
                status,
                success,
                status_code,
                status_message 
              } = data;
            expect(status).to.equal(201)
            expect(success).to.equal(true)
            expect(status_code).to.equal(12)
            expect(status_message).to.equal("The item/record was updated successfully.")
        })
        
    })

   
})