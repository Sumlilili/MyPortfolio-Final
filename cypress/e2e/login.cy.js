describe('Login Flow', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/signin');

    cy.get('input[name="email"]').type('tli148@my.centennialcollege.ca');
    cy.get('input[name="password"]').type('qwerty');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.contains('Logout');
  });
});
