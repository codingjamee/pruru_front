describe('upload receipt', () => {
  beforeEach(() => {
    cy.log(`visiting /add/receipt`);
    cy.visit(`visiting /add/receipt`);
  });
  it('select receipt file', () => {
    cy.get('[data-cy="upload-receipt"]').selectFile('./receipt_ex.jpg');
  });

  it('send analyze request', () => {
    cy.intercept('POST', '/api/analyze/receipt').as('analyzeReceipt');
    cy.get('[data-cy="analyze-receipt"]').click();
    cy.wait('@analyzeReceipt').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('requestId');
    });
  });
});
