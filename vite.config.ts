import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import cdn from 'vite-plugin-cdn2';
// 专用 CDN 映射配置
const customCDNMappings = {
    'cesium': {
        var: 'Cesium',
        path: 'https://cdn.jsdelivr.net/npm/cesium@1.126.0/Build/Cesium/Cesium.js'
    },
    '@radix-ui/react-checkbox': {
        var: 'RadixCheckbox',
        path: '@radix-ui/react-checkbox@1.1.4/dist/index.js'
    },
    // 其他 Radix 组件配置
    '@radix-ui/react-dialog': {
        var: 'RadixDialog',
        path: '@radix-ui/react-dialog@1.1.6/dist/index.js'
    },
    'lucide-react': {
        var: 'LucideReact',
        path: 'https://cdn.jsdelivr.net/npm/lucide-react@0.475.0/dist/umd/lucide-react.min.js'
    }
};
export default defineConfig({
    plugins: [ react(), cesium(), cdn({
        modules: [
            'react',
            'react-dom',
            'react-router-dom',
            'axios',
            'zod',
            ...Object.entries(customCDNMappings).map(([ name, config ]) => ({
                name,
                var: config.var,
                path: config.path
            }))
        ],
    }) ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            external: [ ...Object.keys(customCDNMappings) ], // 显式声明外部依赖
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
