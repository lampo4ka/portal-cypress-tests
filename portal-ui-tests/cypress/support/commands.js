Cypress.Commands.add('closeCookies', () => {
    cy.contains('Reject All', { timeout: 10000 }).should('be.visible').click();
});

Cypress.Commands.add('login', ({ username, password, isValidUser = true }) => {
    cy.get('[placeholder="Email/Username"]').type(username);
    cy.get('[placeholder="Password"]').type(password);

    cy.contains('Login').click();

    if (isValidUser) {
        cy.url().should('contain', '/account/dashboard');
    }
});
