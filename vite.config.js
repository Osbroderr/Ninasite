import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Déploiement à la racine d'un domaine (ex. https://ninagaillard.com).
// Pour un sous-dossier (GitHub Pages : https://user.github.io/repo/),
// lancer le build avec :  BASE_URL=/repo/ npm run build
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
