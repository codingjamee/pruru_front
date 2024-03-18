describe('template spec', () => {
  before(() => {
    cy.log(`Visiting http://localhost:3000`);
    cy.visit('http://localhost:3000');
  });

  it('visit to login page if click login button', () => {
    cy.contains('button', '로그인').click();
    cy.contains('h1', '로그인');
  });
  it('visit to login page if click login button', () => {
    cy.contains('button', '회원가입').click();
    cy.contains('h1', '회원가입');
  });
});
