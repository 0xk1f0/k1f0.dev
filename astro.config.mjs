import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import deno from "@deno/astro-adapter";

export default defineConfig({
    publicDir: "./src/public",
    output: "server",
    adapter: deno({
        hostname: "0.0.0.0",
        port: 80
    }),
    prefetch: {
        defaultStrategy: "viewport",
    },
    vite: { plugins: [tailwindcss()] },
});
