import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Sitemap is now handled by src/pages/sitemap.xml.ts (custom endpoint).
// This avoids the Content-Layer URL bug in @astrojs/sitemap that produced
// empty <loc> tags for blog posts using the glob() loader.

export default defineConfig({
  site: 'https://calcquick.online',
  output: 'static',
  redirects: {
    '/password-manager': '/password-generator',
    '/json-formater': '/json-formatter',
    '/pdf-tool-suit': '/pdf-tools',
    '/pdf-manager': '/pdf-splitter',
    '/unit-conveter': '/unit-converter',
  },
  integrations: [
    mdx(),
  ],
});
