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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Dinesh, I'm looking to ${formData.requirement} a ${formData.propertyType} in ${formData.location}.
My budget is ${formData.budget || 'not specified'}.
Name: ${formData.name}
Phone: ${formData.phone}
${utm.source ? `Source: ${utm.source}` : ''}`;

    const link = generateWhatsAppLink('9953465067', text);
    window.open(link, '_blank');
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
            placeholder="Enter your mobile number" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary mt-8">
          Get Property Options
        </button>
      </form>
    </div>
  );
}
