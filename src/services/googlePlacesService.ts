/**
 * Servicio de autocompletado de direcciones usando Google Places API
 * Proporciona búsqueda de direcciones en tiempo real para España
 */

export interface GooglePlaceResult {
  placeId: string;
  name: string;           // Nombre/descripción principal
  fullAddress: string;    // Dirección completa
  mainText: string;       // Texto principal (calle)
  secondaryText: string;  // Texto secundario (ciudad, país)
}

export interface GooglePlaceDetails {
  name: string;
  streetNumber: string;
  route: string;          // Nombre de la calle
  locality: string;       // Ciudad
  administrativeArea: string; // Provincia/Comunidad
  postalCode: string;
  country: string;
  formattedAddress: string;
}

// Cargar el script de Google Places
let googleMapsLoaded = false;
let loadingPromise: Promise<void> | null = null;

export function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Cannot load Google Maps on server side'));
  }

  if (googleMapsLoaded) {
    return Promise.resolve();
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      console.warn('Google Places API key not configured');
      reject(new Error('Google Places API key not configured'));
      return;
    }

    // Verificar si ya está cargado
    if ((window as any).google?.maps?.places) {
      googleMapsLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=es`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleMapsLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });

  return loadingPromise;
}

// Servicio de autocompletado
let autocompleteService: google.maps.places.AutocompleteService | null = null;
let placesService: google.maps.places.PlacesService | null = null;

function getAutocompleteService(): google.maps.places.AutocompleteService {
  if (!autocompleteService) {
    autocompleteService = new google.maps.places.AutocompleteService();
  }
  return autocompleteService;
}

function getPlacesService(): google.maps.places.PlacesService {
  if (!placesService) {
    // Crear un div temporal para el PlacesService
    const div = document.createElement('div');
    placesService = new google.maps.places.PlacesService(div);
  }
  return placesService;
}

/**
 * Busca direcciones usando Google Places Autocomplete
 * @param query - Texto de búsqueda
 * @returns Array de resultados de direcciones
 */
export async function buscarDireccionesGoogle(query: string): Promise<GooglePlaceResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    await loadGoogleMapsScript();
    
    const service = getAutocompleteService();
    
    return new Promise((resolve) => {
      service.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: 'es' }, // Solo España
          types: ['address'], // Solo direcciones
          language: 'es',
        },
        (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            resolve([]);
            return;
          }

          const results: GooglePlaceResult[] = predictions.map((prediction) => ({
            placeId: prediction.place_id,
            name: prediction.structured_formatting.main_text,
            fullAddress: prediction.description,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text || '',
          }));

          resolve(results);
        }
      );
    });
  } catch (error) {
    console.error('Error al buscar direcciones:', error);
    return [];
  }
}

/**
 * Obtiene los detalles de un lugar por su placeId
 * @param placeId - ID del lugar de Google
 * @returns Detalles del lugar
 */
export async function obtenerDetallesLugar(placeId: string): Promise<GooglePlaceDetails | null> {
  try {
    await loadGoogleMapsScript();
    
    const service = getPlacesService();
    
    return new Promise((resolve) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: ['address_components', 'formatted_address', 'name'],
        },
        (place, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
            resolve(null);
            return;
          }

          const components = place.address_components || [];
          
          const getComponent = (type: string): string => {
            const component = components.find((c) => c.types.includes(type));
            return component?.long_name || '';
          };

          const details: GooglePlaceDetails = {
            name: place.name || '',
            streetNumber: getComponent('street_number'),
            route: getComponent('route'),
            locality: getComponent('locality') || getComponent('administrative_area_level_2'),
            administrativeArea: getComponent('administrative_area_level_1'),
            postalCode: getComponent('postal_code'),
            country: getComponent('country'),
            formattedAddress: place.formatted_address || '',
          };

          resolve(details);
        }
      );
    });
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error);
    return null;
  }
}
