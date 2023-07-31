import { mockLocalStorage } from "../../tests/mocks";

describe("Home page unauthenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/invoices");
  });
  it("Should not navigate to invoices", () => {
    cy.url().should("include", "/");
  });
  it("Should show address section", () => {
    mockLocalStorage();
    cy.get('[data-testid="street-address"]').should("be.visible");
    cy.get('[data-testid="address-select-button"]').should("be.visible");
  });
});
