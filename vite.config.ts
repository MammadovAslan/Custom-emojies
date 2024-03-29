import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
    nodePolyfills({}),
  ],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      events: "rollup-plugin-node-polyfills/polyfills/events",
    },
  },
});
