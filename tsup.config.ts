// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [ 'src/index.ts' ], // Or 'src/**/*.ts' if you have multiple entry points
  format: ['esm', 'cjs'], // Output both ES Modules and CommonJS
  dts: true, // Generate TypeScript declaration files (.d.ts)
  splitting: true, // Enable code splitting for better tree-shaking
  sourcemap: true, // Generate sourcemaps for easier debugging
  clean: true, // Clean the 'dist' folder before each build
  minify: true, // Minify the output for production builds
  banner: {
    js: `/* eslint-disable */
//
// Copyright (c) 2025 Paál Gyula
// LGPL-3.0-or-later
//`,
  },
  external: ['react', 'react-dom', 
    '@mui/material', '@emotion/styled', 
    'react-router-dom', 'formik', '@tanstack/react-table',
    '@mui/icons-material',
    '@emotion/react',
  ], // Mark React and ReactDOM as external
  // esbuildOptions(options, context) {
  //   // Optional: Customize esbuild options further
  //   // For example, if you want to keep the directory structure:
  //   options.outbase = './src';
  // },
  // outExtension({ format }) {
  //   // Optional: Customize output file extensions
  //   return {
  //     js: `.${format}.js`,
  //   };
  // },
});