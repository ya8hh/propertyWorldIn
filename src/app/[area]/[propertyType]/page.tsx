import LeadCaptureForm from '@/components/LeadCaptureForm';

import { notFound } from 'next/navigation';

import Link from 'next/link';
import { areas, propertyTypes, propertyRoutes, displayName, pageMetadata } from '@/utils/site';

export const dynamicParams = false;
export const generateStaticParams = propertyRoutes;

export async function generateMetadata({ params }: { params: Promise<{ area: string; propertyType: string }> }) {
  const { area, propertyType } = await params;
  if (!areas.includes(area) || !propertyTypes.includes(propertyType)) notFound();
  return pageMetadata(`${displayName(propertyType)} in ${displayName(area)}`, `Explore ${propertyType} in ${displayName(area)} with Dinesh Pal. Get local guidance on buying, selling and renting from Property World.`, `/${area}/${propertyType}`);
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ area: string; propertyType: string }>;
}) {
  const resolvedParams = await params;
  
  if (!areas.includes(resolvedParams.area) || !propertyTypes.includes(resolvedParams.propertyType)) {
    notFound();
  }

  const areaName = resolvedParams.area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const typeName = resolvedParams.propertyType.charAt(0).toUpperCase() + resolvedParams.propertyType.slice(1);

  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <nav aria-label="Breadcrumb" className="mb-8"><Link href="/">Home</Link> / {areaName} / {typeName}</nav>
      <div className="grid grid-2 gap-16" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="mb-4">Explore {typeName} in {areaName}</h1>
          <p className="mb-8" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            We have 20+ years of local expertise helping buyers and investors explore {resolvedParams.propertyType} in {areaName}. Let Dinesh Pal guide you to a property that fits their needs.
          </p>
          <ul className="mb-8" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontWeight: 500 }}>
            <li>✓ Trusted Local Brokerage</li>
            <li>✓ Direct Negotiations</li>
            <li>✓ Personalized Site Visits</li>
          </ul>
        </div>
        <div className="campaign-form" id="contact-form">
          <LeadCaptureForm initialLocation={areaName} initialPropertyType={({ flats: "Flat", commercial: "Commercial", shops: "Shop", plots: "Plot" } as Record<string, string>)[resolvedParams.propertyType]} />
        </div>
      </div>
      <section style={{ paddingTop: 64 }}>
        <h2 className="mb-6">Currently available {typeName.toLowerCase()} in {areaName}</h2>
        <p className="mb-6">See current availability or ask us about more options in {areaName}.</p>
        <Link href="/inventory" className="btn btn-secondary">Browse available properties</Link>
      </section>
      <section style={{ paddingTop: 64 }}>
        <h2 className="mb-6">Explore more property options</h2>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          {propertyTypes.filter(type => type !== resolvedParams.propertyType).map(type => <Link className="btn btn-secondary" key={type} href={`/${resolvedParams.area}/${type}`}>{displayName(type)} in {areaName}</Link>)}
          {areas.filter(area => area !== resolvedParams.area).map(area => <Link className="btn btn-secondary" key={area} href={`/${area}/${resolvedParams.propertyType}`}>{typeName} in {displayName(area)}</Link>)}
        </div>
      </section>
    </div>
  );
}
