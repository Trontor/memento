///<reference types="cypress" />

describe("Signup", () => {
  beforeEach(() => {
    cy.resetDb();
  });
  it("Successful Signup redirects to Dashboard", () => {
    cy.signup("testuser@exampleemail.com", "Tes7Password123", "Test");
    cy.log(window.localStorage.getItem("AUTH-TOKEN"));
    cy.visit("/");
    cy.location("pathname").should("equal", "/dashboard");
    cy.get("[data-cy=welcome]").contains("Hello Test");
  });
});
