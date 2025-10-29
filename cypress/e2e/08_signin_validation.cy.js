describe('SignIn validaciones', () => {
  it('Muestra errores con campos vacíos', () => {
    cy.visit('/signin');
    cy.contains('button', 'Iniciar Sesión').click();
    cy.contains('Email requerido').should('be.visible');
    cy.contains('Mínimo 8 caracteres').should('be.visible');
  });

  it('Muestra error de email inválido', () => {
    cy.visit('/signin');
    cy.get('#email').type('invalido');
    cy.get('#password').type('P@ssw0rd!');
    cy.contains('button', 'Iniciar Sesión').click();
    cy.contains('Email inválido').should('be.visible');
  });
});
