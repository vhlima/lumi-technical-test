describe("Home page authenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    localStorage.setItem("client-id", "7202788969");
  });
  it('Should view all invoices', () => {
    cy.contains('View all').click();
    cy.url().should('include', '/invoices');
  });
});
