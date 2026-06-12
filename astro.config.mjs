import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const SITE = 'https://calcquick.online';

/**
 * Priority / changefreq strategy:
 *
 *  Priority 1.0  → homepage (highest authority, crawled most often)
 *  Priority 0.9  → calculator tools (core product pages, frequently visited)
 *  Priority 0.7  → blog index + individual posts (content, less time-sensitive)
 *  Priority 0.5  → about / contact (supporting pages)
 *  Priority 0.3  → legal pages (privacy, terms — low crawl urgency)
 *  Excluded       → 404 page (never canonical)
 */

const PAGE_META = {
  // ── Core ──────────────────────────────────────────────────────────────────
  [`${SITE}/`]: {
    priority: 1.0,
    changefreq: 'daily',
    lastmod: '2026-06-12',
  },

  // ── Calculators ──────────────────────────────────────────────────────────
  [`${SITE}/bmi-calculator/`]: {
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-06-12',
  },
  [`${SITE}/calorie-calculator/`]: {
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-06-12',
  },
  [`${SITE}/age-calculator/`]: {
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-06-12',
  },
  [`${SITE}/tip-calculator/`]: {
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-06-12',
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  [`${SITE}/blog/`]: {
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: '2026-06-08',
  },
  [`${SITE}/blog/understanding-bmi/`]: {
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-06-01',
  },
  [`${SITE}/blog/daily-calorie-needs-guide/`]: {
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-06-05',
  },
  [`${SITE}/blog/tipping-culture-worldwide/`]: {
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: '2026-06-08',
  },

  // ── Supporting pages ──────────────────────────────────────────────────────
  [`${SITE}/about/`]: {
    priority: 0.5,
    changefreq: 'monthly',
    lastmod: '2026-06-10',
  },
  [`${SITE}/contact/`]: {
    priority: 0.5,
    changefreq: 'monthly',
    lastmod: '2026-06-10',
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  [`${SITE}/privacy-policy/`]: {
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: '2026-06-10',
  },
  [`${SITE}/terms/`]: {
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: '2026-06-10',
  },
};

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    sitemap({
      // Exclude pages that should never appear in search engines
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/draft'),

      // Per-page metadata: priority, changefreq, lastmod
      serialize: (item) => {
        const meta = PAGE_META[item.url];
        if (meta) {
          item.priority   = meta.priority;
          item.changefreq = meta.changefreq;
          item.lastmod    = meta.lastmod;
        } else {
          // Sensible defaults for any future pages not yet listed above
          item.priority   = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
    mdx(),
  ],
});
