/// <reference types="vite/client" />

// @fontsource packages ship CSS only (no type declarations); declare them as
// side-effect modules so TypeScript accepts the imports in main.tsx.
declare module '@fontsource/*'
