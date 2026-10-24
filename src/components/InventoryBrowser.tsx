'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Listing } from '@/data/inventory';
import { displayName } from '@/utils/site';
import InventoryCard from './InventoryCard';

export default function InventoryBrowser({ listings, state }: { listings: Listing[]; state: "ready" | "unconfigured" | "unavailable" }) {
  const [area, setArea] = useState('all');
  const [type, setType] = useState('all');
  const [purpose, setPurpose] = useState('all');
  const filtered = listings.filter(listing =>
    (area === 'all' || listing.area === area) &&
    (type === 'all' || listing.propertyType === type) &&
    (purpose === 'all' || listing.purpose === purpose)
  );
  const areaOptions = [...new Set(listings.map(listing => listing.area))];
  const typeOptions = [...new Set(listings.map(listing => listing.propertyType))];

  if (!listings.length) return (
    <div className="inventory-empty">
      <h2>{state === "unavailable" ? "Properties are temporarily unavailable." : "Looking for something specific?"}</h2>
      <p>{state === "unavailable" ? "Please contact us for the latest availability while we restore the property list." : "We’re preparing our current property selection. Tell us what you need and we’ll share available options directly."}</p>
      <Link href="/#contact-form" className="btn btn-primary">Ask about availability</Link>
    </div>
  );

  return (
    <>
      <div className="inventory-filters" aria-label="Filter properties">
        <label>Location<select value={area} onChange={event => setArea(event.target.value)}><option value="all">All locations</option>{areaOptions.map(option => <option key={option} value={option}>{displayName(option)}</option>)}</select></label>
        <label>Property type<select value={type} onChange={event => setType(event.target.value)}><option value="all">All types</option>{typeOptions.map(option => <option key={option} value={option}>{displayName(option)}</option>)}</select></label>
        <label>Looking to<select value={purpose} onChange={event => setPurpose(event.target.value)}><option value="all">Buy or rent</option><option value="Buy">Buy</option><option value="Rent">Rent</option></select></label>
      </div>
      <p className="inventory-count" role="status">{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} available</p>
      {filtered.length ? <div className="inventory-grid">{filtered.map(listing => <InventoryCard key={listing.slug} listing={listing} />)}</div> :
        <div className="inventory-empty"><h2>No properties match these filters.</h2><p>Try another location or type, or contact us for more options.</p><button className="btn btn-secondary" onClick={() => { setArea('all'); setType('all'); setPurpose('all'); }}>Clear filters</button></div>}
    </>
  );
}
