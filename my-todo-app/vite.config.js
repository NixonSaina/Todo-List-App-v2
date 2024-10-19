import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Path to your Electron main process entry file
        entry: 'electron/main.js',
      },
      preload: {
        // Path to your Electron preload script (optional)
        input: 'electron/preload.js',
      },
      renderer: {
        // Path to your Vite React entry file
        input: 'src/main.jsx',  // Ensure this points to your actual React entry file
      },
    }),
  ],
  build: {
    outDir: 'dist',  // Output directory for Vite's build
  },
  server: {
    port: 3000,  // Set the port for Vite's dev server
  },
});
