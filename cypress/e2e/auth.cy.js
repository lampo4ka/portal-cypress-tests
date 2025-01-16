describe('User login and logout', () => {
  beforeEach(() => {
    cy.fixture('login-data.json').as('loginData')
  })
  it("should redirect to the home page after login", () => {
   
      cy.get('@loginData').then((data) => {
          const { username, password } = data.validUser
          // cy.session([username, password], () => {
            cy.login({username, password});
            // cy.contains('Acknowledged').click()
            // cy.url().should('contain', '/account/dashboard')
      // })
    })
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

  it("should display capcha", () => {
      cy.get('@loginData').then((data) => {
        const { username, password } = data.invalidUser
        cy.login({username, password, isValidUser: false});
        cy.contains("Security Check").should('be.visible')
        cy.get('[placeholder="Enter above word(s)"]')
          .type("username")
        cy.contains('Login').click()
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