/**
 * Servicio de autocompletado de direcciones usando Nominatim (OpenStreetMap)
 * Proporciona búsqueda de direcciones en tiempo real para España
 * Gratuito y sin necesidad de API key
 * 
 * MEJORADO: Permite escribir calle + número y autocompleta CP, población y provincia
 */

export interface AddressResult {
  placeId: string;
  name: string;           // Nombre/descripción principal
  fullAddress: string;    // Dirección completa
  mainText: string;       // Texto principal (calle y número)
  secondaryText: string;  // Texto secundario (ciudad, provincia)
  // Detalles de la dirección
  streetNumber?: string;
  street?: string;
  locality?: string;      // Ciudad/Población
  postalCode?: string;
  province?: string;      // Provincia
  country?: string;
}

export interface AddressDetails {
  direccion: string;      // Calle y número formateado
  codigoPostal: string;
  poblacion: string;
  provincia: string;
}

// Cache para evitar peticiones duplicadas
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

interface CacheEntry {
  results: AddressResult[];
  timestamp: number;
}

const cacheWithTimestamp = new Map<string, CacheEntry>();

/**
 * Busca direcciones usando Nominatim (OpenStreetMap)
 * Optimizado para buscar calles con número en la Comunidad de Madrid
 * @param query - Texto de búsqueda (ej: "Calle Grafito 12")
 * @returns Array de resultados de direcciones
 */
export async function buscarDirecciones(query: string): Promise<AddressResult[]> {
  if (!query || query.length < 3) {
    return [];
  }

  // Verificar cache
  const cacheKey = query.toLowerCase().trim();
  const cached = cacheWithTimestamp.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.results;
  }

  try {
    // Añadir "Madrid" al query para mejorar resultados en la zona de servicio
    const searchQuery = query.toLowerCase().includes('madrid') 
      ? query 
      : `${query}, Madrid, España`;

    // Usar Nominatim API (OpenStreetMap)
    const params = new URLSearchParams({
      q: searchQuery,
      format: 'json',
      addressdetails: '1',
      limit: '10',
      countrycodes: 'es', // Solo España
      'accept-language': 'es',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        headers: {
          'User-Agent': 'Uniclima-WebApp/1.0 (info@uniclima.es)',
        },
      }
    );

    if (!response.ok) {
      console.error('Error en Nominatim:', response.status);
      return [];
    }

    const data = await response.json();

    const results: AddressResult[] = data
      .filter((item: any) => {
        // Filtrar solo direcciones en la Comunidad de Madrid o cercanas
        const address = item.address || {};
        const state = (address.state || '').toLowerCase();
        const province = (address.province || '').toLowerCase();
        return state.includes('madrid') || province.includes('madrid') || 
               state.includes('castilla') || state.includes('toledo') ||
               state.includes('guadalajara') || state.includes('segovia');
      })
      .map((item: any) => {
        const address = item.address || {};
        
        // Construir el texto principal (calle y número)
        let mainText = '';
        if (address.road) {
          mainText = address.road;
          if (address.house_number) {
            mainText += ` ${address.house_number}`;
          }
        } else {
          mainText = item.display_name.split(',')[0];
        }

        // Construir el texto secundario (ciudad, provincia, CP)
        const locality = address.city || address.town || address.village || address.municipality || '';
        const province = address.state || address.province || '';
        const postalCode = address.postcode || '';
        
        let secondaryText = '';
        if (locality) {
          secondaryText = locality;
          if (postalCode) {
            secondaryText = `${postalCode} ${locality}`;
          }
          if (province && province !== locality) {
            secondaryText += `, ${province}`;
          }
        } else if (province) {
          secondaryText = province;
        }

        return {
          placeId: item.place_id.toString(),
          name: mainText,
          fullAddress: item.display_name,
          mainText: mainText,
          secondaryText: secondaryText,
          streetNumber: address.house_number || '',
          street: address.road || '',
          locality: locality,
          postalCode: postalCode,
          province: province || 'Madrid',
          country: address.country || 'España',
        };
      });

    // Guardar en cache
    cacheWithTimestamp.set(cacheKey, {
      results,
      timestamp: Date.now(),
    });

    return results;
  } catch (error) {
    console.error('Error al buscar direcciones:', error);
    return [];
  }
}

/**
 * Obtiene los detalles completos de una dirección seleccionada
 * Devuelve dirección formateada, código postal, población y provincia
 * @param placeId - ID del lugar (para compatibilidad, aunque usamos el resultado directo)
 * @returns Detalles de la dirección
 */
export async function obtenerDetalles(placeId: string): Promise<AddressDetails> {
  try {
    // Buscar detalles adicionales usando el place_id de Nominatim
    const params = new URLSearchParams({
      place_id: placeId,
      format: 'json',
      addressdetails: '1',
      'accept-language': 'es',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/details?${params.toString()}`,
      {
        headers: {
          'User-Agent': 'Uniclima-WebApp/1.0 (info@uniclima.es)',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const address = data.address || {};
      
      // Extraer componentes de la dirección
      let direccion = '';
      if (address.road) {
        direccion = address.road;
        if (address.house_number) {
          direccion += ` ${address.house_number}`;
        }
      }

      const locality = address.city || address.town || address.village || address.municipality || '';
      const province = address.state || address.province || 'Madrid';
      const postalCode = address.postcode || '';

      return {
        direccion,
        codigoPostal: postalCode,
        poblacion: locality,
        provincia: province,
      };
    }
  } catch (error) {
    console.error('Error obteniendo detalles:', error);
  }

  // Devolver valores vacíos si falla
  return {
    direccion: '',
    codigoPostal: '',
    poblacion: '',
    provincia: 'Madrid',
  };
}

/**
 * Busca el código postal para una dirección específica usando geocodificación
 * @param direccion - Dirección completa o parcial
 * @param poblacion - Nombre de la población
 * @returns Código postal si se encuentra
 */
export async function buscarCodigoPostal(direccion: string, poblacion?: string): Promise<string | null> {
  try {
    const query = poblacion 
      ? `${direccion}, ${poblacion}, Madrid, España` 
      : `${direccion}, Madrid, España`;
    
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '1',
      countrycodes: 'es',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        headers: {
          'User-Agent': 'Uniclima-WebApp/1.0 (info@uniclima.es)',
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.length > 0 && data[0].address?.postcode) {
      return data[0].address.postcode;
    }

    return null;
  } catch (error) {
    console.error('Error buscando código postal:', error);
    return null;
  }
}

/**
 * Valida si un código postal pertenece a la Comunidad de Madrid o zonas cercanas
 * @param codigoPostal - Código postal a validar
 * @returns true si está en zona de servicio
 */
export function esZonaServicio(codigoPostal: string): boolean {
  if (!codigoPostal || codigoPostal.length !== 5) return false;
  
  const cp = parseInt(codigoPostal, 10);
  
  // Comunidad de Madrid: 28000-28999
  if (cp >= 28000 && cp <= 28999) return true;
  
  // Toledo cercano: 45000-45999 (algunas zonas)
  if (cp >= 45000 && cp <= 45199) return true;
  
  // Guadalajara cercano: 19000-19999 (algunas zonas)
  if (cp >= 19000 && cp <= 19199) return true;
  
  // Segovia cercano: 40000-40199
  if (cp >= 40000 && cp <= 40199) return true;
  
  return false;
}
