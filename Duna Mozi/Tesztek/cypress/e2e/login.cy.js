/// <reference types="cypress"/>
describe('template spec', () => {
  beforeEach('Belépés a login oldalra', () => {
    cy.visit('http://127.0.0.1:5500/Duna%20Mozi/Frontend/HTML/bejel.html')
  })
  const joAdminEmail='havlagb1@gmail.com'
  const joAdminjelszo= "Admin"
  const rosszEmail="maci@laci.hu"
  const rosszjelszo="mucika"
  const rosszEmail2="macilaci.hu"
  const rosszjelszo2="mucikaásit"

  it('Belépés jó adatokkal',()=>{
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
  })
  it('Kijelentkezés',()=>{
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.get('button').contains('Kilépés').click()
    cy.url().should('include', 'bejel.html')
  })
  it('Belépés rossz adatokkal',()=>{
    cy.wait(5000)
    cy.get('input[type=email]').type(rosszEmail)
    cy.get('input[type=password').type(rosszjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.on('window:alert', (str)=>{expect(str).to.equal('Rossz e-mail vagy jelszó!')
    })
  })
  it('Üres input mező',()=>{
    cy.wait(5000)
    cy.get('button').contains('Bejelentkezés').click()
    cy.on('window:alert', (str)=>{expect(str).to.equal('Kérem töltse ki az adatbeviteli mezőket!')
    })
  })
  it('Belépés regex-nek nem megfelelő adatokkal (email)',()=>{
    cy.wait(5000)
    cy.get('input[type=email]').type(rosszEmail2)
    cy.get('input[type=password').type(joAdminjelszo)
    cy.get('button').contains('Bejelentkezés').click()
    cy.on('window:alert', (str)=>{expect(str).to.equal('Hibás E-mail cím! Az E-mail cím nem érvényes!')
    })
  })
  it('Belépés regex-nek nem megfelelő adatokkal (jelszó)',()=>{
    cy.wait(5000)
    cy.get('input[type=email]').type(joAdminEmail)
    cy.get('input[type=password').type(rosszjelszo2)
    cy.get('button').contains('Bejelentkezés').click()
    cy.on('window:alert', (str)=>{expect(str).to.equal('Hibás jelszó! A jelszó csak a-z kisbetűket A-Z nagybetűket 0-9 számokat valamint ezen karaktereket: . _ + - ~ ! ? tartalmazhat! Ékezetes karaktert NEM!')
    })
  })
})