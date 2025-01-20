import 'cypress-ajv-schema-validator';
import { validateSchema } from 'cypress-ajv-schema-validator';

import { schema } from '../../cypress/schemas/movieSchema.js';
describe('Top-rated movie api tests', () => {
    const apiKey = Cypress.env('tmdbApiKey');
    const apiUrl = Cypress.env('apiUrl');
    const INVALID_API_KEY = 'invalid-api-key';

    it('should get 200 status code', () => {
        cy.topRatedMovieRequest({ apiUrl, apiKey }).then((data) => {
            const { status, results, page } = data;
            expect(status).to.equal(200);
            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
            expect(page).to.eq(1);
        });

        // schema validation
        //     const errors = validateSchema(data, schema);
        //     console.log(errors)
        //     expect(errors).to.equal(null); // Assertion to ensure no validation errors
        //     // expect(response.body.status_message).have.equal('Invalid id: The pre-requisite id is invalid or not found.')
    });

    context('Pagination', () => {
        it('should make correct pagination', () => {
            cy.log('Send request with page param with max value');
            cy.topRatedMovieRequest({ apiUrl, apiKey, page: 496 }).then(
                (data) => {
                    const { page, total_pages, total_results } = data;
                    cy.wrap(total_pages).as('total_pages_1');
                    cy.wrap(total_results).as('total_results_1');
                    cy.log(
                        'Page value in request us equal page value in response',
                    );
                    expect(page).to.eq(496);

                    cy.log(
                        'Send request with page param with default(1) value',
                    );
                    cy.topRatedMovieRequest({ apiUrl, apiKey }).then((data) => {
                        const { total_pages, total_results } = data;
                        cy.wrap(total_pages).as('total_pages_2');
                        cy.wrap(total_results).as('total_results_2');

                        cy.log(
                            'Total page value in different response is consistent',
                        );
                        cy.get('@total_pages_1').then((total_pages_1) => {
                            cy.get('@total_pages_2').then((total_pages_2) => {
                                expect(total_pages_1).to.eq(total_pages_2);
                            });
                        });

                        cy.log(
                            'Total results value in different response is consistent',
                        );
                        cy.get('@total_results_1').then((total_results_1) => {
                            cy.get('@total_results_2').then(
                                (total_results_2) => {
                                    expect(total_results_1).to.eq(
                                        total_results_2,
                                    );
                                },
                            );
                        });
                    });
                },
            );
        });

        it('should have empty results', () => {
            cy.log('Send page param with value beyond the range');
            cy.topRatedMovieRequest({ apiUrl, apiKey, page: 500 }).then(
                (data) => {
                    const {
                        status,
                        results,
                        page,
                        total_pages,
                        total_results,
                    } = data;
                    expect(status).to.equal(200);
                    expect(results).to.be.an('array');
                    expect(results.length).to.eq(0);
                    expect(page).to.eq(500);
                    expect(total_pages).to.eq(496);
                },
            );
        });
    });

    it('response should have movies ordered by rating', () => {
        cy.topRatedMovieRequest({ apiUrl, apiKey }).then((data) => {
            const { results } = data;
            const votesAverage = [];
            cy.wrap(results).each((item) =>
                votesAverage.push(item.vote_average),
            );

            const sortedVotesAverage = votesAverage.sort((a, b) => b - a);
            cy.wrap(votesAverage).each((vote, item) => {
                expect(vote).to.eq(sortedVotesAverage[item]);
            });
        });
    });

    it('should get 401 status code', () => {
        cy.topRatedMovieRequest({ apiUrl, INVALID_API_KEY }).then((data) => {
            const { status, success, status_code, status_message } = data;
            expect(status).to.equal(401);
            expect(success).have.equal(false);
            expect(status_code).have.equal(7);
            expect(status_message).have.equal(
                'Invalid API key: You must be granted a valid key.',
            );
        });
    });
});
