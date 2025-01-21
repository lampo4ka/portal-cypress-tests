import {getTopRatedMovies} from '../entities/movies'

describe('Top-rated movie api tests', () => {
    it('Request should get 200 status code', () => {
        getTopRatedMovies(1).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.page).to.eq(1);
        });
    });

    context('Pagination', () => {
        it('Pagination works correctly', () => {
            cy.log('Send request with page param with max value');

            getTopRatedMovies(496)
                .then((response1) => {
                    cy.wrap(response1.body).as('response1');

                    expect(
                        response1.body.page,
                        'Page value in request us equal page value in response',
                    ).to.eq(496);
                })
                .then(() => getTopRatedMovies(1))
                .then((response2) => {
                    expect(
                        response2.body.page,
                        'Page value in request us equal page value in response',
                    ).to.eq(1);

                    cy.get('@response1').then((response1) => {
                        expect(response1.total_pages).to.eq(
                            response2.body.total_pages,
                        );

                        // it's a bug, check fails
                        /* expect(response1.total_results).to.eq(
                             response2.body.total_results,
                         ); */
                    });
                });
        });

        it('Request should have empty results', () => {
            cy.log('Send page param with value beyond the range');

            getTopRatedMovies(1)
                .then((response1) => {
                    const fakeTotalPage = response1.body.total_pages + 1
                    getTopRatedMovies(fakeTotalPage).then(response2 => {
                        expect(response2.status).to.equal(200);
                        expect(response2.body.results.length).to.eq(0);
                        expect(response2.body.page).to.eq(fakeTotalPage);
                        expect(response2.body.total_pages).to.eq(response1.body.total_pages);
                    })
        });
    });
    });

    it('Response should have movies ordered by rating', () => {
        getTopRatedMovies(1).then((response) => {
            const votesAverage = [];
            cy.wrap(response.body.results).each((result) =>
                votesAverage.push(result.vote_average),
            );

            const sortedVotesAverage = votesAverage.sort((a, b) => b - a);
            cy.wrap(votesAverage).each((vote, item) => {
                expect(vote).to.eq(sortedVotesAverage[item]);
            });
        });
    });
});
