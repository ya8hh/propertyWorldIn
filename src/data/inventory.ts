/** Public fields accepted from the Google Sheets CSV feed. Prices are deliberately excluded. */
export type Listing = {
  slug: string;
  title: string;
  area: 'noida' | 'noida-extension' | 'gaur-city' | 'ghaziabad';
  locality: string;
  propertyType: 'flats' | 'commercial' | 'shops' | 'plots';
  purpose: 'Buy' | 'Rent';
  status: 'available';
  size?: string;
  bedrooms?: number;
  summary: string;
  features?: string[];
  images?: string[];
};
