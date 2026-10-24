import type { MetadataRoute } from 'next';
import { getInventory } from '@/data/inventory-feed';
import { propertyRoutes, siteUrl } from '@/utils/site';
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { listings } = await getInventory();
  return [{ url: siteUrl.href }, { url: new URL('/inventory', siteUrl).href }, ...listings.map(listing => ({ url: new URL(`/inventory/${listing.slug}`, siteUrl).href })), ...propertyRoutes().map(({ area, propertyType }) => ({ url: new URL(`/${area}/${propertyType}`, siteUrl).href }))];
}
