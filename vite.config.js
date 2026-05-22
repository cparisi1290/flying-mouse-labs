import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  root: ".",
  base: "/",
  build: {
    target: "es2020",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
        blog: "blog-index.html",
        blog_single: "blog-single.html",
        privacy: "privacy-policy.html",
        terms: "terms-of-service.html",
        cookie: "cookie-policy.html",
        disclaimer: "disclaimer.html",
        404: "404.html",
      },
    },
  },
  server: {
    host: true, // This will expose to network
    port: 3000,
    open: true,
    cors: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
  plugins: [
    tailwindcss(),
    sitemap({
      hostname: "https://flyingmouselabs.com",
    }),
  ],
});
