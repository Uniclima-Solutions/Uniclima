/**
 * Servicio de Autocompletado de Direcciones con Google Places API
 * Uniclima Solutions - Solo Madrid y alrededores
 * 
 * API Key: AIzaSyBUJn38ODr8aJRn8UTnkni4eQQpAm41xfc
 */

// Tipos para las respuestas de Google Places
export interface DireccionSugerida {
  id: string;
  calle: string;
  numero: string;
  codigoPostal: string;
  poblacion: string;
  provincia: string;
  descripcionCompleta: string;
  placeId: string;
}

export interface PlaceDetails {
  codigoPostal: string;
  poblacion: string;
  provincia: string;
  calle: string;
  numero: string;
}

// API Key de Google Places
const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 'AIzaSyBUJn38ODr8aJRn8UTnkni4eQQpAm41xfc';

// Coordenadas del centro de Madrid para sesgar los resultados
const MADRID_LAT = 40.4168;
const MADRID_LNG = -3.7038;
const SEARCH_RADIUS = 50000; // 50km alrededor de Madrid

/**
 * Buscar direcciones usando Google Places Autocomplete API
 * Restringido a Espana y sesgado hacia Madrid
 */
export async function buscarDireccionesMadrid(query: string): Promise<DireccionSugerida[]> {
  if (!query || query.length < 3) {
    return [];
  }

  try {
    // Usar la API de Places Autocomplete
    const url = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json');
    url.searchParams.append('input', query);
    url.searchParams.append('key', GOOGLE_PLACES_API_KEY);
    url.searchParams.append('types', 'address');
    url.searchParams.append('components', 'country:es');
    url.searchParams.append('language', 'es');
    url.searchParams.append('location', `${MADRID_LAT},${MADRID_LNG}`);
    url.searchParams.append('radius', SEARCH_RADIUS.toString());
    url.searchParams.append('strictbounds', 'false');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('Error en Google Places API:', response.status);
      return buscarDireccionesLocal(query);
    }

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API status:', data.status, data.error_message);
      return buscarDireccionesLocal(query);
    }

    if (!data.predictions || data.predictions.length === 0) {
      return buscarDireccionesLocal(query);
    }

    // Filtrar solo direcciones de Madrid y alrededores
    const direccionesMadrid = data.predictions.filter((pred: any) => {
      const desc = pred.description.toLowerCase();
      return desc.includes('madrid') || 
             desc.includes('torrejon') || 
             desc.includes('alcala de henares') ||
             desc.includes('getafe') ||
             desc.includes('leganes') ||
             desc.includes('mostoles') ||
             desc.includes('alcorcon') ||
             desc.includes('fuenlabrada') ||
             desc.includes('parla') ||
             desc.includes('alcobendas') ||
             desc.includes('san sebastian de los reyes') ||
             desc.includes('coslada') ||
             desc.includes('rivas') ||
             desc.includes('las rozas') ||
             desc.includes('pozuelo') ||
             desc.includes('majadahonda') ||
             desc.includes('boadilla');
    });

    // Mapear a nuestro formato
    return direccionesMadrid.slice(0, 8).map((pred: any) => {
      const mainText = pred.structured_formatting?.main_text || '';
      const secondaryText = pred.structured_formatting?.secondary_text || '';
      
      const matchNumero = mainText.match(/,?\s*(\d+[A-Za-z]?)$/);
      const numero = matchNumero ? matchNumero[1] : '';
      const calle = matchNumero ? mainText.replace(/,?\s*\d+[A-Za-z]?$/, '').trim() : mainText;

      const partes = secondaryText.split(',').map((p: string) => p.trim());
      const poblacion = partes[0] || 'Madrid';
      const provincia = partes.find((p: string) => p.toLowerCase().includes('madrid')) || 'Madrid';

      return {
        id: pred.place_id,
        calle: calle,
        numero: numero,
        codigoPostal: '',
        poblacion: poblacion,
        provincia: provincia.includes('Madrid') ? 'Madrid' : provincia,
        descripcionCompleta: pred.description,
        placeId: pred.place_id,
      };
    });
  } catch (error) {
    console.error('Error buscando direcciones:', error);
    return buscarDireccionesLocal(query);
  }
}

/**
 * Obtener detalles de un lugar usando Google Places Details API
 * Incluye codigo postal
 */
export async function obtenerDetallesLugar(placeId: string): Promise<PlaceDetails | null> {
  if (!placeId) {
    return null;
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.append('place_id', placeId);
    url.searchParams.append('key', GOOGLE_PLACES_API_KEY);
    url.searchParams.append('fields', 'address_components,formatted_address');
    url.searchParams.append('language', 'es');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('Error en Google Places Details API:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places Details API status:', data.status);
      return null;
    }

    const components = data.result?.address_components || [];
    
    let codigoPostal = '';
    let poblacion = '';
    let provincia = '';
    let calle = '';
    let numero = '';

    for (const comp of components) {
      const types = comp.types || [];
      
      if (types.includes('postal_code')) {
        codigoPostal = comp.long_name;
      }
      if (types.includes('locality')) {
        poblacion = comp.long_name;
      }
      if (types.includes('administrative_area_level_2')) {
        provincia = comp.long_name;
      }
      if (types.includes('route')) {
        calle = comp.long_name;
      }
      if (types.includes('street_number')) {
        numero = comp.long_name;
      }
    }

    return {
      codigoPostal,
      poblacion: poblacion || 'Madrid',
      provincia: provincia || 'Madrid',
      calle,
      numero,
    };
  } catch (error) {
    console.error('Error obteniendo detalles del lugar:', error);
    return null;
  }
}

// Base de datos local de calles de Madrid y alrededores (fallback)
const callesMadrid: { calle: string; poblacion: string; cp: string }[] = [
  { calle: "Calle Gran Via", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Alcala", poblacion: "Madrid", cp: "28014" },
  { calle: "Calle Serrano", poblacion: "Madrid", cp: "28001" },
  { calle: "Calle Goya", poblacion: "Madrid", cp: "28001" },
  { calle: "Calle Velazquez", poblacion: "Madrid", cp: "28001" },
  { calle: "Calle Principe de Vergara", poblacion: "Madrid", cp: "28002" },
  { calle: "Calle Bravo Murillo", poblacion: "Madrid", cp: "28003" },
  { calle: "Paseo de la Castellana", poblacion: "Madrid", cp: "28046" },
  { calle: "Paseo del Prado", poblacion: "Madrid", cp: "28014" },
  { calle: "Calle Atocha", poblacion: "Madrid", cp: "28012" },
  { calle: "Calle Fuencarral", poblacion: "Madrid", cp: "28004" },
  { calle: "Calle Hortaleza", poblacion: "Madrid", cp: "28004" },
  { calle: "Calle Mayor", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Arenal", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Preciados", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Grafito", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Silicio", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Cobalto", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Avenida de la Constitucion", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Madrid", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Mayor", poblacion: "Alcala de Henares", cp: "28801" },
  { calle: "Plaza de Cervantes", poblacion: "Alcala de Henares", cp: "28801" },
  { calle: "Via Complutense", poblacion: "Alcala de Henares", cp: "28805" },
  { calle: "Calle Madrid", poblacion: "Getafe", cp: "28901" },
  { calle: "Avenida de Espana", poblacion: "Getafe", cp: "28902" },
  { calle: "Avenida de la Universidad", poblacion: "Leganes", cp: "28911" },
  { calle: "Calle Real", poblacion: "Leganes", cp: "28911" },
  { calle: "Avenida de Portugal", poblacion: "Mostoles", cp: "28931" },
  { calle: "Avenida de Lisboa", poblacion: "Alcorcon", cp: "28922" },
  { calle: "Calle de la Industria", poblacion: "Fuenlabrada", cp: "28943" },
  { calle: "Calle Real", poblacion: "Las Rozas de Madrid", cp: "28231" },
  { calle: "Avenida de Europa", poblacion: "Pozuelo de Alarcon", cp: "28224" },
  { calle: "Calle Gran Via", poblacion: "Majadahonda", cp: "28220" },
  { calle: "Avenida del Siglo XXI", poblacion: "Boadilla del Monte", cp: "28660" },
  { calle: "Paseo de la Chopera", poblacion: "Alcobendas", cp: "28100" },
  { calle: "Calle Real", poblacion: "San Sebastian de los Reyes", cp: "28700" },
  { calle: "Avenida de la Constitucion", poblacion: "Coslada", cp: "28821" },
  { calle: "Avenida de la Tecnica", poblacion: "Rivas-Vaciamadrid", cp: "28521" },
  { calle: "Calle Real", poblacion: "Parla", cp: "28981" },
];

/**
 * Busqueda local de direcciones (fallback cuando Google falla)
 */
function buscarDireccionesLocal(query: string): DireccionSugerida[] {
  const queryLower = query.toLowerCase().trim();
  
  const matchNumero = queryLower.match(/(\d+[a-z]?)$/);
  const numeroBuscado = matchNumero ? matchNumero[1] : '';
  const queryCalleOnly = matchNumero ? queryLower.replace(/\s*\d+[a-z]?$/, '').trim() : queryLower;
  
  const resultados = callesMadrid
    .filter(item => {
      const calleLower = item.calle.toLowerCase();
      return calleLower.includes(queryCalleOnly) || queryCalleOnly.includes(calleLower.replace('calle ', '').replace('avenida ', '').replace('paseo ', '').replace('plaza ', ''));
    })
    .slice(0, 8)
    .map((item, index) => ({
      id: `local-${index}-${Date.now()}`,
      calle: item.calle,
      numero: numeroBuscado,
      codigoPostal: item.cp,
      poblacion: item.poblacion,
      provincia: 'Madrid',
      descripcionCompleta: `${item.calle}${numeroBuscado ? ' ' + numeroBuscado : ''}, ${item.cp} ${item.poblacion}, Madrid`,
      placeId: '',
    }));
  
  return resultados;
}

// Funciones de utilidad para compatibilidad
export function obtenerCPPorPoblacion(poblacion: string): string {
  const item = callesMadrid.find(c => c.poblacion.toLowerCase() === poblacion.toLowerCase());
  return item?.cp || '';
}

export function obtenerProvinciaPorPoblacion(poblacion: string): string {
  return 'Madrid';
}
