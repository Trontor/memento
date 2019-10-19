///<reference types="cypress" />

describe("Dashboard", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.signup("test@email.com");
    cy.visit("/dashboard");
    cy.viewport("macbook-15");
  });

  it("Dashboard loads", () => {
    cy.location("pathname").should("equal", "/dashboard");
    cy.get("[data-cy=welcome]").contains("Hello Test");
  });
});
