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

  it("Sidebar loads", () => {
    cy.get("[data-cy=sidebar]");
  });
  it("Sidebar collapsed on small screens", () => {
    cy.viewport("iphone-6+");
    cy.get("[data-cy=sidebar]").should("not.be.visible");
  });

  it("Sidebar expanded on larger screens", () => {
    cy.get("[data-cy=sidebar]").should("be.visible");
  });
  it("New family button works and navigates properly", () => {
    cy.get("[data-cy=new-family]").click();
    cy.location("pathname").should("equal", "/family/new");
  });
  it("Invite button works and navigates properly", () => {
    cy.get("[data-cy=invite]").click();
    cy.location("pathname").should("equal", "/invite");
  });
  it("Edit account button works and navigates properly", () => {
    cy.get("[data-cy=edit-account]").click();
    cy.location("pathname").should("equal", "/settings");
  });
});
