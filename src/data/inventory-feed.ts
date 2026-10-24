import { areas, propertyTypes } from '@/utils/site';
import type { Listing } from './inventory';
import { reelEmbed } from '@/utils/inventory-media';

const defaultInventoryCsvUrl = 'https://docs.google.com/spreadsheets/d/1licQnyjd8UaXMPtkDSvAIhgFS1KZ_etqngPimKWRYyE/export?format=csv&gid=0';

type InventoryResult = { listings: Listing[]; state: 'ready' | 'unconfigured' | 'unavailable' };

/** Handles quoted commas, double quotes and newlines in Google Sheets CSV exports. */
export function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const character = csv[i];
    if (character === '"') {
      if (quoted && csv[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (character === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && csv[i + 1] === '\n') i++;
      row.push(cell); if (row.some(value => value.trim())) rows.push(row);
      row = []; cell = '';
    } else cell += character;
  }
  row.push(cell); if (row.some(value => value.trim())) rows.push(row);
  return rows;
}

export function parseInventoryCsv(csv: string): Listing[] {
  const [headers, ...rows] = parseCsv(csv.replace(/^\uFEFF/, ''));
  if (!headers) return [];
  const keys = headers.map(header => header.trim().toLowerCase().replace(/[\s_-]/g, ''));
  const listings: Listing[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const get = (name: string) => (row[keys.indexOf(name.toLowerCase())] ?? '').trim();
    const slug = get('slug').toLowerCase();
    const area = get('area').toLowerCase().replace(/\s+/g, '-');
    const propertyType = get('propertyType').toLowerCase();
    const purpose = get('purpose').toLowerCase();
    const status = get('status').toLowerCase();
    if (status !== 'available' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || seen.has(slug)) continue;
    if (!areas.includes(area) || !propertyTypes.includes(propertyType) || !['buy', 'rent'].includes(purpose)) continue;
    const title = get('title');
    const locality = get('locality');
    const summary = get('summary');
    if (!title || !locality || !summary) continue;
    const bedrooms = Number(get('bedrooms'));
    const images = get('images').split('|').map(value => value.trim()).filter(value => value.startsWith('/images/listings/') || /^https:\/\//i.test(value));
    const reel = get('reel');
    const features = get('features').split('|').map(value => value.trim()).filter(Boolean);
    listings.push({
      slug, title, area: area as Listing['area'], locality,
      propertyType: propertyType as Listing['propertyType'], purpose: purpose === 'buy' ? 'Buy' : 'Rent',
      status: 'available', summary,
      ...(get('size') && { size: get('size') }),
      ...(get('bedrooms') && Number.isInteger(bedrooms) && bedrooms >= 0 && { bedrooms }),
      ...(features.length && { features }), ...(images.length && { images }),
      ...(reelEmbed(reel) && { reel }),
    });
    seen.add(slug);
  }
  return listings;
}

export async function getInventory(): Promise<InventoryResult> {
  const url = process.env.INVENTORY_CSV_URL || defaultInventoryCsvUrl;
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:') throw new Error('Inventory feed must use HTTPS');
    const response = await fetch(parsedUrl, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Inventory feed returned ${response.status}`);
    const csv = await response.text();
    if (!csv.trim()) return { listings: [], state: 'ready' };
    if (csv.length > 2_000_000 || !csv.toLowerCase().includes('slug')) throw new Error('Invalid inventory CSV');
    return { listings: parseInventoryCsv(csv), state: 'ready' };
  } catch (error) {
    console.error('Inventory feed unavailable:', error);
    return { listings: [], state: 'unavailable' };
  }
}
