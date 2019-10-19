///<reference types="cypress" />
describe("Sidebar", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.signup("test@email.com");
    cy.visit("/dashboard");
    cy.viewport("macbook-15");
  });

  it("Active sidebar links are rendered properly", () => {
    const navigateAndCheckActive = name => {
      cy.get(`[data-cy=${name}]`).click();
      cy.get(`[data-cy=${name}]`)
        .parent()
        .should("have.class", "active");
    };
    navigateAndCheckActive("invite");
    navigateAndCheckActive("edit-account");
    navigateAndCheckActive("bookmarks");
    navigateAndCheckActive("mementos");
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
