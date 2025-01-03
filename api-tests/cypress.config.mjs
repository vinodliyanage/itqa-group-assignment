import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  on('after:spec', (spec, results) => {
    if (results && results.stats.failures > 0) {
        console.log('Test failed:', spec.relative);
    }
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:7081",
    specPattern: "**/*.feature",
    setupNodeEvents,
    video: true,
    videosFolder: "cypress/videos",
    trashAssetsBeforeRuns: true,
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
  },
});
