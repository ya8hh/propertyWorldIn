import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass" aria-label="Main navigation">
      <div className="container navbar-container">
        <Link href="/" className="logo">
          Property World
        </Link>
        <div className="nav-links">
          <Link href="/inventory">Available Properties</Link>
          <Link href="/noida/flats">Flats</Link>
          <Link href="/#about">About</Link>
        </div>
        <div className="nav-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ThemeToggle />
          <Link href="/#contact-form" className="btn btn-primary">Enquire Now</Link>
        </div>
      </div>
    </nav>
  );
}
