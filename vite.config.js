import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',
                'resources/css/frontend.css',
                'resources/js/frontend.jsx'
            ],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@css': path.resolve(__dirname, './resources/css'),
        },
    },
    build: {
        // Optimize untuk VPS dengan RAM terbatas
        rollupOptions: {
            output: {
                // Batasi chunk size untuk mengurangi memory usage saat build
                manualChunks(id) {
                    // Pisahkan vendor dependencies
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        // Naikkan limit warning (opsional)
        chunkSizeWarningLimit: 1000,
        // Gunakan esbuild (lebih hemat memory dari terser)
        minify: 'esbuild',
        // Kurangi sourcemap di production untuk hemat memory
        sourcemap: false,
    },
});
