describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Правильный логин', () => {
    cy.login("bropet@mail.ru", "123")
    // cy.visit('http://localhost:3000')
    // cy.get('.ml-auto > .ml-2').click()
    // cy.get('#mail').type("bropet@mail.ru)
    // cy.get('#pass').type("123")
    // cy.get('form > .ml-2').click()
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
   
  })

  it('Пустой логин', () => {
    cy.login(null, "123")
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('Пустой пароль', () => {
    cy.login("bropet@mail.ru", null)
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })
})