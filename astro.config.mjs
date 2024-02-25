import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  publicDir: "./src/public",
  site: 'https://blog.k1f0.dev',
  integrations: [tailwind(), sitemap()]
});
