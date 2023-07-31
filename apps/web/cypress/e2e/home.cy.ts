import { mockLocalStorage } from "../../tests/mocks";

describe("Home page authenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    mockLocalStorage();
  });
  it("Should interact with address section", () => {
    const addressSelector = '[data-testid="address-selector"]';

    cy.get('[data-testid="street-address"]').should("be.visible");
    cy.get(addressSelector).should("not.exist");
    cy.get('[data-testid="address-select-button"]')
      .should("be.visible")
      .click();
    cy.get(addressSelector).should("be.visible");
    cy.get('[data-testid="selector-close-button"]')
      .should("be.visible")
      .click();
    cy.get(addressSelector).should("not.exist");
  });
  it("Should change consumption sort filter", () => {
    const dropdownId = '[data-testid="consumption-filter-dropdown"]';

    cy.get(dropdownId).should('not.exist');
    cy.get('[data-testid="consumption-filter-button"]').should('be.visible').click();
    cy.get(dropdownId).should('be.visible');

    cy.get('[data-testid="consumption-filter-item"]').should('have.length', 2).eq(1).click();
  });
  it("Should view all invoices", () => {
    cy.contains("View all").click();
    cy.url().should("include", "/invoices");
  });
});
