// Configure Vitest (https://vitest.dev/config/)
/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(), // If you're using JSX, include this plugin
    dts(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-feature-flipper",
      fileName: "react-feature-flipper",
    },
    rollupOptions: {
      // Externalize peer dependencies to avoid bundling React
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
