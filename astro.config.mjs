import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: deno(),
  publicDir: './src/public',
  experimental: {
    viewTransitions: true
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      langs: [],
      wrap: true,
    },
  },
  integrations: []
});