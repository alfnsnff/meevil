import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        proxy: {
          '/api': 'http://localhost', // Adjust if your Laravel server runs on a different port
        },
      },
      build: {
        outDir: 'public/build', // Output directory for built assets
      },
});
