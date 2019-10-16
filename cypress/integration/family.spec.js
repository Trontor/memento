describe("Family", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.signup("test@email.com");
    cy.visit("/dashboard");
    cy.viewport("macbook-15");
  });

  it("New Family page loads properly", () => {
    cy.visit("/family/new");
    cy.get("[data-cy=new-family]");
  });

  it("Empty input results in validation error", () => {
    cy.visit("/family/new");
    cy.get('button[type="submit"]').click();
    cy.get("[data-cy=error]").should("have.length", 2);
  });

  it("Create a new family succesfully", () => {
    cy.visit("/family/new");
    cy.get("[name=familyName]").type("Test Family");
    // Click on last color
    cy.get("[data-cy=circle-picker] > div")
      .children("span:nth-child(2)")
      .click();
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("contain", "/family/");
    cy.get("[data-cy=no-mementos]");
  });
});
