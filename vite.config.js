// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    headers: {
      // Google Login popup එකේදී එන isolation warning එක fix කරන්න මේක අනිවාර්යයි
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
});
