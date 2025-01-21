import { validUser, invalidUser, languageNames } from '../data/login-data';

describe('User login', () => {
    beforeEach(() => {
        cy.visit('login/');
    });

    it('User should be redirected to dashboard page with valid credentials', () => {
        cy.login(validUser);
    });

    it('User should be redirected to login page after logout', () => {
        const { name } = validUser;
        cy.login(validUser);
        cy.contains(name).click();
        cy.contains('Logout').click();
        cy.url().should('contain', '/login');
        cy.contains('You have successfully logged out.').should('be.visible');
    });

    it('User sees error message when logging in with invalid credentials', () => {
        cy.closeCookies();
        cy.login({ ...invalidUser, isValidUser: false });
        cy.get('[placeholder="Enter above word(s)"]').type('username');
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
        cy.contains(
            'h1',
            'You have entered an incorrect username or password.',
        );
        cy.contains('p', 'You have entered an incorrect username or password.');
    });

    it('User remains logged out when only email is entered', () => {
        const { username } = validUser;
        cy.get('[placeholder="Email/Username"]').type(username);
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
    });

    it('User remains logged out when only password is entered', () => {
        const { password } = validUser;
        cy.get('[placeholder="Password"]').type(password);
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
    });

    it('User should remain on login page when no credentials are entered', () => {
        cy.contains('Login').click();
        cy.url().should('contain', '/login');
    });

    it('User should be redirected to Bynder main page', () => {
        cy.contains('Bynder').should(
            'have.attr',
            'href',
            'https://www.bynder.com/',
        );
    });

    it('Language button should display different options', () => {
        cy.contains('Language').click();
        cy.wrap(languageNames).each((name) => {
            cy.contains(name).should('be.visible');
        });
    });

    it('Support button should be displayed', () => {
        cy.closeCookies();
        cy.contains('Support').should('be.visible');
    });

    it('Cookie button should be displayed', () => {
        cy.closeCookies();
        cy.contains('Cookies').should('be.visible');
    });

    it('Reset password form should be displayed', () => {
        cy.visit('https://wave-trial.getbynder.com/login/');
        const { username } = invalidUser;

        cy.contains('Lost password?').click();
        cy.url().should('contain', '/forgotPassword');
        cy.closeCookies();

        cy.get('[placeholder="Email"]').should('be.visible');
        cy.contains('Send instructions').should('be.visible');
    });

    it('User cancels reset password process', () => {
        cy.visit('https://wave-trial.getbynder.com/login/');
        cy.closeCookies();
        cy.contains('Lost password?').click();
        cy.url().should('contain', '/forgotPassword');
        cy.contains('Cancel').click();
        cy.url().should('contain', '/login');
    });
});
