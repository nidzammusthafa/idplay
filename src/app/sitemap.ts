import { MetadataRoute } from 'next';
import { PACKAGE_PLANS } from '../constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.idplay.it.com';

  // Static pages
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/harga`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cek-jangkauan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic package pages
  const packageRoutes = PACKAGE_PLANS.flatMap((plan) => {
    const routes: MetadataRoute.Sitemap = [];
    const periodMap: { [key: string]: string } = {
      monthly: 'bulanan',
      sixMonths: 'semesteran',
      twelveMonths: 'tahunan',
    };

    (Object.keys(plan.prices) as Array<keyof typeof plan.prices>).forEach((periodKey) => {
      if (plan.prices[periodKey] && plan.prices[periodKey].price !== '-') {
        const slug = `${plan.speed}-mbps-${periodMap[periodKey]}`;
        routes.push({
          url: `${baseUrl}/paket/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });

    return routes;
  });

  return [...staticRoutes, ...packageRoutes];
}
