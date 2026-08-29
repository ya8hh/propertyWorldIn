import LeadCaptureForm from '@/components/LeadCaptureForm';
import { notFound } from 'next/navigation';

const validAreas = ['noida', 'noida-extension', 'gaur-city', 'ghaziabad'];
const validTypes = ['flats', 'commercial', 'shops', 'plots'];

export async function generateMetadata({ params }: { params: Promise<{ area: string; propertyType: string }> }) {
  const { area, propertyType } = await params;
  const areaName = area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const typeName = propertyType.charAt(0).toUpperCase() + propertyType.slice(1);

  return {
    title: `${typeName} in ${areaName} | Property World`,
    description: `Find the best ${propertyType} in ${areaName}. 20+ years of trusted local real estate experience with Dinesh Pal.`,
  };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ area: string; propertyType: string }>;
}) {
  const resolvedParams = await params;
  
  if (!validAreas.includes(resolvedParams.area) || !validTypes.includes(resolvedParams.propertyType)) {
    notFound();
  }

  const areaName = resolvedParams.area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const typeName = resolvedParams.propertyType.charAt(0).toUpperCase() + resolvedParams.propertyType.slice(1);

  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)' }}>
      <div className="grid grid-2 gap-16" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="mb-4">Find the Best {typeName} in {areaName}</h1>
          <p className="mb-8" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            We have 20+ years of local expertise helping buyers and investors find verified {resolvedParams.propertyType} in {areaName}. Let Dinesh Pal guide you to the perfect property.
          </p>
          <ul className="mb-8" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontWeight: 500 }}>
            <li>✓ Trusted Local Brokerage</li>
            <li>✓ Direct Negotiations</li>
            <li>✓ Personalized Site Visits</li>
          </ul>
        </div>
        <div className="campaign-form">
          <LeadCaptureForm />
        </div>
      </div>
    </div>
  );
}
