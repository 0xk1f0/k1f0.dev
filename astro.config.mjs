import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
    publicDir: "./src/public",
    site: "https://blog.k1f0.dev",
    integrations: [tailwind()],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    experimental: {
        serverIslands: true,
    },
    prefetch: {
        defaultStrategy: "viewport",
    },
});
