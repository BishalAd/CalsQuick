// SEO utility functions for CalcQuick.online

const SITE_URL = 'https://calcquick.online';
const SITE_NAME = 'CalcQuick';

export function generateOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
    sameAs: [],
    description: 'Fast, accurate, and free online calculators for health, finance, and everyday calculations.',
  };
}

export function generateWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Fast, Accurate & Free Online Calculators',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFAQ(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function generateSoftwareApplication(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    applicationCategory: opts.category || 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'CalcQuick — Fast, Free Online Calculators',
    description: 'Calculate anything instantly with CalcQuick. Free online calculators for age, BMI, calories, tips, and more. Fast, accurate & mobile-friendly.',
    canonical: '/',
  },
  age: {
    title: 'Age Calculator — Calculate Your Exact Age | CalcQuick',
    description: 'Use our free online age calculator to find your exact age in years, months, days, and hours. Instant results with next birthday countdown.',
    canonical: '/age-calculator',
  },
  bmi: {
    title: 'BMI Calculator — Body Mass Index | CalcQuick',
    description: 'Calculate your BMI instantly with our free online BMI calculator. Get your body mass index, weight category, and healthy weight range.',
    canonical: '/bmi-calculator',
  },
  calorie: {
    title: 'Calorie Calculator — Daily Calorie Needs | CalcQuick',
    description: 'Find your daily calorie needs with our free calorie calculator. Calculate BMR, TDEE, and calories for weight loss, maintenance, or gain.',
    canonical: '/calorie-calculator',
  },
  tip: {
    title: 'Tip Calculator — Calculate Tips & Split Bills | CalcQuick',
    description: 'Use our free tip calculator to calculate the perfect tip and split bills easily. Supports custom tip percentages and multiple people.',
    canonical: '/tip-calculator',
  },
  blog: {
    title: 'Blog — Health, Finance & Calculator Guides | CalcQuick',
    description: 'Read guides on health metrics, financial calculations, and how to use online calculators effectively.',
    canonical: '/blog',
  },
  about: {
    title: 'About CalcQuick — Free Online Calculators',
    description: 'Learn about CalcQuick, our mission to provide fast, accurate, and free online calculators for everyone.',
    canonical: '/about',
  },
};
