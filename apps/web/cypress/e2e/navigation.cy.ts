describe("Home page unauthenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should have two mobile and two desktop links", () => {
    cy.get('[data-testid="navbar-link"]').should(
      "have.length",
      4
    );
  });
  it("Should have switch accounts button", () => {
    cy.get('[data-testid="switch-account-button"]').contains("Switch account");
  });
});
