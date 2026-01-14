/*
 * SMART SEARCH ENGINE
 * Sistema de búsqueda inteligente con fuzzy matching avanzado
 * Busca en todo el contenido: productos, especificaciones, compatibilidad, documentos, etc.
 * Detecta y corrige errores tipográficos
 */

import { products, menuData, type Product } from "./data";

// ============================================
// ALGORITMO DE DISTANCIA DE LEVENSHTEIN
// ============================================
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  
  if (m === 0) return n;
  if (n === 0) return m;
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // eliminación
        dp[i][j - 1] + 1,      // inserción
        dp[i - 1][j - 1] + cost // sustitución
      );
    }
  }
  
  return dp[m][n];
}

// ============================================
// SIMILITUD NORMALIZADA (0-1)
// ============================================
function similarity(s1: string, s2: string): number {
  s1 = s1.toLowerCase().trim();
  s2 = s2.toLowerCase().trim();
  
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Coincidencia exacta de subcadena
  if (s1.includes(s2) || s2.includes(s1)) return 0.95;
  
  // Coincidencia de palabras
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  let wordMatches = 0;
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1.includes(w2) || w2.includes(w1)) {
        wordMatches++;
        break;
      }
    }
  }
  if (wordMatches > 0) {
    return 0.7 + (wordMatches / Math.max(words1.length, words2.length)) * 0.2;
  }
  
  // Distancia de Levenshtein normalizada
  const maxLen = Math.max(s1.length, s2.length);
  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / maxLen;
}

// ============================================
// CORRECCIONES ORTOGRÁFICAS COMUNES
// ============================================
const spellingCorrections: Record<string, string> = {
  // Marcas con errores comunes
  "saunier": "Saunier Duval",
  "sauniee": "Saunier Duval",
  "sauner": "Saunier Duval",
  "duval": "Saunier Duval",
  "junker": "Junkers",
  "yunkers": "Junkers",
  "junkrs": "Junkers",
  "junkes": "Junkers",
  "vailant": "Vaillant",
  "vayant": "Vaillant",
  "vaillat": "Vaillant",
  "vaillan": "Vaillant",
  "feroli": "Ferroli",
  "ferroly": "Ferroli",
  "baxiroca": "Baxi / BaxiRoca",
  "baxy": "Baxi / BaxiRoca",
  "ariston": "Ariston",
  "aristom": "Ariston",
  "daikim": "Daikin",
  "daykin": "Daikin",
  "dakin": "Daikin",
  "mitsubisi": "Mitsubishi",
  "mitsubichi": "Mitsubishi",
  "mitsibushi": "Mitsubishi",
  "fujitzu": "Fujitsu",
  "fijitsu": "Fujitsu",
  "fujitu": "Fujitsu",
  "panasoni": "Panasonic",
  "panasonik": "Panasonic",
  "bosh": "Bosch",
  "boch": "Bosch",
  "honeywel": "Honeywell",
  "honeywell": "Honeywell",
  "honeywal": "Honeywell",
  
  // Categorías con errores comunes
  "valvula": "válvula",
  "balbula": "válvula",
  "valbula": "válvula",
  "valvulas": "válvulas",
  "intercambiador": "intercambiador",
  "intercamviador": "intercambiador",
  "intecambiador": "intercambiador",
  "placa": "placa electrónica",
  "placas": "placas electrónicas",
  "bomba": "bomba de circulación",
  "bombas": "bombas de circulación",
  "compresor": "compresor",
  "conpresor": "compresor",
  "motor": "motor ventilador",
  "electrodo": "electrodo de encendido",
  "electrodos": "electrodos de encendido",
  "quemador": "quemador",
  "kemador": "quemador",
  "ventilador": "ventilador",
  "bentilador": "ventilador",
  "termostato": "termostato",
  "termoestato": "termostato",
  "presostato": "presostato",
  "presoestato": "presostato",
  "sonda": "sonda",
  "sensor": "sensor",
  "censor": "sensor",
  "condensacion": "condensación",
  "condenzacion": "condensación",
  "caldera": "caldera",
  "calera": "caldera",
  "calderas": "calderas",
  "aire": "aire acondicionado",
  "ayre": "aire acondicionado",
  "acondicionado": "aire acondicionado",
  "split": "split",
  "esplit": "split",
  
  // Referencias técnicas comunes
  "vk4105": "VK4105M",
  "vk4105m": "VK4105M",
  "cerapur": "Cerapur",
  "ecotec": "ecoTEC",
  "thema": "Thema Condens",
};

// ============================================
// ÍNDICE DE BÚSQUEDA COMPLETO
// ============================================
interface SearchableItem {
  id: string;
  type: "product" | "category" | "brand" | "service" | "page" | "model" | "spec" | "document";
  title: string;
  subtitle?: string;
  description?: string;
  keywords: string[];
  href: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  inStock?: boolean;
  parent?: string;
  relevance?: number;
  rating?: number;
  reviewCount?: number;
}

// Construir índice de búsqueda
function buildSearchIndex(): SearchableItem[] {
  const index: SearchableItem[] = [];
  
  // Indexar productos con TODO su contenido
  products.forEach(product => {
    // Recopilar todas las palabras clave del producto
    const keywords: string[] = [
      product.name,
      product.reference,
      product.brand,
      product.partType,
      product.description,
      product.longDescription || "",
      product.sku || "",
      product.ean || "",
      ...(product.tags || []),
      ...(product.compatibleModels || []),
    ];
    
    // Añadir especificaciones
    if (product.specifications) {
      product.specifications.forEach(spec => {
        keywords.push(spec.label, spec.value);
      });
    }
    
    // Añadir documentos
    if (product.documents) {
      product.documents.forEach(doc => {
        keywords.push(doc.name, doc.type);
      });
    }
    
    // Añadir reviews
    if (product.reviews) {
      product.reviews.forEach(review => {
        keywords.push(review.title, review.comment);
      });
    }
    
    index.push({
      id: product.id,
      type: "product",
      title: product.name,
      subtitle: product.brand,
      description: product.description,
      keywords: keywords.filter(k => k && k.length > 0),
      href: `/producto/${product.id}`,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      inStock: product.inStock,
      rating: product.averageRating,
      reviewCount: product.reviewCount,
    });
    
    // Indexar modelos compatibles como items separados
    if (product.compatibleModels) {
      product.compatibleModels.forEach(model => {
        index.push({
          id: `model-${product.id}-${model}`,
          type: "model",
          title: model,
          subtitle: `Compatible con ${product.name}`,
          description: `Modelo compatible - ${product.brand}`,
          keywords: [model, product.brand, product.name, "compatible", "compatibilidad"],
          href: `/producto/${product.id}`,
          parent: product.name,
        });
      });
    }
    
    // Indexar especificaciones como items buscables
    if (product.specifications) {
      product.specifications.forEach(spec => {
        index.push({
          id: `spec-${product.id}-${spec.label}`,
          type: "spec",
          title: `${spec.label}: ${spec.value}`,
          subtitle: product.name,
          description: `Especificación técnica de ${product.name}`,
          keywords: [spec.label, spec.value, product.name, product.brand, "especificación", "técnico"],
          href: `/producto/${product.id}`,
          parent: product.name,
        });
      });
    }
  });
  
  // Indexar categorías de repuestos calderas
  menuData.repuestosCalderas.items.forEach(item => {
    index.push({
      id: `cat-calderas-${item.name}`,
      type: "category",
      title: item.name,
      subtitle: "Repuestos Calderas",
      description: `${item.count} productos disponibles`,
      keywords: [item.name, "calderas", "repuestos", "categoría"],
      href: item.href,
    });
  });
  
  // Indexar categorías de repuestos aire
  menuData.repuestosAire.items.forEach(item => {
    index.push({
      id: `cat-aire-${item.name}`,
      type: "category",
      title: item.name,
      subtitle: "Repuestos Aire Acondicionado",
      description: `${item.count} productos disponibles`,
      keywords: [item.name, "aire", "acondicionado", "repuestos", "categoría"],
      href: item.href,
    });
  });
  
  // Indexar marcas de calderas
  menuData.marcas.calderas.forEach(brand => {
    index.push({
      id: `brand-calderas-${brand.name}`,
      type: "brand",
      title: brand.name,
      subtitle: "Marca de Calderas",
      description: `${brand.count} productos disponibles`,
      keywords: [brand.name, "marca", "calderas", "fabricante"],
      href: brand.href,
    });
  });
  
  // Indexar marcas de aire
  menuData.marcas.aire.forEach(brand => {
    index.push({
      id: `brand-aire-${brand.name}`,
      type: "brand",
      title: brand.name,
      subtitle: "Marca de Aire Acondicionado",
      description: `${brand.count} productos disponibles`,
      keywords: [brand.name, "marca", "aire", "acondicionado", "fabricante"],
      href: brand.href,
    });
  });
  
  // Indexar servicios
  menuData.servicios.forEach(service => {
    index.push({
      id: `service-${service.name}`,
      type: "service",
      title: service.name,
      subtitle: "Servicio",
      description: service.description,
      keywords: [service.name, service.description, "servicio", "reparación", "mantenimiento"],
      href: service.href,
    });
  });
  
  // Indexar páginas estáticas
  const staticPages = [
    { name: "Contacto", href: "/contacto", keywords: ["contacto", "teléfono", "email", "dirección", "formulario"] },
    { name: "FAQ - Preguntas frecuentes", href: "/faq", keywords: ["faq", "preguntas", "frecuentes", "ayuda", "dudas"] },
    { name: "Blog - Guías técnicas", href: "/blog", keywords: ["blog", "guías", "técnicas", "artículos", "noticias"] },
    { name: "Zona Profesionales", href: "/zona-profesionales", keywords: ["profesionales", "instaladores", "técnicos", "descuentos"] },
    { name: "Programa de Puntos", href: "/puntos", keywords: ["puntos", "fidelización", "descuentos", "recompensas"] },
    { name: "Devoluciones y Garantías", href: "/devoluciones", keywords: ["devoluciones", "garantías", "cambios", "reembolso"] },
    { name: "Aviso Legal", href: "/aviso-legal", keywords: ["aviso", "legal", "términos", "condiciones"] },
    { name: "Política de Privacidad", href: "/privacidad", keywords: ["privacidad", "datos", "RGPD", "protección"] },
    { name: "Política de Cookies", href: "/cookies", keywords: ["cookies", "privacidad", "navegación"] },
    { name: "Condiciones de Uso", href: "/condiciones-uso", keywords: ["condiciones", "uso", "términos", "servicio"] },
  ];
  
  staticPages.forEach(page => {
    index.push({
      id: `page-${page.name}`,
      type: "page",
      title: page.name,
      subtitle: "Página",
      keywords: page.keywords,
      href: page.href,
    });
  });
  
  return index;
}

// Índice global (se construye una vez)
let searchIndex: SearchableItem[] | null = null;

function getSearchIndex(): SearchableItem[] {
  if (!searchIndex) {
    searchIndex = buildSearchIndex();
  }
  return searchIndex;
}

// ============================================
// FUNCIÓN DE BÚSQUEDA PRINCIPAL
// ============================================
export interface SearchResult {
  item: SearchableItem;
  score: number;
  matchedKeyword?: string;
  correction?: string;
}

export function smartSearch(query: string, limit: number = 20): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 1);
  const index = getSearchIndex();
  const results: SearchResult[] = [];
  
  // Verificar si hay corrección ortográfica disponible
  let correctedQuery = normalizedQuery;
  let correction: string | undefined;
  
  for (const word of queryWords) {
    if (spellingCorrections[word]) {
      correctedQuery = correctedQuery.replace(word, spellingCorrections[word].toLowerCase());
      correction = spellingCorrections[word];
    }
  }
  
  // Buscar en el índice
  for (const item of index) {
    let maxScore = 0;
    let matchedKeyword = "";
    
    // Buscar en título (peso alto)
    const titleSim = similarity(normalizedQuery, item.title);
    if (titleSim > maxScore) {
      maxScore = titleSim * 1.5; // Boost para título
      matchedKeyword = item.title;
    }
    
    // Buscar en subtítulo
    if (item.subtitle) {
      const subtitleSim = similarity(normalizedQuery, item.subtitle);
      if (subtitleSim > maxScore) {
        maxScore = subtitleSim * 1.2;
        matchedKeyword = item.subtitle;
      }
    }
    
    // Buscar en descripción
    if (item.description) {
      const descSim = similarity(normalizedQuery, item.description);
      if (descSim > maxScore) {
        maxScore = descSim;
        matchedKeyword = item.description;
      }
    }
    
    // Buscar en keywords
    for (const keyword of item.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      // Coincidencia exacta de subcadena
      if (keywordLower.includes(normalizedQuery) || normalizedQuery.includes(keywordLower)) {
        const score = 0.9 + (Math.min(normalizedQuery.length, keywordLower.length) / Math.max(normalizedQuery.length, keywordLower.length)) * 0.1;
        if (score > maxScore) {
          maxScore = score;
          matchedKeyword = keyword;
        }
      } else {
        // Fuzzy matching
        const keywordSim = similarity(normalizedQuery, keywordLower);
        if (keywordSim > maxScore && keywordSim > 0.4) {
          maxScore = keywordSim;
          matchedKeyword = keyword;
        }
      }
      
      // Buscar cada palabra del query en el keyword
      for (const word of queryWords) {
        if (keywordLower.includes(word)) {
          const wordScore = 0.7 + (word.length / keywordLower.length) * 0.2;
          if (wordScore > maxScore) {
            maxScore = wordScore;
            matchedKeyword = keyword;
          }
        } else {
          const wordSim = similarity(word, keywordLower);
          if (wordSim > 0.6 && wordSim > maxScore * 0.8) {
            maxScore = Math.max(maxScore, wordSim * 0.9);
            matchedKeyword = keyword;
          }
        }
      }
    }
    
    // Aplicar boost por tipo
    if (item.type === "product") maxScore *= 1.3;
    else if (item.type === "category") maxScore *= 1.2;
    else if (item.type === "brand") maxScore *= 1.15;
    else if (item.type === "model") maxScore *= 1.1;
    
    // Aplicar boost si está en stock
    if (item.inStock) maxScore *= 1.05;
    
    // Solo incluir resultados con score mínimo
    if (maxScore > 0.35) {
      results.push({
        item,
        score: maxScore,
        matchedKeyword,
        correction: correction,
      });
    }
  }
  
  // Ordenar por score y limitar
  results.sort((a, b) => b.score - a.score);
  
  // Eliminar duplicados (mismo producto desde diferentes fuentes)
  const seen = new Set<string>();
  const uniqueResults: SearchResult[] = [];
  
  for (const result of results) {
    // Para modelos y specs, usar el href como identificador único
    const uniqueKey = result.item.type === "product" 
      ? result.item.id 
      : result.item.href;
    
    if (!seen.has(uniqueKey)) {
      seen.add(uniqueKey);
      uniqueResults.push(result);
    }
  }
  
  return uniqueResults.slice(0, limit);
}

// ============================================
// SUGERENCIAS DE CORRECCIÓN
// ============================================
export function getSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const suggestions: string[] = [];
  
  // Buscar correcciones directas
  for (const [typo, correction] of Object.entries(spellingCorrections)) {
    if (similarity(normalizedQuery, typo) > 0.7) {
      suggestions.push(correction);
    }
  }
  
  // Buscar en productos
  const index = getSearchIndex();
  for (const item of index) {
    if (item.type === "product" || item.type === "brand" || item.type === "category") {
      const titleSim = similarity(normalizedQuery, item.title.toLowerCase());
      if (titleSim > 0.6 && titleSim < 1) {
        suggestions.push(item.title);
      }
    }
  }
  
  // Eliminar duplicados y limitar
  return Array.from(new Set(suggestions)).slice(0, 5);
}

// ============================================
// BÚSQUEDA RÁPIDA (para autocompletado)
// ============================================
export function quickSearch(query: string, limit: number = 8): SearchResult[] {
  return smartSearch(query, limit);
}

// ============================================
// TIPOS DE RESULTADOS AGRUPADOS
// ============================================
export interface GroupedSearchResults {
  products: SearchResult[];
  categories: SearchResult[];
  brands: SearchResult[];
  models: SearchResult[];
  services: SearchResult[];
  pages: SearchResult[];
  specs: SearchResult[];
  correction?: string;
}

export function groupedSearch(query: string): GroupedSearchResults {
  const results = smartSearch(query, 50);
  
  const grouped: GroupedSearchResults = {
    products: [],
    categories: [],
    brands: [],
    models: [],
    services: [],
    pages: [],
    specs: [],
    correction: results[0]?.correction,
  };
  
  for (const result of results) {
    switch (result.item.type) {
      case "product":
        grouped.products.push(result);
        break;
      case "category":
        grouped.categories.push(result);
        break;
      case "brand":
        grouped.brands.push(result);
        break;
      case "model":
        grouped.models.push(result);
        break;
      case "service":
        grouped.services.push(result);
        break;
      case "page":
        grouped.pages.push(result);
        break;
      case "spec":
        grouped.specs.push(result);
        break;
    }
  }
  
  return grouped;
}

// Exportar tipos
export type { SearchableItem };
