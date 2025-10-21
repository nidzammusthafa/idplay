import { PACKAGE_PLANS } from "@/lib/constants";
import { PROMO_PACKAGE_PLANS } from "@/lib/promo-constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.idplay.it.com";

  // Static pages
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/harga`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cek-jangkauan`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/promo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ];

  // Dynamic package pages
  const packageRoutes = PACKAGE_PLANS.flatMap((plan) => {
    const routes: MetadataRoute.Sitemap = [];
    const periodMap: { [key: string]: string } = {
      monthly: "bulanan",
      sixMonths: "semesteran",
      twelveMonths: "tahunan",
    };

    (Object.keys(plan.prices) as Array<keyof typeof plan.prices>).forEach(
      (periodKey) => {
        if (plan.prices[periodKey] && plan.prices[periodKey].price !== "-") {
          const slug = `${plan.speed}-mbps-${periodMap[periodKey]}`;
          routes.push({
            url: `${baseUrl}/paket/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          });
        }
      }
    );

    return routes;
  });

  // Dynamic promo package pages
  const periodMap: { [key: string]: string } = {
    sixMonths: "6-bulan",
    twelveMonths: "12-bulan",
  };

  const promoRoutes = PROMO_PACKAGE_PLANS.flatMap((plan) => {
    const routes: MetadataRoute.Sitemap = [];

    (Object.keys(plan.prices) as Array<keyof typeof plan.prices>).forEach(
      (periodKey) => {
        if (plan.prices[periodKey] && plan.prices[periodKey].price !== "-") {
          const slug = `${plan.speed}-mbps-${periodMap[periodKey]}`;
          routes.push({
            url: `${baseUrl}/promo/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.75,
          });
        }
      }
    );

    return routes;
  });

  return [...staticRoutes, ...packageRoutes, ...promoRoutes];
}
