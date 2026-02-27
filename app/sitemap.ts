import { MetadataRoute } from 'next';
import { cars } from '@/data/cars';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://namplao-usedcars.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
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

  const carRoutes = cars.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...carRoutes];
}
