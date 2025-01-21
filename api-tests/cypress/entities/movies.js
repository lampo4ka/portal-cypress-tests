export function getTopRatedMovies(
    page,
    options = { validate: true, expectedStatus: 200 },
) {
    const { validate, expectedStatus } = options;

    return cy
        .tmdbApiRequest({
            method: 'GET',
            path: '/3/movie/top_rated',
            searchParams: { page },
        })
        .then((res) => {
            if (!validate) {
                return res;
            }

            return cy.wrap(res).tmdbValidateSchema({
                endpoint: '/3/movie/top_rated',
                method: 'GET',
                status: expectedStatus,
            });
        });
}

export function saveMovieRating(
    movieId,
    body,
    { validate = true, expectedStatus = 200 } = {},
) {
    return cy
        .tmdbApiRequest({
            method: 'POST',
            path: `/3/movie/${movieId}/rating`,
            body,
        })
        .then((res) => {
            if (!validate) {
                return res;
            }

            return cy.wrap(res).tmdbValidateSchema({
                endpoint: '/3/movie/{movie_id}/rating',
                method: 'POST',
                status: expectedStatus,
            });
        });
}
