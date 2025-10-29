describe('Páginas públicas', () => {
  it('Enterprise muestra título', () => {
    cy.visit('/enterprise');
    cy.contains('h1', 'Lista tu vehículo').should('be.visible');
  });

  it('Contact muestra “Contacto”', () => {
    cy.visit('/contact');
    cy.contains('div', 'Contacto').should('be.visible');
  });
});
