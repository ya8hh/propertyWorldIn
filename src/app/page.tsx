import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Building2, Store, LandPlot, BriefcaseBusiness } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/utils/site';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import './page.css';

export const metadata = pageMetadata('Real Estate in Noida & Ghaziabad | Property World', 'Buy, sell or rent flats, commercial spaces, shops and plots with Dinesh Pal. 20+ years of local real estate experience across Noida and Ghaziabad.', '/');
const icons = [Building2, BriefcaseBusiness, Store, LandPlot];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Property World', url: siteUrl.href,
        telephone: '+919953465067', email: 'dineshsaya@gmail.com', image: new URL('/images/dinesh.jpg', siteUrl).href,
        areaServed: ['Noida', 'Noida Extension', 'Gaur City', 'Ghaziabad'],
      }).replace(/</g, '\\u003c') }} />
      <section className="hero-section">
        <Image src="/images/hero_bg.jpg" alt="" fill preload sizes="100vw" className="hero-background" />
        <div className="container hero-container">
          <div className="hero-content flex flex-col justify-center">
            <p className="eyebrow hero-eyebrow">PROPERTY WORLD · NOIDA & BEYOND</p>
            <h1 className="mb-4 hero-title">A place to belong.<br /><em>A partner you trust.</em></h1>
            <p className="hero-subtitle mb-8">
              20+ years of real-estate experience helping people buy, sell and rent properties across Noida, Noida Extension, Gaur City and Ghaziabad.
            </p>
            <div className="hero-actions flex gap-4">
              <Link href="/inventory" className="btn btn-light">View Available Properties</Link>
              <a href="#contact-form" className="btn btn-outline-light">Talk to Dinesh</a>
            </div>
            <div className="hero-proof"><strong>20+ <span>years of experience</span></strong><span className="proof-divider" /><strong>4 <span>local markets</span></strong></div>
          </div>
          <div className="hero-form" id="contact-form">
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      <section id="featured" className="categories-section section-padding">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">SPACE FOR YOUR NEXT CHAPTER</p><h2>Find your kind of property.</h2></div><p>From your first home to your next investment.</p></div>
          <div className="grid grid-4 gap-6">
            {['Flats', 'Commercial', 'Shops', 'Plots'].map((cat, index) => { const Icon = icons[index]; return (
              <Link href={`/noida/${cat.toLowerCase()}`} key={cat} className="card category-card text-center">
                <Icon size={30} strokeWidth={1.3} aria-hidden="true" /><h3 className="mb-2">{cat}</h3>
                <p>Explore {cat.toLowerCase()} properties</p><ArrowUpRight className="card-arrow" size={20} aria-hidden="true" />
              </Link>
            ); })}
          </div>
        </div>
      </section>

      <section className="areas-section section-padding bg-alt">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">ROOTED IN THE NEIGHBOURHOOD</p><h2>Local insight. A wider choice.</h2></div><p>Explore the places we know best.</p></div>
          <div className="grid grid-4 gap-6">
            {['Noida', 'Noida Extension', 'Gaur City', 'Ghaziabad'].map((area) => (
              <Link href={`/${area.toLowerCase().replaceAll(" ", "-")}/flats`} key={area} className="card area-card">
                <h3 className="mb-2">{area}</h3>
                <p>Explore properties <span aria-hidden="true">↗</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="broker-section section-padding">
        <div className="container broker-container">
          <div className="broker-image">
            <Image src="/images/dinesh.jpg" alt="Dinesh Pal, your local Property World advisor" fill sizes="(max-width: 767px) 100vw, 380px" />
          </div>
          <div className="broker-content">
            <p className="eyebrow">MEET YOUR PROPERTY ADVISOR</p><h2 className="mb-4">Local knowledge.<br />Real experience.</h2><h3 className="mb-4">Dinesh Pal</h3>
            <p className="mb-6" style={{ fontSize: '1.125rem' }}>
              With more than 20 years in real estate, Dinesh Pal helps buyers, sellers and renters navigate property decisions across the Noida and surrounding markets.
            </p>
            <a href="#contact-form" className="btn btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
