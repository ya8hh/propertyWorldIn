export function generateWhatsAppLink(phone: string, text: string) {
  // Ensure the phone number has a country code (assuming India +91 for Noida real estate)
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${finalPhone}?text=${encodedText}`;
}

export function parseUtmParams() {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    content: params.get('utm_content') || '',
    term: params.get('utm_term') || '',
  };
}
