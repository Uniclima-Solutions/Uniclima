/**
 * Constantes de categorías de productos HVAC
 * Centralizado para uso en múltiples componentes
 */

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  count: number;
}

// Categorías de Repuestos de Calderas
export const CALDERAS_CATEGORIES: Category[] = [
  { id: 1, name: "Placas", slug: "placas-electronicas", image: "/images/categorias/PlacasElectronicas.png", count: 245 },
  { id: 2, name: "Intercambiadores", slug: "intercambiadores-placas", image: "/images/categorias/IntercambiadorDePlacas.png", count: 189 },
  { id: 3, name: "Bombas", slug: "bombas-circulacion", image: "/images/categorias/Bombas.png", count: 156 },
  { id: 4, name: "Válvulas Gas", slug: "valvulas-gas", image: "/images/categorias/ValvulaGasCondensacion.png", count: 312 },
  { id: 5, name: "Extractores", slug: "extractores", image: "/images/categorias/Extractores.png", count: 178 },
  { id: 6, name: "Bitérmicos", slug: "intercambiadores-bitermicos", image: "/images/categorias/IntercambiadorBitermico.png", count: 98 },
  { id: 7, name: "Combustión", slug: "camaras-combustion", image: "/images/categorias/CamarasDeCombustion.png", count: 67 },
  { id: 8, name: "Válvulas 3 Vías", slug: "valvulas-3-vias", image: "/images/categorias/Valvulas3Vias.png", count: 234 },
  { id: 9, name: "Hidráulicos", slug: "cuerpos-hidraulicos", image: "/images/categorias/Hidraulicos.png", count: 145 },
  { id: 10, name: "Modulantes", slug: "extractores-modulantes", image: "/images/categorias/ExtractoresModulantes.png", count: 89 },
  { id: 11, name: "Vasos Expansión", slug: "vasos-expansion", image: "/images/categorias/VasoExpansion.png", count: 167 },
  { id: 12, name: "V. Seguridad", slug: "valvulas-seguridad", image: "/images/categorias/ValvulasSeguridad.png", count: 198 },
  { id: 13, name: "Sensores", slug: "sensores", image: "/images/categorias/Sensores.png", count: 276 },
  { id: 14, name: "Flujostatos", slug: "flujostatos", image: "/images/categorias/Flujostato.png", count: 123 },
  { id: 15, name: "Presostatos", slug: "presostatos", image: "/images/categorias/Presostatos.png", count: 187 },
  { id: 16, name: "Captadores", slug: "captadores-presion", image: "/images/categorias/CaptadorPresion.png", count: 156 },
  { id: 17, name: "Transformadores", slug: "transformadores", image: "/images/categorias/Transformadores.png", count: 134 },
  { id: 18, name: "V. Llenado", slug: "valvulas-llenado", image: "/images/categorias/ValvulaLLenado.png", count: 112 },
  { id: 19, name: "Microacumuladores", slug: "microacumuladores", image: "/images/categorias/Microacumuladores.png", count: 78 },
];

// Categorías de Repuestos de Aire Acondicionado
export const AIRE_CATEGORIES: Category[] = [
  { id: 1, name: "Placas Interior", slug: "placas-interior", image: "/images/categorias/PlacasInterior.png", count: 312 },
  { id: 2, name: "Placas Exterior", slug: "placas-compresor", image: "/images/categorias/PlacasCompresor.png", count: 234 },
  { id: 3, name: "Turbinas", slug: "turbinas", image: "/images/categorias/Turbinas.png", count: 187 },
  { id: 4, name: "Motores", slug: "motor-turbinas", image: "/images/categorias/MotorTurbinas.png", count: 156 },
  { id: 5, name: "Hélices", slug: "helice-compresor", image: "/images/categorias/HeliceCompresor.png", count: 198 },
  { id: 6, name: "Motor Hélice", slug: "motor-helice-compresor", image: "/images/categorias/MotorHeliceCompresor.png", count: 276 },
  { id: 7, name: "B. Conductos", slug: "bomba-condensado-conductos", image: "/images/categorias/BombaCondensadoConductos.png", count: 145 },
  { id: 8, name: "B. Cassette", slug: "bomba-condensados-cassette", image: "/images/categorias/BombaCondensadosCassette.png", count: 89 },
  { id: 9, name: "Mandos", slug: "mandos-distancia", image: "/images/categorias/MandosDistanciaSplit.png", count: 167 },
];

// Categorías destacadas de la página principal
export const FEATURED_CATEGORIES = [
  { id: 1, nombre: "Repuestos\nCalderas", image: "/images/cat-ofertas-calderas.png", slug: "calderas" },
  { id: 2, nombre: "Aire\nAcondicionado", image: "/images/cat-aire-acondicionado.png", slug: "aire-acondicionado" },
  { id: 3, nombre: "Calderas\nCompletas", image: "/images/cat-calderas-completas.png", slug: "calderas-completas" },
  { id: 4, nombre: "Zona\nProfesionales", image: "/images/cat-profesionales.png", slug: "profesionales" },
];

// Función helper para obtener categoría por slug
export function getCategoryBySlug(slug: string, type: 'calderas' | 'aire'): Category | undefined {
  const categories = type === 'calderas' ? CALDERAS_CATEGORIES : AIRE_CATEGORIES;
  return categories.find(cat => cat.slug === slug);
}

// Función helper para obtener todas las categorías
export function getAllCategories(): Category[] {
  return [...CALDERAS_CATEGORIES, ...AIRE_CATEGORIES];
}
