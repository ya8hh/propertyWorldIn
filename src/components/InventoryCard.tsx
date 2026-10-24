import Image from 'next/image';
import '@/app/inventory/inventory.css';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Listing } from '@/data/inventory';
import { displayName } from '@/utils/site';
import { imageSource } from '@/utils/inventory-media';

export default function InventoryCard({ listing }: { listing: Listing }) {
  return (
    <article className="inventory-card">
      {listing.images?.[0] && <Link href={`/inventory/${listing.slug}`} className="inventory-card-image" aria-label={`View ${listing.title}`}>
        <Image src={imageSource(listing.images[0])} alt={listing.title} unoptimized={listing.images[0].startsWith('https://')} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      </Link>}
      <div className="inventory-card-content">
        <div className="inventory-card-kicker"><span>{listing.purpose === 'Buy' ? 'For sale' : 'For rent'}</span><span>{displayName(listing.propertyType)}</span></div>
        <h3><Link href={`/inventory/${listing.slug}`}>{listing.title}</Link></h3>
        <p className="inventory-location"><MapPin size={15} aria-hidden="true" />{listing.locality}, {displayName(listing.area)}</p>
        <div className="inventory-facts">
          {listing.bedrooms !== undefined && <span>{listing.bedrooms} bedrooms</span>}
          {listing.size && <span>{listing.size}</span>}
        </div>
        <Link className="inventory-details" href={`/inventory/${listing.slug}`}>View details <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
