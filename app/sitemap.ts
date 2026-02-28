import { MetadataRoute } from 'next';
import { getCars } from '@/lib/shopify';

const baseUrl = 'https://www.namplaocars.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let routes = [
    '',
    '/cars',
    '/sell-car',
    '/promotion',
    '/credit-check',
    '/payment-calculator',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const cars = await getCars();
    const carRoutes = cars.map((car) => ({
      url: `${baseUrl}/cars/${car.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
    
    return [...routes, ...carRoutes];
  } catch (error) {
    console.error('Failed to generate car sitemap:', error);
    return routes;
  }
}
