/// <reference types="Cypress" />

describe("Family", () => {
  beforeEach(() => {
    cy.exec("");
  });
  it("Loads Dashboard on Login", () => {
    cy.visit("/dashboard");
    cy.location("pathname").should("equal", "/dashboard");
  });
});
