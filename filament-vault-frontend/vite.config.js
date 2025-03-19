import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Explicitly tell Vite to include only your custom styles
    preprocessorOptions: {
      css: {
        additionalData: '@import "./src/index.css";',
      },
    },
  },
})