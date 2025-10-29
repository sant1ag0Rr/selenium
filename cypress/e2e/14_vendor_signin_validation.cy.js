describe('Vendor Signin validaciones', () => {
  it('Muestra errores con campos vacíos', () => {
    cy.visit('/vendorSignin');
    cy.contains('button', 'Iniciar Sesión').click();
    cy.contains('email requerido', { matchCaseSensitive: false }).should('be.visible');
    cy.contains('contraseña requerida', { matchCaseSensitive: false }).should('be.visible');
  });

  it('Muestra error de email inválido', () => {
    cy.visit('/vendorSignin');
    cy.get('#email').type('invalido');
    cy.get('#password').type('secret');
    cy.contains('button', 'Iniciar Sesión').click();
    cy.contains('Dirección de email inválida').should('be.visible');
  });
});
