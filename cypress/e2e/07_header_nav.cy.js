describe('Header navegación desde Home', () => {
  it('Botón "Ver Vehículos Disponibles" navega a /vehicles', () => {
    cy.visit('/');
    cy.contains('button', 'Ver Vehículos Disponibles').click();
    cy.location('pathname').should('eq', '/vehicles');
  });

  it('Botón "Información Empresarial" navega a /enterprise', () => {
    cy.visit('/');
    cy.contains('button', 'Información Empresarial').click();
    cy.location('pathname').should('eq', '/enterprise');
  });
});
