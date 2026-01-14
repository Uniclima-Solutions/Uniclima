/**
 * Servicio de autocompletado de direcciones usando Nominatim (OpenStreetMap)
 * Proporciona búsqueda de direcciones en tiempo real para España
 * Gratuito y sin necesidad de API key
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
  name: string;
  streetNumber: string;
  route: string;          // Nombre de la calle
  locality: string;       // Ciudad
  administrativeArea: string; // Provincia/Comunidad
  postalCode: string;
  country: string;
  formattedAddress: string;
}

// Cache para evitar peticiones duplicadas
const searchCache = new Map<string, AddressResult[]>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

interface CacheEntry {
  results: AddressResult[];
  timestamp: number;
}

const cacheWithTimestamp = new Map<string, CacheEntry>();

/**
 * Busca direcciones usando Nominatim (OpenStreetMap)
 * @param query - Texto de búsqueda
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
    // Usar Nominatim API (OpenStreetMap)
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '8',
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

    const results: AddressResult[] = data.map((item: any) => {
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

      // Construir el texto secundario (ciudad, provincia)
      const locality = address.city || address.town || address.village || address.municipality || '';
      const province = address.state || address.province || '';
      let secondaryText = '';
      if (locality) {
        secondaryText = locality;
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
        postalCode: address.postcode || '',
        province: province,
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
 * @param result - Resultado de búsqueda seleccionado
 * @returns Detalles de la dirección
 */
export function obtenerDetalles(result: AddressResult): AddressDetails {
  // Construir dirección formateada
  let formattedAddress = '';
  if (result.street) {
    formattedAddress = result.street;
    if (result.streetNumber) {
      formattedAddress += ` ${result.streetNumber}`;
    }
  } else {
    formattedAddress = result.mainText;
  }

  return {
    name: result.name,
    streetNumber: result.streetNumber || '',
    route: result.street || '',
    locality: result.locality || '',
    administrativeArea: result.province || 'Madrid',
    postalCode: result.postalCode || '',
    country: result.country || 'España',
    formattedAddress: formattedAddress,
  };
}

/**
 * Busca el código postal para una dirección específica usando geocodificación inversa
 * @param locality - Nombre de la población
 * @param street - Nombre de la calle (opcional)
 * @returns Código postal si se encuentra
 */
export async function buscarCodigoPostal(locality: string, street?: string): Promise<string | null> {
  try {
    const query = street ? `${street}, ${locality}, España` : `${locality}, España`;
    
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
