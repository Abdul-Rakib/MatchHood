import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false, // 🚫 disables .map files
    minify: 'esbuild', // ✅ default, fast minification
  }
})
