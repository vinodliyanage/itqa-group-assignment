# API Tests

This repository contains API tests for the library system. The tests are written using Cypress and Cucumber, and are designed to test the book creation, updating, deletion, and retrieval APIs.

## Requirements

- **Node.js** (version 14 or higher)
- **Java** (version 13 or higher)
- **Cypress** (automatically installed by running the setup)

## Setup Instructions

1. **Install Dependencies**:

   Clone this repository and navigate to the `api-tests` folder in your terminal. Then, install the required dependencies:

   ```bash
   npm install
   ```

2. **Start the API Server**:

   To run the tests, you need the API server running locally. Start the server by executing the following command in your terminal:

   ```bash
   npm run server
   ```

   Ensure that the server is running at `http://localhost:7081`, as specified in the API documentation.

## Running the Tests

Once the server is up and running, you can execute the API tests using Cypress.

1. **Open Cypress**:

   To open Cypress, run the following command:

   ```bash
   npm run cy
   ```

   This will launch the Cypress Test Runner, where you can select and run your tests.

2. **Running Tests from the Command Line**:

   If you prefer to run tests in the terminal without opening the Cypress UI, use the following command:

   ```bash
   npx cypress run
   ```

## Folder Structure

The test files are organized in the following structure:

```
api-tests/
├── cypress/
│   ├── e2e/
│   │   └── <feature-file-name>.cy.feature            // Feature 
│       └── <step-definitions-file-name>.cy.mjs       // Step definitions for the feature files
├── package.json                                      // Project dependencies and scripts
```

### Key Files:
- **`<feature-file-name>.cy.feature`**: Contains Gherkin syntax for your API test scenarios. 
- **`<step-definitions-file-name>.cy.mjs`**: Contains the step definitions for the feature files.”

## Running the API Server

Before running the tests, make sure the server is running. The server will listen on `http://localhost:7081` and is required to process the API requests during testing.

You can start the server by running:

```bash
npm run server
```

Ensure the server is running before executing the tests.

## Troubleshooting

- If the server is not running, the tests will fail because the requests won't reach the expected endpoints.
- Ensure that your API server is running and accessible at `http://localhost:7081`.

## License

This project is licensed under the ISC License.

