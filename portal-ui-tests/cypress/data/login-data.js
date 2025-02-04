export const validUser = {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
    name: Cypress.env('name'),
};

export const invalidUser = {
    username: 'invalidEmail@gmail.com',
    password: 'invalidPassword',
};

export const languageNames = [
    'Nederlands (Nederland)',
    'English (United States)',
    'Français (France)',
    'Deutsch (Deutschland)',
    'Italiano (Italia)',
    'Español (España)',
];
