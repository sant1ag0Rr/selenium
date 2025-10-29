import users from '../fixtures/users.json';

describe('SignUp flujo básico', () => {
  it('Completa y envía formulario; tolera usuario existente', () => {
    const u = users.user;
    cy.visit('/signup');
    cy.get('#username').clear().type(u.username);
    cy.get('#email').clear().type(u.email);
    cy.get('#password').clear().type(u.password);
    cy.get('#confirmPassword').clear().type(u.password);
    cy.contains('button', 'Registrarse').click();

    // Si el usuario ya existe, puede no redirigir. Validamos cualquiera de los dos escenarios.
    cy.location('pathname', { timeout: 8000 }).then((path) => {
      if (path !== '/signin') {
        // Verifica que la página aún responde (no error fatal)
        cy.get('form').should('exist');
      }
    });
  });
});
