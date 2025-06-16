import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import Node.js path module for resolving paths

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes the API_KEY available in your client-side code as process.env.API_KEY
    // Ensure API_KEY is set in your Netlify environment variables (or .env for local dev if not using Netlify's build)
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define the @ alias to point to the src directory
    },
  },
})