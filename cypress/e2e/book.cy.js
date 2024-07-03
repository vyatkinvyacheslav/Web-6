// describe('template spec', () => {
//   beforeEach(() => {
//     cy.visit('/')
//   })

//   it('Правильный логин', () => {
//     cy.login("bropet@mail.ru", "123")
//     // cy.visit('http://localhost:3000')
//     // cy.get('.ml-auto > .ml-2').click()
//     // cy.get('#mail').type("bropet@mail.ru)
//     // cy.get('#pass').type("123")
//     // cy.get('form > .ml-2').click()
//     cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')

//   })

//   it('Пустой логин', () => {
//     cy.login(null, "123")
//     cy.get("#mail").then((elements) => {
//       expect(elements[0].checkValidity()).to.be.false
//       expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
//     })
//   })

//   it('Пустой пароль', () => {
//     cy.login("bropet@mail.ru", null)
//     cy.get("#pass").then((elements) => {
//       expect(elements[0].checkValidity()).to.be.false
//       expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
//     })
//   })
// })




describe('logIn', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Should log in', () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  })

  it("Should not login with empty login", () => {
    cy.login(null, "123");
    cy.get('#mail').then($el => $el[0].checkValidity()).should('be.false');
  })

  it("Should not login with empty password", () => {
    cy.login("bropet@mail.ru", null);
    cy.get('#pass').then($el => $el[0].checkValidity()).should('be.false')
  })
})

describe('favourites', () => {
  before(() => {
    cy.visit('/');
    cy.login("bropet@mail.ru", "123");
    cy.populateLibrary();
    cy.contains("Add to favorite").click();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.login("bropet@mail.ru", "123");
  })

  it('Should add a book to favourite when book is created', () => {
    cy.contains("Add new").click();
    cy.get("#title").type("Favourite");
    cy.get("#favorite").check();
    cy.contains("Submit").click(); // создать книгу с флагом добавить в избранное
    cy.contains("Favorites").click(); // перейти на вкладку избранное
    cy.contains("Favourite").should("be.visible"); // проверить наличие книги в избранном
  })

  context("Favorites tab", () => {
    beforeEach(() => {
      cy.contains("Favorites").click();
    })
    it('Should open a book page from favourite', () => {
      cy.get(".card").click("center"); // нажать на книгу
      cy.contains("Dowload book").should("be.visible"); // проверить кнопку "Download book"
    })

    it('Should remove a book from favourite', () => {
      cy.get(".card-title").should("be.visible");
      cy.get(".card-deck").find(".card")
        .then(($cards) => {
          const numberOfFavourites = $cards.length; // запомнить количество книг в избранном
          cy.contains("Delete from favorite").click(); // удалить из избранного первую книгу
          cy.get(".card-title").should("be.visible");
          cy.get(".card-deck").find(".card").its('length').should("be.lessThan", numberOfFavourites);
        })
    })
  })

})