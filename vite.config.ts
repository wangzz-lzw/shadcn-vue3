import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
    plugins: [ react(), cesium() ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
        }
    },
    server: {
        cors: true,
        open: false,
        port: 5000,
        host: true,
        proxy: {
            '/api/': {
                // 后端地址
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
});
