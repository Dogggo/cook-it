describe('cook-it', () => {
  beforeEach(() => cy.visit('/'));
});

describe('RecipeAddComponent', () => {
  beforeEach(() => {
    cy.visit('/add');
  });

  it('should display a recipe form', () => {
    cy.getBySel('recipe-form').should('be.visible');
  });

  it('should display an ingredient form', () => {
    cy.getBySel('ingredient-form').should('be.visible');
  });

  it('should add new ingredient form after button click', () => {
    cy.getBySel('ingredient-form').should('have.length', 2);
    cy.getBySel('add-ingredient-button').click();
    cy.getBySel('ingredient-form').should('have.length', 3);
  });
});

describe('FeatureEditRecipe', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getBySel('recipe-item').first().click();
    cy.getBySel('top-bar-menu').click().getBySel('menu-edit').click();
  });

  it('should top bar, recipe form and ingredient form be visible', () => {
    cy.getBySel('top-bar').should('be.visible');
  });

  it('undo changes and save changes buttons should be disabled before any change ', () => {
    cy.getBySel('undo-changes-btn').should('be.disabled');
    cy.getBySel('save-changes-btn').should('be.disabled');
  });

  it('undo changes button should be enabled after any change in form', () => {
    cy.getBySel('recipe-form')
      .getByFormControlName('preparationTimeInMinutes')
      .type('1');
    cy.getBySel('undo-changes-btn').should('be.enabled');
  });

  it('save changes button should be disabled if form contains errors ', () => {
    cy.getByFormControlName('description').clear().blur();
    cy.getBySel('save-changes-btn').should('be.disabled');
  });

  it('save changes button should be disabled if form contains errors ', () => {
    // cy.server();
    cy.getByFormControlName('description')
      .clear()
      .type('edited description aaaa');
    cy.getBySel('save-changes-btn').should('be.enabled');
  });
});
