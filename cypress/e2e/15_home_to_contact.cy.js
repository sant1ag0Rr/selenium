describe('Home -> Contact', () => {
  it('Navega a Contact desde Home', () => {
    cy.visit('/');
    cy.contains('button', 'Información Empresarial');
    cy.visit('/contact');
    cy.contains('div', 'Contacto').should('be.visible');
  });
});
