import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
    publicDir: "./src/public",
    integrations: [tailwind()],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    prefetch: {
        defaultStrategy: "viewport",
    },
});
