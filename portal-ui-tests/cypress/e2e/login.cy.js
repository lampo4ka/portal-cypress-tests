describe('User login and logout', () => {
    beforeEach(() => {
        cy.visit('login/');
        cy.fixture('login-data.json').as('loginData');
    });

    it('should redirect to dashboard page with valid user', () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        cy.login({ username, password });
    });

    it('should remain on login page when only password is entered', () => {
        const password = Cypress.env('password');
        cy.get('[placeholder="Password"]').type(password);
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
    });

    it('should remain on login page when no credentials are entered', () => {
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
    });

    it('should remain on login page when only email is entered', () => {
        const username = Cypress.env('username');
        cy.get('[placeholder="Email/Username"]').type(username);
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
    });

    it('should display logo in login form', () => {
        cy.contains('Wave Trial').should(
            'have.attr',
            'href',
            '/?redirectToken=',
        );
    });

    it('should redirect to the login page after logout', () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');
        const name = Cypress.env('name');
        cy.login({ username, password });
        cy.contains(name).click();
        cy.contains('Logout').click();
        cy.url().should('contain', '/login');
        cy.contains('You have successfully logged out.').should('be.visible');
    });

    it('should show error message', () => {
        cy.closeCookies();
        cy.get('@loginData').then((data) => {
            const { username, password } = data.invalidUser;
            cy.login({ username, password, isValidUser: false });
            cy.get('[placeholder="Enter above word(s)"]').type('username');
            cy.contains('Login').click();
            cy.url().should('contain', '/login');
            cy.contains(
                'h1',
                'You have entered an incorrect username or password.',
            );
            cy.contains(
                'p',
                'You have entered an incorrect username or password.',
            );
        });
    });

    it.skip('should reset password', () => {
        cy.visit('https://wave-trial.getbynder.com/login/');
        cy.get('@loginData').then((data) => {
            const { username } = data.invalidUser;
            cy.contains('Lost password?').click();
            cy.url().should('contain', '/forgotPassword');
            cy.get('[placeholder="Email"]').type(username);
            cy.contains('Send instructions').click();
            cy.url().should('contain', '/login');
        });
    });

    it('should cancel reset password', () => {
        cy.visit('https://wave-trial.getbynder.com/login/');
        cy.closeCookies();
        cy.contains('Lost password?').click();
        cy.url().should('contain', '/forgotPassword');
        cy.contains('Cancel').click();
        cy.url().should('contain', '/login');
    });

    it('should redirect to main page', () => {
        cy.contains('Bynder').should(
            'have.attr',
            'href',
            'https://www.bynder.com/',
        );
    });

    it('language button should display different options', () => {
        cy.fixture('localization-data.json').as('languageNames');
        cy.get('@languageNames').then((data) => {
            const { names } = data;
            cy.contains('Language').click();
            cy.wrap(names).each((name) => {
                cy.contains(name).should('be.visible');
            });
        });
    });

    it('support button should be displayed', () => {
        cy.closeCookies();
        cy.contains('Support').should('be.visible');
    });

    it('cookie button should be displayed', () => {
        cy.closeCookies();
        cy.contains('Cookies').should('be.visible');
    });
});
