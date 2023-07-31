describe("Home page unauthenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should display the correct header text", () => {
    cy.get('[data-testid="unauth-header"]')
      .should("be.visible")
      .should(
        "contain",
        "Welcome! Begin your journey by uploading your first invoice."
      );
  });
  it("Should show a file upload button", () => {
    cy.get('[data-testid="upload-invoice-button"]').contains("Upload invoice");
  });
  it("Should sign in", () => {
    cy.get('[data-testid="switch-account-button"]')
      .should("be.visible")
      .contains("Switch account")
      .click();

    cy.get("li.MuiListItem-root").should("be.visible").click();
  });
});
