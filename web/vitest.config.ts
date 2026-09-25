import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

/**
 * Vitest — the single unit/integration runner; tests co-locate under src/**.
 * jsdom by default (components); server-side suites pin
 * `@vitest-environment node` per file. `globals` enables RTL auto-cleanup.
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", "src/legacy/**", "e2e/**"],
    // The component suite uses jsdom heavily. Limiting workers avoids CPU
    // contention that can make otherwise-fast RTL queries exceed Vitest's
    // default 5s timeout when the complete suite runs.
    maxWorkers: 2,
    env: {
      NEXT_PUBLIC_TEST_MODE: "1",
    },
  },
});
