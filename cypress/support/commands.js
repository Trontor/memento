// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add("resetDb", () => {
  // Reset the database
  cy.exec('mongo memento-e2e --eval "db.dropDatabase();"');
});
Cypress.Commands.add(
  "signup",
  (
    email,
    password = "Tes7Password123",
    firstName = "Test",
    lastName = "User",
  ) => {
    const signupQuery = `mutation {
              signup(input: { 
                email: "${email}",
                firstName: "${firstName}",
                lastName:"${lastName}",
                password:"${password}"
              }) {
                token
                user {
                  email
                  firstName
                  lastName
                  userId
                }
              }    
            }`;
    const graphqlReqConfig = (
      body = {},
      api = "localhost:5000/graphql",
      method = "post",
    ) => {
      return {
        method,
        body,
        url: api,
        failOnStatusCode: false,
      };
    };
    return cy
      .request(
        graphqlReqConfig({
          query: signupQuery,
        }),
      )
      .then(res => res.body.data.signup)
      .then(res => {
        window.localStorage.setItem("AUTH-TOKEN", res.token);
        return res;
      });
  },
);
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
