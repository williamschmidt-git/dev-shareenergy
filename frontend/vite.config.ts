import { defineConfig } from 'vite'
import { liveReload } from 'vite-plugin-live-reload';
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), liveReload('.path')],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
