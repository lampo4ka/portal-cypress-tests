import 'cypress-ajv-schema-validator';
import { validateSchema } from 'cypress-ajv-schema-validator';

import { schema } from '../schemas/movieSchema.js'
describe('Save movie rate api tests', () => {
    const apiKey = Cypress.env('TMDB_API_KEY');
    const apiToken = Cypress.env('TMDB_API_TOKEN');
    const apiUrl = Cypress.env('apiUrl');
    const INVALID_API_TOKEN = 'invalid-api-token';

    let movieId;

    before(() => {
        cy.log('Send request to get movie id')
        cy.topRatedMovieRequest({apiUrl, apiKey}).then(data => {
            const {
                results
              } = data;
        movieId = results[0].id
        return movieId;
        })
    })

    it('should get 200 status code', () => {
        cy.saveMovieRateRequest({apiUrl, apiToken, movieId, rate : 10}).then(data => {
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

    it('should get 401 status code', () => {
        cy.log('Send request with invalid api token')
        cy.saveMovieRateRequest({apiUrl, INVALID_API_TOKEN, movieId, rate : 10}).then(data => {
            const {
                status,
                success,
                status_code,
                status_message 
              } = data;
            expect(status).to.equal(401)
            expect(success).to.equal(false)
            expect(status_code).to.equal(7)
            expect(status_message).to.equal("Invalid API key: You must be granted a valid key.")
        })
        
    })

    it('should get 400 status code - rate is too high', () => {
        cy.log('Send request with rate higher than max(10)')
        cy.saveMovieRateRequest({apiUrl, apiToken, movieId, rate : 11 }).then(data => {
            const {
                status,
                success,
                status_code,
                status_message 
              } = data;
            expect(status).to.equal(400)
            expect(success).to.equal(false)
            expect(status_code).to.equal(18)
            expect(status_message).to.equal("Value too high: Value must be less than, or equal to 10.0.")
        })
        
    })

    it('should get 400 status code - rate is too low', () => {
        cy.log('Send request with rate higher than min(0)')
        cy.saveMovieRateRequest({apiUrl, apiToken, movieId, rate : 0 }).then(data => {
            const {
                status,
                success,
                status_code,
                status_message 
              } = data;
            expect(status).to.equal(400)
            expect(success).to.equal(false)
            expect(status_code).to.equal(18)
            expect(status_message).to.equal("Value too low: Value must be greater than 0.0.")
        })
        
    })

   
})