///<reference types="cypress" />

describe("Homepage", () => {
  it("Blobs load on large screens", () => {
    cy.visit("/");
  });
});
