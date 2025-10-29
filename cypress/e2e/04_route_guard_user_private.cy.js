describe('Guardas de ruta - usuario', () => {
  it('Redirige a /signin si visita /checkoutPage sin sesión', () => {
    cy.visit('/checkoutPage');
    cy.location('pathname').should('eq', '/signin');
  });

  it('Redirige a /signin si visita /profile sin sesión', () => {
    cy.visit('/profile');
    cy.location('pathname').should('eq', '/signin');
  });
});
