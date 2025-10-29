describe('SignUp validaciones', () => {
  it('Errores por contraseñas que no coinciden', () => {
    cy.visit('/signup');
    cy.get('#username').type('nuevo_user');
    cy.get('#email').type('nuevo_user@example.com');
    cy.get('#password').type('P@ssw0rd!');
    cy.get('#confirmPassword').type('OtraClave1!');
    cy.contains('button', 'Registrarse').click();
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });

  it('Errores por contraseña débil', () => {
    cy.visit('/signup');
    cy.get('#username').type('nuevo_user');
    cy.get('#email').type('nuevo_user@example.com');
    cy.get('#password').type('12345678');
    cy.get('#confirmPassword').type('12345678');
    cy.contains('button', 'Registrarse').click();
    cy.contains('Al menos una mayúscula').should('be.visible');
  });
});
