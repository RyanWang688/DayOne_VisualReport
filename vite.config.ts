import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on GitHub Pages project sub-paths
// (https://<user>.github.io/DayOne_VisualReport/) and when opened locally.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // One ~500 kB bundle (~158 kB gzip) is fine for a single-page report.
  build: { chunkSizeWarningLimit: 600 },
})
