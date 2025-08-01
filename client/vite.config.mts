import react from '@vitejs/plugin-react';
import {defineConfig, loadEnv} from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import basicSsl from '@vitejs/plugin-basic-ssl';
import * as path from "node:path";

// https://vitejs.dev/config/
export default ({mode}) => {
    // Make Vite env vars available.
    // https://stackoverflow.com/a/66389044
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    const isHttps = () => process.env.VITE_HTTPS === 'true';

    return defineConfig({
        esbuild: {
            // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
            logOverride: {'this-is-undefined-in-esm': 'silent'},
        },
        optimizeDeps: {
            esbuildOptions: {
                target: 'es2020',
            },
        },
        plugins: [react(), tsconfigPaths(), svgr(), isHttps() && basicSsl()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            host: '127.0.0.1',
            proxy: {
                '/actuator': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
                '/api': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
                '/approvals': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
                '/callback': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
                '/icons': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
                '/graphql': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
                '/webhooks': {
                    changeOrigin: true,
                    secure: false,
                    target: 'http://localhost:9555',
                    // rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        test: {
            coverage: {
                exclude: ['.vitest/', 'node_modules/', 'src/middleware', '**/*.test.tsx'],
                reporter: ['html', 'lcov', 'text'],
            },
            environment: 'jsdom',
            globals: true,
            setupFiles: '.vitest/setup.ts',
        },
    });
};
