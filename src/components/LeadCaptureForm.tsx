'use client';

import { useState, useEffect } from 'react';
import { generateWhatsAppLink, parseUtmParams } from '@/utils/helpers';
import './LeadCaptureForm.css';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    requirement: 'Buy',
    propertyType: 'Flat',
    location: 'Noida',
    budget: '',
    name: '',
    phone: '',
  });
  
  const [utm, setUtm] = useState<any>({});

  useEffect(() => {
    setUtm(parseUtmParams());
  }, []);

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
    setSubmitting(true);

    // 1. Build WhatsApp message and open immediately (must happen before any await)
    const text = `Hi Dinesh, I'm looking to ${formData.requirement} a ${formData.propertyType} in ${formData.location}.
My budget is ${formData.budget || 'not specified'}.
Name: ${formData.name}
Phone: ${formData.phone}
${utm.source ? `Source: ${utm.source}` : ''}`;

    const link = generateWhatsAppLink('9953465067', text);
    window.open(link, '_blank');

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
    } catch (_) {
      // Fail silently — don't block the user
    }

    setSubmitting(false);
  };

  return (
    <div className="lead-form-card card">
      <h3 className="mb-4">Find Your Property</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-group flex-col">
          <label>I want to</label>
          <div className="toggle-group">
            {['Buy', 'Rent', 'Sell'].map((req) => (
              <button
                key={req}
                type="button"
                className={`toggle-btn ${formData.requirement === req ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, requirement: req })}
              >
                {req}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group flex-col">
          <label>Property Type</label>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
            <option value="Flat">Flat / Apartment</option>
            <option value="Commercial">Commercial Space</option>
            <option value="Shop">Shop</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        <div className="form-group flex-col">
          <label>Preferred Location</label>
          <select name="location" value={formData.location} onChange={handleChange} required>
            <option value="Noida">Noida</option>
            <option value="Noida Extension">Noida Extension</option>
            <option value="Gaur City">Gaur City</option>
            <option value="Ghaziabad">Ghaziabad</option>
          </select>
        </div>

        <div className="form-group flex-col">
          <label>Budget (Optional)</label>
          <input 
            type="text" 
            name="budget" 
            placeholder="e.g. 50 Lacs, 1 Cr" 
            value={formData.budget} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group flex-col">
          <label>Your Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter your name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group flex-col">
          <label>Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            placeholder="10-digit mobile number" 
            value={formData.phone} 
            onChange={handlePhoneChange}
            maxLength={10}
            inputMode="numeric"
            required 
          />
          {phoneError && (
            <span style={{ color: '#ff453a', fontSize: '0.8rem', marginTop: '4px' }}>
              {phoneError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-8"
          disabled={submitting || formData.phone.length !== 10}
        >
          {submitting ? 'Saving...' : 'Get Property Options'}
        </button>
      </form>
    </div>
  );
}
