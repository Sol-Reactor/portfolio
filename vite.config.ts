import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { education } from './src/data/education';
import { profile } from './src/data/profile';

/**
 * The public address, for link previews, the canonical URL and the sitemap.
 * VITE_SITE_URL wins (set it once you have a custom domain); otherwise Vercel's
 * production domain is used automatically. Locally neither exists and these tags are skipped.
 */
function siteUrl(env: Record<string, string>): string {
  const url = env.VITE_SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  return url.replace(/\/+$/, '');
}

function siteMeta(url: string): Plugin {
  const parts = profile.location.split(',').map((p) => p.trim());
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.brand,
    jobTitle: profile.title,
    ...(url && { url, image: `${url}/me.jpg` }),
    ...(profile.email && { email: `mailto:${profile.email}` }),
    address: { '@type': 'PostalAddress', addressLocality: parts.at(-2), addressCountry: parts.at(-1) },
    ...(education[0] && { affiliation: { '@type': 'CollegeOrUniversity', name: education[0].institution } }),
    knowsAbout: profile.heroStack,
    sameAs: Object.values(profile.socials).filter(Boolean),
  };

  return {
    name: 'site-meta',
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(person), injectTo: 'head' },
      ];
      if (url) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${url}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${url}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${url}/og-image.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${url}/og-image.png` }, injectTo: 'head' },
        );
      }
      return tags;
    },
    generateBundle() {
      const robots = `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (url) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), siteMeta(siteUrl(loadEnv(mode, '.', '')))],
  build: {
    target: 'es2022',
  },
}));
