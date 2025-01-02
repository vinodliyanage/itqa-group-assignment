const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./features/book-management.feature');
const baseUrl = '/api/books';

defineFeature(feature, (test) => {
  test('Get all books', ({ given, when, then, and }) => {
    given('the application is running', function () {
      cy.request({
        method: 'GET',
        url: baseUrl,
        headers: {
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 204]);
      });
    });

    when('I send a GET request to "/api/books"', function () {
      cy.request({
        method: 'GET',
        url: baseUrl,
        headers: {
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      }).then((response) => {
        this.response = response;
      });
    });

    then('the response status code should be 200', function () {
      expect(this.response.status).to.equal(200);
    });

    and('the response body should be an array of books', function () {
      expect(this.response.body).to.be.an('array');
    });
  });

  test('Create a new book', ({ given, when, then, and }) => {
    given('the application is running', function () {
      cy.request({
        method: 'GET',
        url: baseUrl,
        headers: {
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 204]);
      });
    });

    when('I send a POST request to "/api/books" with the following data:', function (dataTable) {
      const data = dataTable.hashes()[0];
      cy.request({
        method: 'POST',
        url: baseUrl,
        headers: {
          Authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
        },
        body: data,
      }).then((response) => {
        this.response = response;
      });
    });

    then('the response status code should be 201', function () {
      expect(this.response.status).to.equal(201);
    });

    and('the response body should indicate the book was created', function () {
      expect(this.response.body).to.have.property('id');
      expect(this.response.body).to.have.property('title');
      expect(this.response.body).to.have.property('author');
    });
  });
});
