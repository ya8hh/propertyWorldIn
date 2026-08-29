import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link href="/" className="logo">
          Property World
        </Link>
        <div className="nav-links">
          <Link href="/noida/flats">Flats</Link>
          <Link href="/noida/commercial">Commercial</Link>
          <Link href="/#about">About</Link>
        </div>
        <div className="nav-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ThemeToggle />
          <a href="tel:9953465067" className="btn btn-primary">Call Now</a>
        </div>
      </div>
    </nav>
  );
}
