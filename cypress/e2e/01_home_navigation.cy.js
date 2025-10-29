describe('Home navegación básica', () => {
  it('Carga Home y navega a /vehicles', () => {
    cy.visit('/');
    cy.contains('button', 'Ver Vehículos Disponibles').click();
    cy.url().should('include', '/vehicles');
  });
});
