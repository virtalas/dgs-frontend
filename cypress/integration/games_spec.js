describe('Games page', function () {

  beforeEach(() => {
    cy.login()
  })

  it('starts a new game', function () {
    cy.visit('/games')
    cy.get('#newButton').click({ force: true })
    cy.get('#newGameButton').click()
    cy.get('#gameInputPage')
  })

  it('edits a game', () => {
    cy.visit('/games')
    cy.get('[data-cy=editGameButton]:first').click() // Initiate edit
    cy.get('[data-cy=strokeEdit]:first').type(6, { force: true })
    cy.get('#commentEdit').eq(0).type('The weather was not that bad in hindsight.')
    cy.get('[data-cy=weatherConditionChip]:first').click({ force: true })
    
    cy.get('[data-cy=editGameButton]:first').click() // Finish edit

    cy.get('[data-cy=playerStroke]:first').should('contain', '6')
    cy.get('#comment').eq(0).should('contain', 'The weather was not that bad in hindsight.')

    cy.get('[data-cy=editGameButton]:first').click() // Initiate edit
    cy.get('[data-cy=weatherConditionChip]:first').should('not.have.class', 'MuiChip-outlined')
  })

  // TODO: test navigation
})
