import { defineConfig } from "vite";

export default defineConfig({
    root: ".",
    base: "/",
    build: {
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
                competitor: "competitor-analysis.html",
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
});
