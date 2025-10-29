describe('Guard - /vehicleDetails requiere autenticación', () => {
  it('Redirige a /signin', () => {
    cy.visit('/vehicleDetails');
    cy.location('pathname').should('eq', '/signin');
  });
});
