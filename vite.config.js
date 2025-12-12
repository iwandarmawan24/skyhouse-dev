import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: 'localhost',
            overlay: false, // Disable error overlay yang bisa stuck
        },
        watch: {
            // Disable polling - bisa bikin infinite reload
            usePolling: false,
            // Ignore files yang ga perlu di-watch
            ignored: [
                '**/node_modules/**',
                '**/vendor/**',
                '**/storage/**',
                '**/public/build/**',
                '**/.git/**',
            ],
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',
                'resources/css/frontend.css',
                'resources/js/frontend.jsx'
            ],
            refresh: [
                'resources/views/**',
                'routes/**',
            ],
        }),
        react({
            // Disable fast refresh untuk Quill yang bisa bikin stuck
            fastRefresh: true,
            // Exclude problematic components
            exclude: /node_modules/,
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@css': path.resolve(__dirname, './resources/css'),
        },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'quill',
            '@inertiajs/react',
        ],
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
