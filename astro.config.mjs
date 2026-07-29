import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';

const site = 'https://flyingmouselabs.com';

export default defineConfig({
  site,
  integrations: [tailwind(), alpinejs()],
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
