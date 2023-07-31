import { mockLocalStorage } from "../../tests/mocks";

describe("Home page unauthenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/invoices");
    mockLocalStorage();
  });
  it("Should show address section", () => {
    cy.get('[data-testid="street-address"]').should("be.visible");
    cy.get('[data-testid="address-select-button"]').should("be.visible");
  });
});
