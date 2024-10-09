import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'QuantaJS',
            fileName: (format) => `quanta.${format}.js`,
            formats: ['es', 'cjs', 'umd'],
        },
        sourcemap: true,
        outDir: 'dist',
    },
    plugins: [
        eslintPlugin(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
        }),
    ],
});
