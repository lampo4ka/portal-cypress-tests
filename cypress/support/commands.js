Cypress.Commands.add('closeCookies', () => {
  cy.contains('Reject All')
    .should('be.visible')
    .wait(500)
    .click()
})

Cypress.Commands.add('login', ({username, password, isValidUser = true}) => {
  cy.closeCookies()
      // cy.contains('Close this dialog')
      //   .should('be.visible')
      //   .wait(300)
      //   .click()
      cy.get('[placeholder="Email/Username"]').type(username)
      cy.get('[placeholder="Password"]').type(password)
      cy.contains('Login').click()
      if(isValidUser) {
        cy.url().should('contain', '/account/dashboard')
      }
      
})

