
describe('Login tests', () => {
    it('Correct login credentials', () => {
        cy.visit('https://password-manager-frontend-ten.vercel.app/login')

        cy.get('.LoginForm_input__C4YBF').eq(1).type("test@gmail.com")
        cy.get('.LoginForm_input__C4YBF').eq(2).type("testpassword")

        cy.intercept('POST', '/auth/login').as('loginRequest')

        cy.get('.LoginForm_button__hHec2').eq(0).click()

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            cy.wrap(interception.response.body).should('have.property', 'token');
            cy.wrap(interception.response.body).should('have.property', 'user_id');
        })
    })

    it('Wrong password', () => {
        cy.visit('https://password-manager-frontend-ten.vercel.app/login')

        cy.get('.LoginForm_input__C4YBF').eq(1).type("test@gmail.com")
        cy.get('.LoginForm_input__C4YBF').eq(2).type("testpasswordwrong")

        cy.intercept('POST', '/auth/login').as('loginRequest')

        cy.get('.LoginForm_button__hHec2').eq(0).click()

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(401)
            cy.wrap(interception.response.body).its('error').should('eq', 'Incorrect password');

        })
    })

    it('Not registered user', () => {
        cy.visit('https://password-manager-frontend-ten.vercel.app/login')

        cy.get('.LoginForm_input__C4YBF').eq(1).type("test1@gmail.com")
        cy.get('.LoginForm_input__C4YBF').eq(2).type("testpassword")

        cy.intercept('POST', '/auth/login').as('loginRequest')

        cy.get('.LoginForm_button__hHec2').eq(0).click()

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(401)
            cy.wrap(interception.response.body).its('error').should('eq', 'User is not registered');

        })
    })
})



describe('Signup tests', () => {
    it('Correct signup data', () => {
        cy.visit('https://password-manager-frontend-ten.vercel.app/signup')
        cy.get('.SignupForm_input__GWtGw').eq(1).type("TestName")
        cy.get('.SignupForm_input__GWtGw').eq(2).type("TestSurname")
        cy.get('.SignupForm_input__GWtGw').eq(3).type("test@mail.eu")
        cy.get('.SignupForm_input__GWtGw').eq(4).type("testpassword")

        cy.intercept('POST', '/auth/signup').as('signupRequest')


        cy.get('.SignupForm_button__lbh0n').click()

        cy.wait('@signupRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(201)
            cy.wrap(interception.response.body).should('have.property', 'token');

        })
    })


    it('Existing user', () => {
        cy.visit('https://password-manager-frontend-ten.vercel.app/signup')
        cy.get('.SignupForm_input__GWtGw').eq(1).type("TestName")
        cy.get('.SignupForm_input__GWtGw').eq(2).type("TestSurname")
        cy.get('.SignupForm_input__GWtGw').eq(3).type("test@mail.eu")
        cy.get('.SignupForm_input__GWtGw').eq(4).type("testpassword")

        cy.intercept('POST', '/auth/signup').as('signupRequest')


        cy.get('.SignupForm_button__lbh0n').click()

        cy.wait('@signupRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(401)
            cy.wrap(interception.response.body).its('error').should('eq', 'User is already registered');

        })

        cy.get('h3').should('contain', 'User is already registered')

    })
})


describe('Logout test', () => {
    it('Logout user', () => {
        cy.visit('https://password-manager-frontend-ten.vercel.app/login')

        cy.get('.LoginForm_input__C4YBF').eq(1).type("test@gmail.com")
        cy.get('.LoginForm_input__C4YBF').eq(2).type("testpassword")

        cy.get('.LoginForm_button__hHec2').eq(0).click()

        cy.get('.Profile_more__s5CiB').click()

        cy.intercept('GET', '/auth/logout').as('logoutRequest')

        cy.get('.logoutOption').click()

        cy.wait('@logoutRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            cy.wrap(interception.response.body).its('Msg').should('eq', 'cookie cleared');
        })

        cy.url().should('eq', 'https://password-manager-frontend-ten.vercel.app/login')

    })

})
