# UI Tests

This repository contains UI tests for the library system. The tests are written using Cypress and Cucumber, and are designed to test the user interface interactions with the application.

## Requirements

- **Node.js** (version 14 or higher)
- **Cypress** (automatically installed by running the setup)

## Setup Instructions

1. **Install Dependencies**:

   Clone this repository and navigate to the `ui-tests` folder in your terminal. Then, install the required dependencies:

   ```bash
   npm install
   ```

## Running the Tests

Once the setup is complete, you can execute the UI tests using Cypress.

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
ui-tests/
├── cypress/
│   ├── e2e/
│   │   └── <feature-file-name>.cy.feature          // Feature files for your UI test scenarios
│   └── steps/
│       └── <step-definitions-file-name>.cy.mjs     // Step definitions for the feature files
├── package.json                                    // Project dependencies and scripts
```

### Key Files:
- **`<feature-file-name>.cy.feature`**: Contains Gherkin syntax for your UI test scenarios.
- **`<step-definitions-file-name>.cy.mjs`**: Contains the step definitions for the feature files.

## Troubleshooting

- If Cypress is not opening, make sure you have installed the required dependencies by running `npm install`.
- If you face issues with step definitions, ensure that the feature file name and step definition file are correctly mapped.

## License

This project is licensed under the ISC License.
