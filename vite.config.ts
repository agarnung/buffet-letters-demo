import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ← CAMBIAR ESTO de '/demo-preuab/' a './'
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist'
  }
})