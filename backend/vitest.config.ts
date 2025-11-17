import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/helpers/vitest.setup.ts"],
    clearMocks: true,
    include: ["tests/**/*.test.ts"],
  },
});
