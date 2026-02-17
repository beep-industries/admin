import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { fileURLToPath } from "node:url"
import { tanstackRouter } from "@tanstack/router-plugin/vite"

// https://vite.dev/config/
const rootDir = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      quoteStyle: "double",
    }),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: `${path.resolve(rootDir, "src")}/`,
      },
    ],
  },
})
