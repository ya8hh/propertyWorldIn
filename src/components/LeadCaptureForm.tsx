'use client';

import { useState } from 'react';
import { generateWhatsAppLink, parseUtmParams } from '@/utils/helpers';
import './LeadCaptureForm.css';

export default function LeadCaptureForm({ initialLocation = "Noida", initialPropertyType = "Flat", initialRequirement = "Buy", listingTitle }: { initialLocation?: string; initialPropertyType?: string; initialRequirement?: string; listingTitle?: string }) {
  const [formData, setFormData] = useState({
    requirement: initialRequirement,
    propertyType: initialPropertyType,
    location: initialLocation,
    budget: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyYxmU_mnPA3u4q50DbMv2yxgDZvOWJR4M7hu2wwhC1quooLyoEZNxg6WqNeZaTVs8X/exec';

  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: digits });
    if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || formData.phone.length !== 10) return;
    const utm = parseUtmParams();
    setSubmitting(true);

    // 1. Build WhatsApp message and open immediately (must happen before any await)
    const text = `Hi Dinesh, ${listingTitle ? `I'm interested in ${listingTitle}.\n` : ''}I'm looking to ${formData.requirement} a ${formData.propertyType} in ${formData.location}.
My budget is ${formData.budget || 'not specified'}.
Name: ${formData.name}
Phone: ${formData.phone}
${utm.source ? `Source: ${utm.source}` : ''}`;

    const link = generateWhatsAppLink('9953465067', text);
    window.open(link, '_blank', 'noopener,noreferrer');

    // 2. Save lead to Google Sheet silently in background
    try {
      const params = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        requirement: formData.requirement,
        propertyType: formData.propertyType,
        location: formData.location,
        budget: formData.budget,
        utm_source: utm.source || 'direct',
        utm_medium: utm.medium || '',
        utm_campaign: utm.campaign || '',
      });
      await fetch(`${SHEET_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });
    } catch {
      // Fail silently — don't block the user
    }

    setSubmitting(false);
  };

  return (
    <div className="lead-form-card card">
      <p className="form-eyebrow">LET’S FIND YOUR NEXT MOVE</p><h2 className="mb-4">Find your property</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-group flex-col">
          <span className="field-label">I want to</span>
          <div className="toggle-group">
            {['Buy', 'Rent', 'Sell'].map((req) => (
              <button
                key={req}
                type="button"
                aria-pressed={formData.requirement === req}
                className={`toggle-btn ${formData.requirement === req ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, requirement: req })}
              >
                {req}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group flex-col">
          <label htmlFor="propertyType">Property Type</label>
          <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} required>
            <option value="Flat">Flat / Apartment</option>
            <option value="Commercial">Commercial Space</option>
            <option value="Shop">Shop</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        <div className="form-group flex-col">
          <label htmlFor="location">Preferred Location</label>
          <select id="location" name="location" value={formData.location} onChange={handleChange} required>
            <option value="Noida">Noida</option>
            <option value="Noida Extension">Noida Extension</option>
            <option value="Gaur City">Gaur City</option>
            <option value="Ghaziabad">Ghaziabad</option>
          </select>
        </div>

        <div className="form-group flex-col">
          <label htmlFor="budget">Budget (Optional)</label>
          <input
            type="text"
            id="budget" name="budget"
            placeholder="e.g. 50 Lacs, 1 Cr"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div className="form-group flex-col">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            autoComplete="name" id="name" name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group flex-col">
          <label htmlFor="phone">Phone Number</label>
          <input
            autoComplete="tel-national"
            pattern="[0-9]{10}"
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? "phone-error" : undefined}
            type="tel"
            id="phone" name="phone"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handlePhoneChange}
            maxLength={10}
            inputMode="numeric"
            required
          />
          {phoneError && (
            <span id="phone-error" role="status" style={{ color: '#ff453a', fontSize: '0.8rem', marginTop: '4px' }}>
              {phoneError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-8"
          disabled={submitting || formData.phone.length !== 10}
        >
          {submitting ? 'Saving...' : 'Continue on WhatsApp ↗'}
        </button>
        <p className="form-note">Your details are shared with Property World for your enquiry. Continue to WhatsApp to send your message.</p>
      </form>
    </div>
  );
}
