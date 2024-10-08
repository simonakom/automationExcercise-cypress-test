Cypress.Commands.add('createUser', (baseName) => {
  const timestamp = Date.now();

  return cy.fixture('users').then((userData) => {
    return {
      name: `${baseName}_${timestamp}`,
      email: `${baseName.toLowerCase()}_${timestamp}@example.com`,
      firstName: `${baseName}_${timestamp}`,
      ...userData 
    };
  });
});

Cypress.Commands.add('registerUser', (user) => {
  // Navigate to url 
  cy.visit('/');
  // Verify that home page is visible successfully
  cy.url().should('eq', Cypress.config('baseUrl'));
  cy.get('h1').should('contain.text', 'Automation').and('contain.text', 'Exercise').and('be.visible');
  // Click on 'Signup / Login' button
  cy.get('a[href="/login"]').should('contain.text', 'Signup / Login').and('be.visible').click();
  // Verify 'New User Signup!' is visible
  cy.get('.signup-form h2').should('contain.text', 'New User Signup!').and('be.visible');
  // Enter name and email address
  cy.get('input[data-qa="signup-name"]').type(user.name).should('have.value', user.name).and('be.visible');
  cy.get('input[data-qa="signup-email"]').type(user.email).should('have.value', user.email).and('be.visible');
  // Click 'Signup' button
  cy.get('button[data-qa="signup-button"]').should('contain.text', 'Signup').and('be.visible').click();
  // Verify that 'ENTER ACCOUNT INFORMATION' is visible
  cy.get('.login-form h2').should('contain.text', 'Enter Account Information').and('be.visible');
  // Fill details: Title, Name, Email, Password, Date of birth 
  cy.get('input[type="radio"][value="Mr"]').check().should('be.checked').and('be.visible'); 
  cy.get('input[data-qa="password"]').type(user.password).should('have.value', user.password).and('be.visible');
  cy.get('select[data-qa="days"]').select(user.birthDay).should('have.value', user.birthDay).and('be.visible');
  cy.get('select[data-qa="months"]').select(user.birthMonth).should('have.value', user.birthMonth).and('be.visible');
  cy.get('select[data-qa="years"]').select(user.birthYear).should('have.value', user.birthYear).and('be.visible');
  // Select checkbox 'Sign up for our newsletter!'
  cy.get('input[type="checkbox"]#newsletter').check().should('be.checked').and('be.visible'); 
  // Select checkbox 'Receive special offers from our partners!'
  cy.get('input[type="checkbox"]#optin').check().should('be.checked').and('be.visible'); 
  // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  cy.get('input[data-qa="first_name"]').type(user.firstName).should('have.value', user.firstName).and('be.visible');
  cy.get('input[data-qa="last_name"]').type(user.lastName).should('have.value', user.lastName).and('be.visible');
  cy.get('input[data-qa="company"]').type(user.company).should('have.value', user.company).and('be.visible');
  cy.get('input[data-qa="address"]').type(user.address).should('have.value', user.address).and('be.visible');
  cy.get('input[data-qa="address2"]').type(user.address2).should('have.value', user.address2).and('be.visible');
  cy.get('select[data-qa="country"]').select(user.country).should('have.value', user.country).and('be.visible'); 
  cy.get('input[data-qa="state"]').type(user.state).should('have.value', user.state).and('be.visible'); 
  cy.get('input[data-qa="city"]').type(user.city).should('have.value', user.city).and('be.visible'); 
  cy.get('input[data-qa="zipcode"]').type(user.zipcode).should('have.value', user.zipcode).and('be.visible'); 
  cy.get('input[data-qa="mobile_number"]').type(user.mobileNumber).should('have.value', user.mobileNumber).and('be.visible'); 
  // Click 'Create Account button'
  cy.get('button[data-qa="create-account"]').should('contain.text', 'Create Account').and('be.visible').click();
  // Verify that 'ACCOUNT CREATED!' is visible
  cy.get('h2.title').should('contain.text', 'Account Created!').and('be.visible');
  // Click 'Continue' button
  cy.get('a[data-qa="continue-button"]').should('contain.text', 'Continue').and('be.visible').click();
  // Verify that 'Logged in as username' is visible
  cy.get('.shop-menu .nav li:contains("Logged in as")').should('contain.text', `Logged in as ${user.firstName}`).and('be.visible');})

Cypress.Commands.add('deleteAccount', () => {
  // Click 'Delete Account' button
  cy.get('a[href="/delete_account"]').should('contain.text', 'Delete Account').and('be.visible').click();
  // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  cy.get('h2.title').should('contain.text', 'Account Deleted!').and('be.visible');
  cy.get('a[data-qa="continue-button"]').should('contain.text', 'Continue').and('be.visible').click();
});

Cypress.Commands.add('logout', () => {
  // Click 'Logout' button
  cy.get('a[href="/logout"]').contains(' Logout').click();
  // Verify that user is navigated to login page
  cy.get('.login-form h2').should('contain.text', 'Login to your account').and('be.visible');
});

Cypress.Commands.add('navigateToHomePage', () => {
  // Navigate to url 
  cy.visit('/');
  // Verify that home page is visible successfully
  cy.url().should('eq', Cypress.config('baseUrl'));
  cy.get('h1').should('contain.text', 'Automation').and('contain.text', 'Exercise').and('be.visible');
});

Cypress.Commands.add('addProductToCart', (productId) => {
  // Hover over product and click 'Add to cart'
  cy.get(`a[data-product-id="${productId}"]`).first().contains('Add to cart').trigger('mouseover'); 
  cy.get(`a[data-product-id="${productId}"]`).first().contains('Add to cart').click(); 
});

Cypress.Commands.add('subscribeToNewsletter', (email) => {
  // Scroll down to footer
  cy.get('footer').scrollIntoView();
  // Verify text 'SUBSCRIPTION'
  cy.get('.single-widget h2').should('contain.text', 'Subscription').and('be.visible');
  // Enter email address in input and click arrow button
  cy.get('input[type="email"]#susbscribe_email').should('be.visible').type('test@example.com'); 
  cy.get('button#subscribe').should('be.visible').click(); 
  // Verify success message 'You have been successfully subscribed!' is visible 
  cy.get('#success-subscribe').should('be.visible').and('contain.text', 'You have been successfully subscribed!');
});
