

Cypress.Commands.add('closeCookies', () => {
  cy.contains('Reject All', {timeout: 10000})
    // .wait(500)
    .should('be.visible')
    .click()
})

Cypress.Commands.add('login', ({username, password, isValidUser = true}) => {
  // cy.closeCookies()
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

Cypress.Commands.add('topRatedMovieRequest', ({apiUrl, apiKey, page}) => {
  cy.log('Send GET top rated movie request');
  const pageParam = page ?`&page=${page}` : ''

  cy.request({
    method: 'GET',
    url: `${apiUrl}/top_rated?api_key=${apiKey}${pageParam}`,
    failOnStatusCode: false
  })
  .then(response => {
    const { status, body } = response;
    const { results, page, total_pages, total_results } = body;
    return {
      body,
      status,
      results,
      page,
      total_pages,
      total_results
    }
  })
})

