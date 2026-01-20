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
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.png", category: "calderas" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.png", category: "calderas" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.png", category: "calderas" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.png", category: "calderas" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.png", category: "calderas" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.png", category: "calderas" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.png", category: "calderas" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.png", category: "calderas" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.png", category: "calderas" },
  { name: "Bosch", slug: "bosch", logo: "/images/marcas/bosch.png", category: "calderas" },
  { name: "Wolf", slug: "wolf", logo: "/images/marcas/wolf.png", category: "calderas" },
  { name: "Baxi Roca", slug: "baxi-roca", logo: "/images/marcas/baxi-roca.png", category: "calderas" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.png", category: "calderas" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.png", category: "calderas" },
  { name: "Hermann", slug: "hermann", logo: "/images/marcas/hermann.png", category: "calderas" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.png", category: "calderas" },
  { name: "Domusa", slug: "domusa", logo: "/images/marcas/domusa.png", category: "calderas" },
  { name: "Fagor", slug: "fagor", logo: "/images/marcas/fagor.png", category: "calderas" },
  { name: "Manaut", slug: "manaut", logo: "/images/marcas/manaut.png", category: "calderas" },
  { name: "Tifell", slug: "tifell", logo: "/images/marcas/tifell.png", category: "calderas" },
  { name: "Neckar", slug: "neckar", logo: "/images/marcas/neckar.png", category: "calderas" },
  { name: "Lamborghini", slug: "lamborghini", logo: "/images/marcas/lamborghini.png", category: "calderas" },
  { name: "Sime", slug: "sime", logo: "/images/marcas/sime.png", category: "calderas" },
  { name: "De Longhi", slug: "de-longhi", logo: "/images/marcas/de-longhi.png", category: "calderas" },
  { name: "Intergas", slug: "intergas", logo: "/images/marcas/intergas.png", category: "calderas" },
];

// Marcas de aire acondicionado
export const AIRE_BRANDS: Brand[] = [
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.png", category: "aire-acondicionado" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.png", category: "aire-acondicionado" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.png", category: "aire-acondicionado" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.png", category: "aire-acondicionado" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.png", category: "aire-acondicionado" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.png", category: "aire-acondicionado" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.png", category: "aire-acondicionado" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.png", category: "aire-acondicionado" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.png", category: "aire-acondicionado" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.png", category: "aire-acondicionado" },
  { name: "Midea", slug: "midea", logo: "/images/marcas/midea.png", category: "aire-acondicionado" },
  { name: "Daitsu", slug: "daitsu", logo: "/images/marcas/daitsu.png", category: "aire-acondicionado" },
  { name: "Airwell", slug: "airwell", logo: "/images/marcas/airwell.png", category: "aire-acondicionado" },
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
