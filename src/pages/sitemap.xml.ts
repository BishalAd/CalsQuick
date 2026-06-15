// src/pages/sitemap.xml.ts
// Fully custom sitemap — avoids all @astrojs/sitemap Content-Layer URL bugs.
// Includes XSL stylesheet reference for beautiful browser rendering.

import type { APIRoute } from 'astro';

export const prerender = true;

const SITE = 'https://calcquick.online';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const entries: SitemapEntry[] = [
  // ── Homepage ──────────────────────────────────────────────────────────────
  {
    url:        `${SITE}/`,
    lastmod:    '2026-06-12',
    changefreq: 'daily',
    priority:   1.0,
  },

  // ── Calculators ──────────────────────────────────────────────────────────
  {
    url:        `${SITE}/bmi-calculator/`,
    lastmod:    '2026-06-12',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/calorie-calculator/`,
    lastmod:    '2026-06-12',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/age-calculator/`,
    lastmod:    '2026-06-12',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/tip-calculator/`,
    lastmod:    '2026-06-12',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/online-ruler/`,
    lastmod:    '2026-06-13',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/mortgage-calculator/`,
    lastmod:    '2026-06-13',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/aspect-ratio-calculator/`,
    lastmod:    '2026-06-13',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/loan-emi-calculator/`,
    lastmod:    '2026-06-13',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/what-is-my-ip/`,
    lastmod:    '2026-06-13',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/bmr-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/concrete-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/water-intake-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/percentage-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/tdee-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/compound-interest-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/credit-card-payoff-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/gpa-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },
  {
    url:        `${SITE}/pregnancy-due-date-calculator/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.9,
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  {
    url:        `${SITE}/blog/`,
    lastmod:    '2026-06-15',
    changefreq: 'weekly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/understanding-bmi/`,
    lastmod:    '2026-06-01',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/daily-calorie-needs-guide/`,
    lastmod:    '2026-06-05',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/tipping-culture-worldwide/`,
    lastmod:    '2026-06-08',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/how-age-calculator-works/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/bmr-and-tdee-explained/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/daily-water-intake-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/mortgage-payment-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/loan-emi-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/online-screen-ruler-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/aspect-ratio-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/what-is-my-ip-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/concrete-calculator-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/percentage-calculator-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/tdee-calculator-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/compound-interest-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/credit-card-payoff-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/gpa-calculator-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },
  {
    url:        `${SITE}/blog/pregnancy-due-date-guide/`,
    lastmod:    '2026-06-15',
    changefreq: 'monthly',
    priority:   0.7,
  },

  // ── Supporting ───────────────────────────────────────────────────────────
  {
    url:        `${SITE}/about/`,
    lastmod:    '2026-06-10',
    changefreq: 'monthly',
    priority:   0.5,
  },
  {
    url:        `${SITE}/contact/`,
    lastmod:    '2026-06-10',
    changefreq: 'monthly',
    priority:   0.5,
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  {
    url:        `${SITE}/privacy-policy/`,
    lastmod:    '2026-06-10',
    changefreq: 'yearly',
    priority:   0.3,
  },
  {
    url:        `${SITE}/terms/`,
    lastmod:    '2026-06-10',
    changefreq: 'yearly',
    priority:   0.3,
  },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = () => {
  const urlNodes = entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${escapeXml(e.url)}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n` +
    `<urlset\n` +
    `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n` +
    `  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n` +
    `    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n` +
    `${urlNodes}\n` +
    `</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
};
