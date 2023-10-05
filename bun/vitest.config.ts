/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["./lib/**/*.test.ts"],
    globals: true,
    setupFiles: ["./test.setup.ts"],
  },
});
