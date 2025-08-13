import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: true, // Listen on all local IPs
    port: 5173, // You can specify a port or remove this line to use the default
  },
  preview: {
    host: true, // Listen on all local IPs for preview mode as well
    port: 4173, // Default preview port, you can change it if needed
  },
});
