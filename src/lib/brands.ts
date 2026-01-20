/**
 * Constantes de marcas de calderas y aire acondicionado
 * Centralizado para uso en múltiples componentes
 */

export interface Brand {
  name: string;
  slug: string;
  logo: string;
  category: 'calderas' | 'aire-acondicionado' | 'ambos';
}

// Marcas de calderas
export const CALDERAS_BRANDS: Brand[] = [
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.webp", category: "calderas" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.webp", category: "calderas" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.webp", category: "calderas" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.webp", category: "calderas" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.webp", category: "calderas" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.webp", category: "calderas" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.webp", category: "calderas" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.webp", category: "calderas" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.webp", category: "calderas" },
  { name: "Bosch", slug: "bosch", logo: "/images/marcas/bosch.webp", category: "calderas" },
  { name: "Wolf", slug: "wolf", logo: "/images/marcas/wolf.webp", category: "calderas" },
  { name: "Baxi Roca", slug: "baxi-roca", logo: "/images/marcas/baxi-roca.webp", category: "calderas" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.webp", category: "calderas" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.webp", category: "calderas" },
  { name: "Hermann", slug: "hermann", logo: "/images/marcas/hermann.webp", category: "calderas" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.webp", category: "calderas" },
  { name: "Domusa", slug: "domusa", logo: "/images/marcas/domusa.webp", category: "calderas" },
  { name: "Fagor", slug: "fagor", logo: "/images/marcas/fagor.webp", category: "calderas" },
  { name: "Manaut", slug: "manaut", logo: "/images/marcas/manaut.webp", category: "calderas" },
  { name: "Tifell", slug: "tifell", logo: "/images/marcas/tifell.webp", category: "calderas" },
  { name: "Neckar", slug: "neckar", logo: "/images/marcas/neckar.webp", category: "calderas" },
  { name: "Lamborghini", slug: "lamborghini", logo: "/images/marcas/lamborghini.webp", category: "calderas" },
  { name: "Sime", slug: "sime", logo: "/images/marcas/sime.webp", category: "calderas" },
  { name: "De Longhi", slug: "de-longhi", logo: "/images/marcas/de-longhi.webp", category: "calderas" },
  { name: "Intergas", slug: "intergas", logo: "/images/marcas/intergas.webp", category: "calderas" },
];

// Marcas de aire acondicionado
export const AIRE_BRANDS: Brand[] = [
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.webp", category: "aire-acondicionado" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.webp", category: "aire-acondicionado" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.webp", category: "aire-acondicionado" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.webp", category: "aire-acondicionado" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.webp", category: "aire-acondicionado" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.webp", category: "aire-acondicionado" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.webp", category: "aire-acondicionado" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.webp", category: "aire-acondicionado" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.webp", category: "aire-acondicionado" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.webp", category: "aire-acondicionado" },
  { name: "Midea", slug: "midea", logo: "/images/marcas/midea.webp", category: "aire-acondicionado" },
  { name: "Daitsu", slug: "daitsu", logo: "/images/marcas/daitsu.webp", category: "aire-acondicionado" },
  { name: "Airwell", slug: "airwell", logo: "/images/marcas/airwell.webp", category: "aire-acondicionado" },
];

// Todas las marcas combinadas
export const ALL_BRANDS: Brand[] = [...CALDERAS_BRANDS, ...AIRE_BRANDS];

// Marcas para el carrusel de la página principal (selección)
export const CAROUSEL_BRANDS = [
  ...CALDERAS_BRANDS.slice(0, 14), // Primeras 14 marcas de calderas
  ...AIRE_BRANDS.slice(0, 10), // Primeras 10 marcas de aire
];

// Función helper para obtener marca por slug
export function getBrandBySlug(slug: string): Brand | undefined {
  return ALL_BRANDS.find(brand => brand.slug === slug);
}

// Función helper para obtener marcas por categoría
export function getBrandsByCategory(category: 'calderas' | 'aire-acondicionado'): Brand[] {
  return ALL_BRANDS.filter(brand => brand.category === category || brand.category === 'ambos');
}
