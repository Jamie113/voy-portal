import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: { port: 3456 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        plans: resolve(__dirname, 'plans.html'),
        browseAddons: resolve(__dirname, 'browse-addons.html'),
        addon: resolve(__dirname, 'addon.html'),
        moveDate: resolve(__dirname, 'move-date.html'),
        offers: resolve(__dirname, 'offers.html'),
      }
    }
  }
})
