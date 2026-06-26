import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
// The three lines are imports. They bring in tools from installed packages to use them in this file
/* tells vite to use React and Tailwind as plugins when building this app */
/* A plugin = an add-on that gives Vite extra abilities */
