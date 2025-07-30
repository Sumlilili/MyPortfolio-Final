import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'wurqky',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
