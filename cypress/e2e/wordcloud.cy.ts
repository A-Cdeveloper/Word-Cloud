/// <reference types="cypress" />

describe("WordCloud Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("render home page with expected elements", () => {
    cy.get(`[data-testid="app-title"]`).should("exist");
    cy.get(`[data-testid="word-list"]`).should("exist");
    cy.get(`[data-testid="no-selection"]`).should("exist");
  });

  it("should show no data state when API returns empty array", () => {
    cy.intercept("GET", "/topics.json", { body: { topics: [] } });
    cy.get(`[data-testid="no-topics"]`).should("exist");
  });

  it("should load and display topics", () => {
    cy.get(`[data-testid="word-list"]`).should("exist");
    cy.get(`[data-testid*="word-"]`).should("have.length.greaterThan", 0);
  });

  it("should display topic details when clicking on a word", () => {
    cy.get(`[data-testid*="word-"]`).first().click();
    cy.get(`[data-testid="topic-details"]`).should("exist");
    cy.get(`[data-testid="total-mentions"]`).should("exist");
  });

  it("should show error state when fetch fails", () => {
    cy.intercept("GET", "/topics.json", { statusCode: 500 });
    cy.get(`[data-testid="error"]`).should("exist");
  });

  it("should handle multiple word clicks", () => {
    cy.get(`[data-testid*="word-"]`).should("have.length.greaterThan", 1);

    // Click on first word
    cy.get(`[data-testid*="word-"]`).first().click();
    cy.get(`[data-testid="topic-details"]`).should("exist");

    // Click on second word
    cy.get(`[data-testid*="word-"]`).eq(1).click();
    cy.get(`[data-testid="topic-details"]`).should("exist");
  });
});
