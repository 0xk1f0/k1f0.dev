import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),
  publicDir: './src/public',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      langs: [],
      wrap: true
    }
  },
  integrations: []
});