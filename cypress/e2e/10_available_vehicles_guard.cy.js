describe('Guard - /availableVehicles requiere autenticación', () => {
  it('Redirige a /signin', () => {
    cy.visit('/availableVehicles');
    cy.location('pathname').should('eq', '/signin');
  });
});
