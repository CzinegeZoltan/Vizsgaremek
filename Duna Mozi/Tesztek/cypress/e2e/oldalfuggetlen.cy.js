/// <reference types="cypress"/>
describe('template spec', () => {
  it('Iletéktelen hozzáférés próba', () => {
    cy.visit('http://127.0.0.1:5500/Duna%20Mozi/Frontend/HTML/bejel.html')
    cy.url().should('include', 'bejel.html')
  })
  it('Navbar teszt', () => {
    cy.visit('http://127.0.0.1:5500/Vizsgaremek/Duna%20Mozi/Frontend/Index.html')
    cy.url().should('include', 'Index.html')
    cy.get('a').contains('Jegyvásárlás').click()
    cy.url().should('include', 'jegyvasarlas.html')
    cy.get('a').contains('Jegyek és Nyitvatartás').click()
    cy.url().should('include', 'tablazatok.html')
    cy.get('a').contains('Vetítések').click()
    cy.url().should('include', 'vetitesek.html')
    cy.get('a').contains('Események').click()
    cy.url().should('include', 'esemenyek.html')
    cy.get('a').contains('Főoldal').click()
    cy.url().should('include', 'Index.html')

  })
})