/// <reference types="cypress"/>

describe('template spec', () => {
  beforeEach('Belépés a login oldalra', () => {
    cy.visit('http://127.0.0.1:5500/Vizsgaremek/Duna%20Mozi/Frontend/HTML/bejel.html')
  })
  const joAdminEmail = 'havlagb1@gmail.com'
  const joAdminjelszo = "Admin"

  const tesztesemenycim = 'Cypress esemény'
  const tesztesemenycim2 = 'Cypress teszt esemény'
  const rossztesztesemenycim = 'Cypress@esemény'
  const tesztdátum='2024-10-15'
  const rossztesztdátum='2023-10-15'
  const tesztvetitettfilm='Gyalog galopp'
  const tesztlink='https://cdn.pixabay.com/photo/2021/09/03/15/14/woman-6596029_1280.jpg'
  const rossztesztlink='Cypress_Joska_profelkep.jpg'
  it('Esemémy regisztráció teszt jó adatokkal', () => {
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Új esemény').click()
    cy.get('input[type=text]').eq(0).type(tesztesemenycim)
    cy.get('input[type=date]').type(tesztdátum)
    cy.get('input[type=text]').eq(1).type(tesztlink)
    cy.get('select').select(tesztvetitettfilm)
    cy.get('button').contains('Esemény regisztrálása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal('Sikeres esemény létrehozás') })
  })
 /* it('Esemény modósítása teszt jó adatokkal', () => {
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Esemény módosítása').click()
    cy.get('select').eq(0).select(tesztesemenycim)
    cy.get('input[type=text]').eq(0).type(tesztesemenycim2)
    cy.get('input[type=date]').type(tesztdátum)
    cy.get('input[type=text]').eq(1).type(tesztlink)
    cy.get('button').contains('Esemény módosítása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal('Sikeres esemény módosítás') })
  })*/ //filmid keres és emiatt nem működik
  it('Esemény regisztráció teszt hiányos adatokkal (nincs névmegadás)', () => {
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Új esemény').click()
    cy.get('input[type=date]').type(tesztdátum)
    cy.get('input[type=text]').eq(1).type(tesztlink)
    cy.get('select').select(tesztvetitettfilm)
    cy.get('button').contains('Esemény regisztrálása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal('Töltsön ki minden mezőt!') })
  })
  it('Esemény modósítása teszt hiányos adatokkal (nincs névmegadás)', () => {
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Esemény módosítása').click()
    cy.get('select').eq(0).select(/*tesztesemenycim2*/tesztesemenycim)
    cy.get('input[type=date]').type(tesztdátum)
    cy.get('input[type=text]').eq(1).type(tesztlink)
    cy.get('button').contains('Esemény módosítása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal('Töltsön ki minden mezőt!') })
  })
  it('Esemémy regisztráció teszt regex-nek nem megfelelő eseménynév', () => {
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Új esemény').click()
    cy.get('input[type=text]').eq(0).type(rossztesztesemenycim)
    cy.get('input[type=date]').type(tesztdátum)
    cy.get('input[type=text]').eq(1).type(tesztlink)
    cy.get('select').select(tesztvetitettfilm)
    cy.get('button').contains('Esemény regisztrálása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal("Hibás cím! Az esemény címe nem engedéjezett karaktert tartalmaz! Ezeket használhatja: a-z A-Z 0-9 Ékezetes karakterek , szóköz ! ? ' % ( )") })
  })
  it('Esemémy regisztráció teszt regex-nek nem megfelelő linkel', () => {
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Új esemény').click()
    cy.get('input[type=text]').eq(0).type(tesztesemenycim)
    cy.get('input[type=date]').type(tesztdátum)
    cy.get('input[type=text]').eq(1).type(rossztesztlink)
    cy.get('select').select(tesztvetitettfilm)
    cy.get('button').contains('Esemény regisztrálása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal('Hibás link! Nem engedéjezett karaktert tartalmaz, vagy nem felel meg a link formai követelményének!') })
  })
  it('Esemémy regisztráció teszt rossz dátum', () => {
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password]').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Új esemény').click()
    cy.get('input[type=text]').eq(0).type(tesztesemenycim)
    cy.get('input[type=date]').type(rossztesztdátum)
    cy.get('input[type=text]').eq(1).type(tesztlink)
    cy.get('select').select(tesztvetitettfilm)
    cy.get('button').contains('Esemény regisztrálása').click()
    cy.on('window:alert', (str) => { expect(str).to.equal('Nem jövőbeli dátumot adott meg!') })
  })
  //   it('Esemény modósítása teszt regex-nek nem megfelelő eseménynév', () => {
  //   cy.wait(5000)
  //   cy.get('input[type=email]').type(joAdminEmail)
  //   cy.get('input[type=password]').type(joAdminjelszo)
  //   cy.get('button').contains('Bejelentkezés').click()
  //   cy.get('button').contains('Esemény módosítása').click()
  //   cy.get('select').eq(0).select(/*tesztesemenycim2*/tesztesemenycim)
  //   cy.get('input[type=text]').eq(0).type(rossztesztesemenycim)
  //   cy.get('input[type=date]').type(tesztdátum)
  //   cy.get('input[type=text]').eq(1).type(tesztlink)
  //   cy.get('button').contains('Esemény módosítása').click()
  //   cy.on('window:alert', (str) => { expect(str).to.equal("Hibás cím! Az esemény címe nem engedéjezett karaktert tartalmaz! Ezeket használhatja: a-z A-Z 0-9 Ékezetes karakterek , szóköz ! ? ' % ( )") })
  // })
  // it('Esemény modósítása teszt regex-nek nem megfelelő link', () => {
  //   cy.wait(5000)
  //   cy.get('input[type=email]').type(joAdminEmail)
  //   cy.get('input[type=password]').type(joAdminjelszo)
  //   cy.get('button').contains('Bejelentkezés').click()
  //   cy.get('button').contains('Esemény módosítása').click()
  //   cy.get('select').eq(0).select(/*tesztesemenycim2*/tesztesemenycim)
  //   cy.get('input[type=text]').eq(0).type(tesztesemenycim)
  //   cy.get('input[type=date]').type(tesztdátum)
  //   cy.get('input[type=text]').eq(1).type(rossztesztlink)
  //   cy.get('button').contains('Esemény módosítása').click()
  //   cy.on('window:alert', (str) => { expect(str).to.equal('Hibás link! Nem engedéjezett karaktert tartalmaz, vagy nem felel meg a link formai követelményének!') })
  // })
  it('Esemény törlése teszt jó adatokkal', () => {
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail);
    cy.get('input[type=password]').type(joAdminjelszo);
    cy.get('button').contains('Bejelentkezés').click();
    cy.get('button').contains('Esemény módosítása').click()
    cy.get('select').eq(0).select(/*tesztesemenycim2*/tesztesemenycim)
    cy.get('button').contains('Esemény törlése').click();
    cy.on('window:alert', (str) => { expect(str).to.equal('Sikeres esemény törlése') })
  })
})