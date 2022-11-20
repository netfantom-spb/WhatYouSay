import path from 'path';
import { fileURLToPath } from 'url';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import babel from '@rollup/plugin-babel';

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';
import zip from 'rollup-plugin-zip';
import scss from 'rollup-plugin-scss';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';

const isProduction = process.env.NODE_ENV === 'production'; //!process.env.ROLLUP_WATCH;
//const manifestFile = isProduction ? 'src/manifest.production.json' : 'src/manifest.development.json';
const manifestFile = 'src/manifest.json';

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename);

export default {
    input: manifestFile,
    output: {
        dir: 'build',
        format: 'es',
        chunkFileNames: path.join('chunks', '[name]-[hash].js'),
        sourcemap: !isProduction
    },
    plugins: [        
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
            __buildDate__: () => JSON.stringify(new Date()),
        }),
        // always put chromeExtension() before other plugins
        chromeExtension(),        
        alias({
            entries: [
                { find: 'react', replacement: 'preact/compat' },
                { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
                { find: 'react-dom', replacement: 'preact/compat' },
                { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
            ]
        }),

        typescript(),

        // babel({
        //     // Do not transpile dependencies
        //     ignore: ['node_modules'],
        //     babelHelpers: 'bundled',
        // }),

        isProduction && strip(),

        // the plugins below are optional

        resolve(),
        commonjs(),

        scss({
            processor: () => postcss(),
            includePaths: [
                path.join(__dirname, '../../node_modules/'),
                'node_modules/'
            ]
        }),
        
        postcss({ minimize: isProduction }),
        isProduction && terser(),

        // copy({
        //     targets: [
        //         { src: 'src/lib/fontawesome/webfonts', dest: 'build/' },
        //     ]
        // }),
        simpleReloader(),
        isProduction && zip({ dir: 'releases' }),        
    ],
};