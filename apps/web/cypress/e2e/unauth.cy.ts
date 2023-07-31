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
  it("Should have two links in the navigation bar", () => {
    cy.get("a.MuiButton-root.MuiButton-text.MuiButton-textPrimary").should(
      "have.length",
      2
    );
  });
  it("Should show a file upload button", () => {
    cy.get(
      "button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary"
    )
      .should("be.visible")
      .contains("Upload invoice");
  });
  it("Should have switch accounts button", () => {
    cy.get("button.MuiButton-root")
      .should("be.visible")
      .contains("Switch account");
  });
  it("Should sign in", () => {
    cy.get("button.MuiButton-root")
      .should("be.visible")
      .contains("Switch account")
      .click();

    cy.get("li.MuiListItem-root").should("be.visible").click();
  });
});
