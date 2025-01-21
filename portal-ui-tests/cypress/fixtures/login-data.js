
export default {
    validUser: {
        username: Cypress.env('username'),
        password: Cypress.env('password')
    },
    invalidUser: {
        username: "invalidEmail@gmail.com",
        password: "invalidPassword"
    }
}
