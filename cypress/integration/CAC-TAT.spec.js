// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {

        
        cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
       
        const text = 'anderson silva, anderson silva, anderson silva, anderson silva, anderson silva';
        cy.get('#firstName')
            .should('be.visible')
            .type('Anderson')
            .should('have.value', 'Anderson');

        cy.get('#lastName')
            .should('be.visible')
            .type('Silva')
            .should('have.value', 'Silva');
        
        cy.get('#email')
            .should('be.visible')
            .type('anderson@teste.com')
            .should('have.value', 'anderson@teste.com');

        cy.get('#open-text-area')
            .should('be.visible')
            .type(text, {delay:0});
            
        
        
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click();

        cy.get('.success').should('be.visible');
  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName')
            .should('be.visible')
            .type('Anderson')
            .should('have.value', 'Anderson');

        cy.get('#lastName')
            .should('be.visible')
            .type('Silva')
            .should('have.value', 'Silva');
        
        cy.get('#email')
            .should('be.visible')
            .type('anderson.teste.com')
            .should('have.value', 'anderson.teste.com');

        cy.get('#open-text-area')
            .should('be.visible')
            .type('teste anderson')
            .should('have.value', 'teste anderson');
        
        
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click();
        
        cy.get('.error').should('be.visible')
            
        
    })

    it('validar numero de telefone', function() {       
       
        cy.get('#phone')
            .should('be.visible')
            .type('anderson')
            .should('have.value','');          


        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
       
        cy.get('input[id="firstName"]')
            .should('be.visible')
            .type('Anderson', {delay:10})
            .should('have.value', 'Anderson');

        cy.get('input[id="lastName"]')
            .should('be.visible')
            .type('Silva')
            .should('have.value', 'Silva');
        
        cy.get('input[id="email"]')
            .should('be.visible')
            .type('anderson@teste.com')
            .should('have.value', 'anderson@teste.com');

        
        cy.get('textarea[id="open-text-area"]')
            .should('be.visible')
            .type('teste anderson')
            .should('have.value', 'teste anderson');
        
        cy.get('input[id="phone-checkbox"]')
            .should('be.visible')
            .check();
        
        
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click();

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
       
        cy.get('input[id="firstName"]')
            .should('be.visible')
            .type('Anderson', {delay:10})
            .should('have.value', 'Anderson')
            .clear()
            .should('have.value', '');

        cy.get('input[id="lastName"]')
            .should('be.visible')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '');
        
        cy.get('input[id="email"]')
            .should('be.visible')
            .type('anderson@teste.com')
            .should('have.value', 'anderson@teste.com')
            .clear()
            .should('have.value', '');

        cy.get('input[id="phone"]')
            .should('be.visible')
            .type('33335555')
            .should('have.value', '33335555')
            .clear()
            .should('have.value', '');

        cy.get('textarea[id="open-text-area"]')
            .should('be.visible')
            .type('teste anderson')
            .should('have.value', 'teste anderson'); 
        
        
  
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatóriospreenche e limpa os campos nome, sobrenome, email e telefone', function() {
       
           
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click();

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
       
       cy.fillMandatoryFieldsAndSubmit();
       cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
       
        cy.get('select').select('YouTube').should('have.value','youtube')
        
     })

     it('seleciona um produto (Mentoria) por seu valor (value)', function() {
       
        cy.get('select').select('Mentoria').should('have.value','mentoria')
        
     })
    
     it('seleciona um produto (Blog) por seu índice', function() {
       
        cy.get('select').select(1).should('have.value','blog')
        
     })

     it('marca o tipo de atendimento "Feedback"', function() {
       
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
        
     })

     it('marca cada tipo de atendimento', function() {
       
        cy.get('input[type="radio"]')
            .check()
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        
     })

     it('marca ambos checkboxes, depois desmarca o último', function() {
       
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
     })

     
     it('seleciona um arquivo da pasta fixtures', function() {
       
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        
     })

     it('seleciona um arquivo simulando um drag-and-drop', function() {
       
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        
     })

     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
       cy.fixture('example.json', {encoding: null}).as('exampleFile')
       cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
        
     })

     it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
         
      })

      

      it.only('testa a página da política de privacidade de forma independente', function() {
        
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')       

        cy.get('#title')
            .should('be.visible')            
            .should('have.text', 'CAC TAT - Política de privacidade');
      })

})
