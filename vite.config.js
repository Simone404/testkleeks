import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue' // vue 3
const path = require("path");

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});