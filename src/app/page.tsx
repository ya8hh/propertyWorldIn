import Link from 'next/link';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import './page.css';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content flex flex-col justify-center">
            <h1 className="mb-4 hero-title">Property decisions made simpler.</h1>
            <p className="hero-subtitle mb-8">
              20+ years of real-estate experience helping people buy, sell and rent properties across Noida, Noida Extension, Gaur City and Ghaziabad.
            </p>
            <div className="hero-actions flex gap-4">
              <a href="#featured" className="btn btn-light">Explore Areas</a>
              <a href="tel:9953465067" className="btn btn-outline-light">Talk to Dinesh</a>
            </div>
          </div>
          <div className="hero-form">
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      <section id="featured" className="categories-section section-padding">
        <div className="container">
          <h2 className="text-center mb-8">Property Categories</h2>
          <div className="grid grid-4 gap-6">
            {['Flats', 'Commercial', 'Shops', 'Plots'].map((cat) => (
              <Link href={`/noida/${cat.toLowerCase()}`} key={cat} className="card category-card text-center">
                <h3 className="mb-2">{cat}</h3>
                <p>Explore {cat.toLowerCase()} properties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="areas-section section-padding bg-alt">
        <div className="container">
          <h2 className="text-center mb-8">Areas We Serve</h2>
          <div className="grid grid-4 gap-6">
            {['Noida', 'Noida Extension', 'Gaur City', 'Ghaziabad'].map((area) => (
              <div key={area} className="card area-card">
                <h3 className="mb-2">{area}</h3>
                <p>View properties in {area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="broker-section section-padding">
        <div className="container broker-container">
          <div className="broker-image">
            <img src="/images/dinesh.jpg" alt="Dinesh Pal" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
          </div>
          <div className="broker-content">
            <h2 className="mb-4">Local knowledge. Real experience.</h2>
            <p className="mb-6" style={{ fontSize: '1.125rem' }}>
              With more than 20 years in real estate, Dinesh Pal helps buyers, sellers and renters navigate property decisions across the Noida and surrounding markets.
            </p>
            <a href="https://wa.me/919953465067?text=Hi%20Dinesh,%20I%20would%20like%20to%20discuss%20a%20property%20requirement." className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
