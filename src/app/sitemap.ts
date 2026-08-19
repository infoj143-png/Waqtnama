import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

  const cities = [
    'karachi-pakistan',
    'lahore-pakistan',
    'islamabad-pakistan',
    'rawalpindi-pakistan',
    'peshawar-pakistan',
    'multan-pakistan',
    'quetta-pakistan',
    'mecca-saudi-arabia',
    'medina-saudi-arabia',
    'riyadh-saudi-arabia',
    'dubai-uae',
    'london-uk',
    'new-york-usa',
    'toronto-canada',
    'istanbul-turkey',
    'sydney-australia',
  ];

  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/${city}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...cityEntries,
  ];
}
