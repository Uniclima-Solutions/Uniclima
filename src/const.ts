// Constantes de la aplicación
export const COOKIE_NAME = 'uniclima_session';
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const redirectUri = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/auth/callback`
    : '';
  return `/api/auth/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
};

// Constantes de la tienda
export const STORE_NAME = 'Uniclima';
export const STORE_DESCRIPTION = 'Repuestos de Calderas y Aire Acondicionado';
export const STORE_PHONE = '912 345 678';
export const STORE_EMAIL = 'info@uniclima.es';
export const FREE_SHIPPING_THRESHOLD = 120;
