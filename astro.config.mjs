import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import deno from "@astrojs/deno";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: deno(),
    publicDir: "./src/public",
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "github-dark-dimmed",
        },
    },
    image: {
        service: {
            entrypoint: "./src/components/void.ts",
        }
    },
    integrations: [svelte(), tailwind()],
});
