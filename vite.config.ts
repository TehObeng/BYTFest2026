import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Replace "BYTFest2026" with your actual GitHub repo name!
export default defineConfig({
  base: '/BYTFest2026/',
  plugins: [react()],
})
