import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './buffet-letters-demo',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist'
  }
})
