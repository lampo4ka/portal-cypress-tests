describe('User login and logout', () => {

  beforeEach(() => {
    cy.visit('https://wave-trial.getbynder.com/login/')
    cy.fixture('login-data.json').as('loginData')
  })

  it("should redirect to dashboard page with valid user", () => {
      cy.get('@loginData').then((data) => {
          const { username, password } = data.validUser
          // cy.session([username, password], () => {
            cy.login({username, password});
            // cy.contains('Acknowledged').click()
            // cy.url().should('contain', '/account/dashboard')
      // })
    })
  });

  it("should remain on login page when only password is entered", () => {
    cy.closeCookies();
    cy.get('@loginData').then((data) => {
      const { password } = data.validUser
      cy.get('[placeholder="Password"]').type(password)
      cy.contains('Login').click()
      cy.url().should("contain", "/login");
    })
  });

  it("should remain on login page when no credentials are entered", () => {
    cy.closeCookies();
    cy.contains('Login').click()
    cy.url().should("contain", "/login");
  });

  it("should remain on login page when only email is entered", () => {
    cy.closeCookies();
    cy.get('@loginData').then((data) => {
      const { username } = data.validUser
      cy.get('[placeholder="Email/Username"]').type(username)
      cy.contains('Login').click()
      cy.url().should("contain", "/login");
    })
  });

  it("should display logo", () => {
    cy.closeCookies();
    cy.contains('Wave Trial').should('have.attr', 'href', '/?redirectToken=')
  });

  it("should redirect to the login page after logout", () => {
    cy.get('@loginData').then((data) => {
      const { username, password, name } = data.validUser
      cy.login({username, password});
      cy.contains(name).click();
      cy.contains("Logout").click()
      cy.url().should("contain", "/login");
    })
  });

  it("should show error message", () => {
      cy.get('@loginData').then((data) => {
        const { username, password } = data.invalidUser
        cy.login({username, password, isValidUser: false});
        cy.get('[placeholder="Enter above word(s)"]')
          .type("username")
        cy.contains('Login').click()
        cy.url().should('contain', '/login')
        cy.contains('h1', 'You have entered an incorrect username or password.')
        cy.contains('p', 'You have entered an incorrect username or password.')


    })
  });

  it.skip("should reset password", () => {
    cy.visit('https://wave-trial.getbynder.com/login/')
    cy.get('@loginData').then((data) => {
      const { username } = data.invalidUser
      cy.closeCookies();
      cy.contains('Lost password?').click()
      cy.url().should('contain', '/forgotPassword')
      cy.get('[placeholder="Email"]').type(username)
      cy.contains('Send instructions').click()
      cy.url().should('contain', '/login')
    })
  });

  it("should cancel reset password", () => {
    cy.visit('https://wave-trial.getbynder.com/login/')
      cy.closeCookies();
      cy.contains('Lost password?').click()
      cy.url().should('contain', '/forgotPassword')
      cy.contains('Cancel').click()
      cy.url().should('contain', '/login')

  });
})