import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "./dist",
  target: "es2015",
  splitting: false,
  minify: true,
  clean: true,
});
