describe('Guard - rutas anidadas de /profile requieren autenticación', () => {
  it('Redirige /profile/orders a /signin sin sesión', () => {
    cy.visit('/profile/orders');
    cy.location('pathname').should('eq', '/signin');
  });
});
