import type { Metadata } from 'next';

export const siteUrl = new URL(process.env.SITE_URL || 'https://propertyworlds.in');
export const areas = ['noida', 'noida-extension', 'gaur-city', 'ghaziabad'];
export const propertyTypes = ['flats', 'commercial', 'shops', 'plots'];
export const displayName = (slug: string) => slug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
export const propertyRoutes = () => areas.flatMap(area => propertyTypes.map(propertyType => ({ area, propertyType })));
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: 'Property World', locale: 'en_IN', type: 'website', images: [{ url: '/images/hero_bg.jpg', alt: 'Property World — real estate in Noida and surrounding areas' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/hero_bg.jpg'] },
  };
}
