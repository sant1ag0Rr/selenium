describe('SignIn - elementos', () => {
  it('Carga /signin y muestra inputs', () => {
    cy.visit('/signin');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.contains('button', 'Iniciar Sesión').should('be.enabled');
  });
});
