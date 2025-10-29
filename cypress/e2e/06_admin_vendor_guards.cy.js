describe('Guardas Admin/Vendor y 404', () => {
  it('Admin private -> /signin', () => {
    cy.visit('/adminDashboard');
    cy.location('pathname').should('eq', '/signin');
  });

  it('Vendor private -> /vendorSignin', () => {
    cy.visit('/vendorDashboard');
    cy.location('pathname').should('eq', '/vendorSignin');
  });

  it('Enlace a /vendorSignin en /enterprise', () => {
    cy.visit('/enterprise');
    cy.get('a[href="/vendorSignin"]').should('exist');
  });

  it('404 para ruta inexistente', () => {
    cy.visit('/ruta-que-no-existe-123', { failOnStatusCode: false });
    cy.contains('h1', /Uh-oh!/i).should('be.visible');
  });
});
