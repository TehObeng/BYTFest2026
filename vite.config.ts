import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // ✅ Netlify requires base to be '/'
  plugins: [react()],
})
