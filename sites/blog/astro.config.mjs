import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
    publicDir: "./src/public",
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    prefetch: {
        defaultStrategy: "viewport",
    },
    vite: { plugins: [tailwindcss()] },
});
