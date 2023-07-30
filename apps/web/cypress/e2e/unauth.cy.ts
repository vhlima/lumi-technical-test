describe('Home page unauthenticated', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should display the correct header text', () => {
    cy.contains('Welcome! Begin your journey by uploading your first invoice.')
      .should('be.visible');
  });
  it('should have two links in the navigation bar', () => {
    cy.get('a.MuiButton-root.MuiButton-text.MuiButton-textPrimary')
      .should('have.length', 2);
  });
  it('should show a file upload button', () => {
    cy.get('button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary')
      .should('be.visible')
      .contains('Upload invoice');
  });
});
