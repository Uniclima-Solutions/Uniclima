// API Configuration
// Use environment variables for sensitive data

export const API_CONFIG = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },
  googlePlaces: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY || '',
  },
};

export default API_CONFIG;
