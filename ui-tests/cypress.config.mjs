import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import cypressMochawesomeReporter from "cypress-mochawesome-reporter/plugin.js";
import cypressOnFix from "cypress-on-fix";

async function setupNodeEvents(on, config) {
  on = cypressOnFix(on);

  cypressMochawesomeReporter(on);

  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports",
    overwrite: true,
    saveJson: true,
    saveHtml: true,
    code: false,
  },
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    specPattern: "**/*.feature",
    setupNodeEvents,
    video: true,
    videosFolder: "cypress/videos",
    trashAssetsBeforeRuns: true,
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
  },
});
