import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "off", // we take manual screenshots
    trace: "on-first-retry",
  },
  outputDir: "tests/screenshots",
  projects: [
    {
      name: "simulation",
      use: { browserName: "chromium" },
    },
  ],
});
