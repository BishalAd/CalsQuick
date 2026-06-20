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
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://calcquick.online',
    ],
    description: 'CalcQuick provides 19+ free, private, browser-based calculators and productivity tools for health, finance, and everyday use. No sign-up, no data collection, no ads that block content.',
    knowsAbout: [
      'BMI Calculator', 'Calorie Calculator', 'Age Calculator', 'BMR Calculator',
      'TDEE Calculator', 'Water Intake Calculator', 'Pregnancy Due Date Calculator',
      'Mortgage Calculator', 'Loan EMI Calculator', 'Tip Calculator', 'GPA Calculator',
      'Currency Converter', 'Online Ruler', 'Word Counter', 'Facebook Caption Styler',
      'Image Size Reducer', 'Pomodoro Timer', 'Countdown Timer', 'Image Cropper',
      'Compound Interest Calculator', 'Credit Card Payoff Calculator', 'Annuity Calculator',
      '401k Calculator', 'Workers Comp Calculator', 'Child Support Calculator', 'RMD Calculator',
      'Overtime Calculator', 'Percentage Calculator', 'Aspect Ratio Calculator', 'Concrete Calculator',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Free Online Calculators & Tools',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'BMI Calculator', url: `${SITE_URL}/bmi-calculator` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Age Calculator', url: `${SITE_URL}/age-calculator` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Calorie Calculator', url: `${SITE_URL}/calorie-calculator` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Word Counter', url: `${SITE_URL}/word-counter` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Pomodoro Timer', url: `${SITE_URL}/pomodoro-timer` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Image Size Reducer', url: `${SITE_URL}/image-size-reducer` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Countdown Timer', url: `${SITE_URL}/countdown-timer` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Image Cropper', url: `${SITE_URL}/image-cropper` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Mortgage Calculator', url: `${SITE_URL}/mortgage-calculator` } },
        { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Currency Converter', url: `${SITE_URL}/currency-converter` } },
      ],
    },
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
    title: 'CalcQuick — 19 Free Online Calculators & Tools',
    description: 'CalcQuick offers 19 free online calculators and tools: BMI, age, calorie, mortgage, word counter, pomodoro timer, image compressor, and more. Fast, private & mobile-friendly.',
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
