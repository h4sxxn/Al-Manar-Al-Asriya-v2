import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site — served from /Al-Manar-Al-Asriya-v2/
export default defineConfig({
  plugins: [react()],
  base: '/Al-Manar-Al-Asriya-v2/',
})
