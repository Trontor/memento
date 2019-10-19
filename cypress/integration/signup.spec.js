///<reference types="cypress" />

describe("Signup", () => {
  beforeEach(() => {
    cy.resetDb();
  });

  it("Landing Signup form rejects empty input", () => {
    cy.visit("/");
    cy.get('button[type="submit"]').click();
    cy.get("[data-cy=error]").should("have.length", 5);
  });

  it("Successful Signup redirects to Dashboard", () => {
    cy.signup("testuser@exampleemail.com", "Tes7Password123", "Test");
    cy.log(window.localStorage.getItem("AUTH-TOKEN"));
    cy.visit("/");
    cy.location("pathname").should("equal", "/dashboard");
    cy.get("[data-cy=welcome]").contains("Hello Test");
  });

  it("User already exists", () => {
    cy.signup("A@email.com");
    cy.clearLocalStorage();
    cy.visit("/");
    cy.get("[name=firstName]").type("Test");
    cy.get("[name=lastName]").type("Test");
    cy.get("[name=email]").type("A@email.com");
    cy.get("[name=password]").type("thisFieldDoesntMatt3r1!");
    cy.get("[name=confirmPassword]").type("thisFieldDoesntMatt3r1!");
    cy.get('button[type="submit"]').click();
    cy.get("[data-cy=errorBanner]");
  });
});
