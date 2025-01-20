Cypress.Commands.add('topRatedMovieRequest', ({ apiUrl, apiKey, page }) => {
    cy.log('Send GET top rated movie request');
    const pageParam = page ? `&page=${page}` : '';

    cy.request({
        method: 'GET',
        url: `${apiUrl}/top_rated?api_key=${apiKey}${pageParam}`,
        failOnStatusCode: false,
    }).then((response) => {
        const { status, body } = response;
        const {
            results,
            page,
            total_pages,
            total_results,
            success,
            status_code,
            status_message,
        } = body;

        return {
            body,
            status,
            results,
            page,
            total_pages,
            total_results,
            success,
            status_code,
            status_message,
        };
    });
});

Cypress.Commands.add(
    'saveMovieRateRequest',
    ({ apiUrl, apiToken, movieId, rate, hasBody = true }) => {
        cy.log('Send POST request to save movie rate');

        cy.request({
            method: 'POST',
            url: `${apiUrl}/${movieId}/rating`,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: apiToken,
            },
            body: hasBody
                ? {
                      value: rate,
                  }
                : {},
        }).then((response) => {
            const { status, body } = response;
            const { success, status_code, status_message } = body;

            return {
                status,
                success,
                status_code,
                status_message,
            };
        });
    },
);
