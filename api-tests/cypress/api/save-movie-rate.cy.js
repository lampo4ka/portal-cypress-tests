import { getTopRatedMovies, saveMovieRating } from '../entities/movies';

describe('Save movie rate api tests', () => {
    let movieId;

    before(() => {
        cy.log('Send request to get movie id');
        getTopRatedMovies(1).then((response) => {
            movieId = response.body.results[0].id;
            return movieId;
        });
    });

    it('should get 200 status code', () => {
        saveMovieRating(movieId, { value: 10 }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.success).to.equal(true);
            expect(response.body.status_code).to.equal(12);
            expect(response.body.status_message).to.equal(
                'The item/record was updated successfully.',
            );
        });
    });

    it('should get 400 status code - rate is too high', () => {
        cy.log('Send request with rate higher than max(10)');
        saveMovieRating(movieId, { value: 11 }, { validate: false }).then(
            (response) => {
                expect(response.status).to.equal(400);
                expect(response.body.success).to.equal(false);
                expect(response.body.status_code).to.equal(18);
                expect(response.body.status_message).to.equal(
                    'Value too high: Value must be less than, or equal to 10.0.',
                );
            },
        );
    });

    it('should get 400 status code - rate is too low', () => {
        cy.log('Send request with rate higher than min(0)');
        saveMovieRating(movieId, { value: 0 }, { validate: false }).then(
            (response) => {
                expect(response.status).to.equal(400);
                expect(response.body.success).to.equal(false);
                expect(response.body.status_code).to.equal(18);
                expect(response.body.status_message).to.equal(
                    'Value too low: Value must be greater than 0.0.',
                );
            },
        );
    });

    it('should get 400 status code - request parameters are incorrect', () => {
        cy.log('Send request w/o body');
        saveMovieRating(movieId, {}, { validate: false }).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.success).to.equal(false);
            expect(response.body.status_code).to.equal(5);
            expect(response.body.status_message).to.equal(
                'Invalid parameters: Your request parameters are incorrect.',
            );
        });
    });
});
