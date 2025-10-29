describe('Guard - /allVariants requiere autenticación', () => {
  it('Redirige a /signin', () => {
    cy.visit('/allVariants');
    cy.location('pathname').should('eq', '/signin');
  });
});
