import 'cypress-ajv-schema-validator';
import { validateSchema } from 'cypress-ajv-schema-validator';

import { schema } from '../../cypress/schemas/movieSchema.js'
describe('Top-rated movie api tests', () => {
    const apiKey = Cypress.env('TMDB_API_KEY');
    const apiUrl = Cypress.env('apiUrl');
    const INVALID_API_KEY = 

    it('should get 200 status code', () => {
        cy.topRatedMovieRequest({apiUrl, apiKey}).then(data => {
            const {
                status,
                results,
                page
              } = data;
            expect(status).to.equal(200)
            expect(results).to.be.an('array')
            expect(results.length).to.be.greaterThan(0);
            expect(page).to.eq(1)
        })

        // schema validation
        //     const errors = validateSchema(data, schema);
        //     console.log(errors)
        //     expect(errors).to.equal(null); // Assertion to ensure no validation errors
        //     // expect(response.body.status_message).have.equal('Invalid id: The pre-requisite id is invalid or not found.')
        
    })

    it.only('should make correct pagination', () => {
        cy.topRatedMovieRequest({apiUrl, apiKey, page: 496}).then(data => {
            const {
                page,
                total_pages,
                total_results
              } = data;
            cy.wrap(total_pages).as('total_pages_1')
            cy.wrap(total_results).as('total_results_1')
            expect(page).to.eq(496)

            cy.topRatedMovieRequest({apiUrl, apiKey}).then(data => {
                const {
                    total_pages,
                    total_results
                  } = data;
                cy.wrap(total_pages).as('total_pages_2')
                cy.wrap(total_results).as('total_results_2')
                
                cy.get('@total_pages_1').then(total_pages_1 => {
                    cy.get('@total_pages_2').then(total_pages_2 => {
                        expect(total_pages_1).to.eq(total_pages_2)
                    
                    })
                })
                cy.get('@total_results_1').then(total_results_1 => {
                    cy.get('@total_results_2').then(total_results_2 => {
                        expect(total_results_1).to.eq(total_results_2)
                    })
                })
            })
        })
    })
    
    it('should get 401 status code', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/top_rated?apiKey=${apiKey}`,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.equal(401)
            expect(response.body.success).have.equal(false)
            expect(response.body.status_code).have.equal(7)
            expect(response.body.status_message).have.equal('Invalid API key: You must be granted a valid key.')
        })
    })

    it.skip('should get 404 status code', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/top_rated?api_key=${apiKey}`,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.equal(200)
            // expect(response.body.success).have.equal(false)
            // exp ect(response.body.status_code).have.equal(6)
            // expect(response.body.status_message).have.equal('Invalid id: The pre-requisite id is invalid or not found.')
        })
    })

})