// Configure Vitest (https://vitest.dev/config/)
/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    // https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-feature-flipper",
      fileName: "react-feature-flipper",
    },
  },
  plugins: [dts()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
