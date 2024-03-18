describe('welcome page', () => {
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`);
    cy.visit('http://localhost:3000');
    cy.clearCookies();
  });

  it('visit to login page if click login button', () => {
    cy.contains('button', '로그인').click();
    cy.location('pathname').should('eq', '/welcome/login');
    cy.contains('h1', '로그인');
  });
  it('visit to login page if click login button', () => {
    cy.contains('button', '회원가입').click();
    cy.location('pathname').should('eq', '/welcome/join');
    cy.contains('h1', '회원가입');
  });
});
