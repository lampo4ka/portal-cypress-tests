describe('Auth api tests', () => {
    it('should handle invalid auth header', () => {
        const Authorization = 'invalid auth header';

        cy.tmdbApiRequest({
            method: 'GET',
            path: '/3/movie/top_rated',
            searchParams: { page: 1 },
            headers: { Authorization },
        }).then((response) => {
            expect(response.status).to.equal(401);

            const { status_code, status_message, success } = response.body;

            expect(success).to.equal(false);
            expect(status_code).to.equal(7);
            expect(status_message).to.equal(
                'Invalid API key: You must be granted a valid key.',
            );
        });
    });
});
