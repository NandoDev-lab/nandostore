import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Configuração para publicar em subdiretório (como GitHub Pages). O polling
// mantém o watcher confiável em ambientes cujo sistema de arquivos não notifica
// alterações diretamente.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      usePolling: true,
    },
  },
})
