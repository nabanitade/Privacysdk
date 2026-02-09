import { UserProfile } from '../types';

const PARTNER_API_URL = "https://api.marketing-partner.com/v1/sync";

export async function syncWithPartner(user: UserProfile) {
  // VIOLATION 5: Third-party sharing of sensitive data without explicit consent
  // Sharing health data and financial info with a marketing partner
  try {
    const payload = {
      external_id: user.id,
      email: user.email,
      health_score: user.healthData?.score,
      credit_bracket: user.financialInfo?.bracket,
      segments: user.interests
    };

    const response = await fetch(PARTNER_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PARTNER_KEY}`
      },
      body: JSON.stringify(payload)
    });

    return response.ok;
  } catch (e) {
    console.error("Partner sync failed", e);
    return false;
  }
}