import Link from 'next/link';
import InventoryBrowser from '@/components/InventoryBrowser';
import { getInventory } from '@/data/inventory-feed';
import { pageMetadata } from '@/utils/site';
import './inventory.css';

export const metadata = pageMetadata('Available Properties', 'Browse currently available flats, commercial spaces, shops and plots in Noida, Noida Extension, Gaur City and Ghaziabad. Contact Property World for details.', '/inventory');

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const { listings, state } = await getInventory();
  return (
    <>
      <div className="inventory-header"><div className="container"><nav aria-label="Breadcrumb"><Link href="/">Home</Link> / Available properties</nav><p className="eyebrow">CURRENT OPPORTUNITIES</p><h1>Explore available properties.</h1><p>Discover spaces across Noida and Ghaziabad. See something that fits? Get in touch for full details and a viewing.</p></div></div>
      <div className="container inventory-main"><InventoryBrowser listings={listings} state={state} /></div>
    </>
  );
}
