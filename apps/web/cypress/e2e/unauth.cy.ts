describe('Home page unauthenticated', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should display the correct header text', () => {
    cy.contains('Welcome! Begin your journey by uploading your first invoice.')
      .should('be.visible');
  });
});
