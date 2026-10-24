import Link from 'next/link';
import { areas, propertyTypes, displayName } from '@/utils/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3>Property World</h3>
          <p>20+ years of local real-estate experience in Noida and surrounding areas.</p>
        </div>
        <div className="footer-col">
          <h4>Areas</h4>
          {areas.map(area => <p key={area}><Link href={`/${area}/flats`}>{displayName(area)}</Link></p>)}
        </div>
        <div className="footer-col">
          <h4>Properties</h4>
          <p><Link href="/inventory">Available properties</Link></p>
          {propertyTypes.map(type => <p key={type}><Link href={`/noida/${type}`}>{displayName(type)}</Link></p>)}
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Dinesh Pal</p>
          <p><a href="tel:9953465067">9953465067</a></p>
          <p><a href="mailto:dineshsaya@gmail.com">dineshsaya@gmail.com</a></p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Property World. All rights reserved.</p>
      </div>
    </footer>
  );
}
