import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/assets/scripts/landing/main.ts",
  output: {
    file: "src/assets/scripts/landing/dist/main.min.js",
    format: "iife",
    name: "version",
    plugins: [terser()],
  },
  plugins: [json(), typescript()],
};
