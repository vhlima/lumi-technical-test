import { mockLocalStorage } from "../../tests/mocks";

describe("Home page authenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    mockLocalStorage();
  });
  it("Should view all invoices", () => {
    cy.contains("View all").click();
    cy.url().should("include", "/invoices");
  });
});
