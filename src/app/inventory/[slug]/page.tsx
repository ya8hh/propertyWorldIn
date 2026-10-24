import Image from 'next/image';
import '../inventory.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { getInventory } from '@/data/inventory-feed';
import { displayName, pageMetadata } from '@/utils/site';

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { listings } = await getInventory();
  const listing = listings.find(item => item.slug === slug);
  if (!listing) notFound();
  return pageMetadata(listing.title, `${listing.summary} Explore this ${displayName(listing.propertyType).toLowerCase()} in ${listing.locality}, ${displayName(listing.area)}. Contact Property World for details.`, `/inventory/${slug}`);
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const { listings } = await getInventory();
  const listing = listings.find(item => item.slug === slug);
  if (!listing) notFound();
  const propertyType = ({ flats: 'Flat', commercial: 'Commercial', shops: 'Shop', plots: 'Plot' } as const)[listing.propertyType];
  return (
    <div className="container inventory-detail">
      <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/inventory">Available properties</Link> / {listing.title}</nav>
      <div className="inventory-detail-grid">
        <div>
          {listing.images?.[0] && <div className="inventory-detail-image"><Image src={listing.images[0]} alt={listing.title} unoptimized={listing.images[0].startsWith("https://")} fill sizes="(max-width: 850px) 100vw, 60vw" /></div>}
          <p className="eyebrow">{listing.purpose === 'Buy' ? 'FOR SALE' : 'FOR RENT'} · {displayName(listing.propertyType)}</p>
          <h1>{listing.title}</h1>
          <p className="inventory-detail-location">{listing.locality}, {displayName(listing.area)}</p>
          <div className="inventory-detail-facts">{listing.bedrooms !== undefined && <span>{listing.bedrooms} bedrooms</span>}{listing.size && <span>{listing.size}</span>}</div>
          <p className="inventory-summary">{listing.summary}</p>
          {!!listing.features?.length && <><h2>Property highlights</h2><ul className="inventory-features">{listing.features.map(feature => <li key={feature}>{feature}</li>)}</ul></>}
          {listing.images && listing.images.length > 1 && <div className="inventory-gallery">{listing.images.slice(1).map((src, index) => <div className="inventory-gallery-image" key={src}><Image src={src} alt={`${listing.title}, photo ${index + 2}`} unoptimized={src.startsWith("https://")} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>)}</div>}
        </div>
        <aside id="contact-form"><LeadCaptureForm initialLocation={displayName(listing.area)} initialPropertyType={propertyType} listingTitle={listing.title} initialRequirement={listing.purpose} /></aside>
      </div>
    </div>
  );
}
