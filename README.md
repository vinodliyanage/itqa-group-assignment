# QA Automation Assignment: Functional Testing with Cypress and Cucumber

## Submitted By:
- **Team Members**:
  1. Dileesha G A S
  2. Liyanage V.P.S
  3. Madhuwanthi W.A.I 
  4. Athilani G.A.S
  5. Gunasiri G.C.S
  6. Sara A.N.Z

## Assignment Details
- **Project Title**: Functional Testing of a Demo Application
- **Objective**: To automate functional testing for both UI and API using Cypress and Cucumber.
- **Tools Used**:
  - **Cypress**: For end-to-end testing.
  - **Cucumber**: For writing test cases.
  - **Node.js**: For managing dependencies and running tests.

---

## Project Structure

This project is organized into two main testing categories: API tests and UI tests.

- **[API Tests](./api-tests/)**: This folder contains the API test cases for the library system. The tests are written using Cypress and Cucumber, designed to test the book creation, updating, deletion, and retrieval APIs.
- **[UI Tests](./ui-tests/)**: This folder contains the UI test cases for the library system. The tests are written using Cypress and Cucumber, designed to test user interface interactions with the application.

---

## How to Run the Tests

### API Tests

To run the API tests, follow these steps:

1. Navigate to the `api-tests` folder:

   ```bash
   cd api-tests
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the API server (ensure the server is running locally at `http://localhost:7081`):

   ```bash
   npm run server
   ```

4. Open Cypress and run the API tests:

   ```bash
   npm run cy
   ```

For more details on running the API tests, refer to the [API Tests README](./api-tests/README.md).

### UI Tests

To run the UI tests, follow these steps:

1. Navigate to the `ui-tests` folder:

   ```bash
   cd ui-tests
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Open Cypress and run the UI tests:

   ```bash
   npm run cy
   ```

For more details on running the UI tests, refer to the [UI Tests README](./ui-tests/README.md).

---

## License

This project is licensed under the ISC License.


