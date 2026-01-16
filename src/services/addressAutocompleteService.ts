/**
 * Servicio de Autocompletado de Direcciones
 * Uniclima Solutions - Solo Madrid y alrededores
 * 
 * Usa Google Places API con la clave proporcionada
 */

// Tipos para las respuestas
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
const GOOGLE_PLACES_API_KEY = 'AIzaSyBUJn38ODr8aJRn8UTnkni4eQQpAm41xfc';

// Municipios de Madrid y alrededores donde trabajamos
const municipiosMadrid = [
  'Madrid', 'Torrejón de Ardoz', 'Torrejon de Ardoz', 'Alcalá de Henares', 'Alcala de Henares',
  'Getafe', 'Leganés', 'Leganes', 'Móstoles', 'Mostoles', 'Alcorcón', 'Alcorcon',
  'Fuenlabrada', 'Parla', 'Alcobendas', 'San Sebastián de los Reyes', 'San Sebastian de los Reyes',
  'Coslada', 'Rivas-Vaciamadrid', 'Rivas Vaciamadrid', 'Las Rozas', 'Las Rozas de Madrid',
  'Pozuelo de Alarcón', 'Pozuelo de Alarcon', 'Majadahonda', 'Boadilla del Monte',
  'Tres Cantos', 'Valdemoro', 'Pinto', 'Arganda del Rey', 'San Fernando de Henares',
  'Mejorada del Campo', 'Velilla de San Antonio', 'Loeches', 'Torres de la Alameda',
  'Ajalvir', 'Daganzo de Arriba', 'Paracuellos de Jarama', 'Algete', 'Colmenar Viejo'
];

// Base de datos local de calles de Madrid y alrededores (fallback)
const callesMadrid: { calle: string; poblacion: string; cp: string }[] = [
  // Madrid Centro
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
  { calle: "Calle Montera", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Carmen", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Embajadores", poblacion: "Madrid", cp: "28012" },
  { calle: "Calle Toledo", poblacion: "Madrid", cp: "28005" },
  { calle: "Calle Bailen", poblacion: "Madrid", cp: "28013" },
  { calle: "Calle Princesa", poblacion: "Madrid", cp: "28008" },
  { calle: "Calle Alberto Aguilera", poblacion: "Madrid", cp: "28015" },
  { calle: "Calle San Bernardo", poblacion: "Madrid", cp: "28015" },
  { calle: "Calle Orense", poblacion: "Madrid", cp: "28020" },
  { calle: "Calle Arturo Soria", poblacion: "Madrid", cp: "28027" },
  { calle: "Calle Lopez de Hoyos", poblacion: "Madrid", cp: "28002" },
  { calle: "Avenida de America", poblacion: "Madrid", cp: "28002" },
  { calle: "Calle O'Donnell", poblacion: "Madrid", cp: "28009" },
  { calle: "Calle Narvaez", poblacion: "Madrid", cp: "28009" },
  { calle: "Calle Doctor Esquerdo", poblacion: "Madrid", cp: "28007" },
  
  // Torrejon de Ardoz
  { calle: "Calle Grafito", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Silicio", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Cobalto", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Titanio", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Cromo", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Niquel", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Avenida de la Constitucion", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Madrid", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Solana", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Plaza Mayor", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Calle Virgen de Loreto", poblacion: "Torrejón de Ardoz", cp: "28850" },
  { calle: "Avenida de Torrejon", poblacion: "Torrejón de Ardoz", cp: "28850" },
  
  // Alcala de Henares
  { calle: "Calle Mayor", poblacion: "Alcalá de Henares", cp: "28801" },
  { calle: "Plaza de Cervantes", poblacion: "Alcalá de Henares", cp: "28801" },
  { calle: "Calle Libreros", poblacion: "Alcalá de Henares", cp: "28801" },
  { calle: "Via Complutense", poblacion: "Alcalá de Henares", cp: "28805" },
  { calle: "Calle Santiago", poblacion: "Alcalá de Henares", cp: "28801" },
  { calle: "Paseo de la Estacion", poblacion: "Alcalá de Henares", cp: "28807" },
  
  // Getafe
  { calle: "Calle Madrid", poblacion: "Getafe", cp: "28901" },
  { calle: "Avenida de Espana", poblacion: "Getafe", cp: "28902" },
  { calle: "Calle Leganes", poblacion: "Getafe", cp: "28901" },
  { calle: "Calle Toledo", poblacion: "Getafe", cp: "28901" },
  
  // Leganes
  { calle: "Avenida de la Universidad", poblacion: "Leganés", cp: "28911" },
  { calle: "Calle Real", poblacion: "Leganés", cp: "28911" },
  { calle: "Plaza de Espana", poblacion: "Leganés", cp: "28911" },
  { calle: "Calle Juan Munoz", poblacion: "Leganés", cp: "28911" },
  
  // Mostoles
  { calle: "Avenida de Portugal", poblacion: "Móstoles", cp: "28931" },
  { calle: "Calle Libertad", poblacion: "Móstoles", cp: "28931" },
  { calle: "Avenida de la Constitucion", poblacion: "Móstoles", cp: "28932" },
  
  // Alcorcon
  { calle: "Avenida de Lisboa", poblacion: "Alcorcón", cp: "28922" },
  { calle: "Calle Mayor", poblacion: "Alcorcón", cp: "28921" },
  { calle: "Avenida de Leganes", poblacion: "Alcorcón", cp: "28923" },
  
  // Fuenlabrada
  { calle: "Calle de la Industria", poblacion: "Fuenlabrada", cp: "28943" },
  { calle: "Avenida de Espana", poblacion: "Fuenlabrada", cp: "28942" },
  { calle: "Calle Leganes", poblacion: "Fuenlabrada", cp: "28941" },
  
  // Las Rozas
  { calle: "Calle Real", poblacion: "Las Rozas de Madrid", cp: "28231" },
  { calle: "Avenida del Camino de Santiago", poblacion: "Las Rozas de Madrid", cp: "28232" },
  { calle: "Calle Comunidad de Madrid", poblacion: "Las Rozas de Madrid", cp: "28230" },
  
  // Pozuelo de Alarcon
  { calle: "Avenida de Europa", poblacion: "Pozuelo de Alarcón", cp: "28224" },
  { calle: "Calle del Prado", poblacion: "Pozuelo de Alarcón", cp: "28223" },
  { calle: "Calle Doctor Marin", poblacion: "Pozuelo de Alarcón", cp: "28223" },
  
  // Majadahonda
  { calle: "Calle Gran Via", poblacion: "Majadahonda", cp: "28220" },
  { calle: "Avenida de Espana", poblacion: "Majadahonda", cp: "28220" },
  { calle: "Calle Norias", poblacion: "Majadahonda", cp: "28220" },
  
  // Boadilla del Monte
  { calle: "Avenida del Siglo XXI", poblacion: "Boadilla del Monte", cp: "28660" },
  { calle: "Calle Infante Don Luis", poblacion: "Boadilla del Monte", cp: "28660" },
  { calle: "Calle Real", poblacion: "Boadilla del Monte", cp: "28660" },
  
  // Alcobendas
  { calle: "Paseo de la Chopera", poblacion: "Alcobendas", cp: "28100" },
  { calle: "Avenida de Espana", poblacion: "Alcobendas", cp: "28100" },
  { calle: "Calle Marques de la Valdavia", poblacion: "Alcobendas", cp: "28100" },
  
  // San Sebastian de los Reyes
  { calle: "Calle Real", poblacion: "San Sebastián de los Reyes", cp: "28700" },
  { calle: "Avenida de Espana", poblacion: "San Sebastián de los Reyes", cp: "28701" },
  { calle: "Plaza de la Constitucion", poblacion: "San Sebastián de los Reyes", cp: "28700" },
  
  // Coslada
  { calle: "Avenida de la Constitucion", poblacion: "Coslada", cp: "28821" },
  { calle: "Calle del Mar", poblacion: "Coslada", cp: "28822" },
  { calle: "Calle Brasil", poblacion: "Coslada", cp: "28821" },
  
  // Rivas-Vaciamadrid
  { calle: "Avenida de la Tecnica", poblacion: "Rivas-Vaciamadrid", cp: "28521" },
  { calle: "Calle Pablo Iglesias", poblacion: "Rivas-Vaciamadrid", cp: "28522" },
  { calle: "Avenida de Levante", poblacion: "Rivas-Vaciamadrid", cp: "28523" },
  
  // Parla
  { calle: "Calle Real", poblacion: "Parla", cp: "28981" },
  { calle: "Avenida de Madrid", poblacion: "Parla", cp: "28980" },
  { calle: "Calle Pinto", poblacion: "Parla", cp: "28981" },
  
  // San Fernando de Henares
  { calle: "Calle Real", poblacion: "San Fernando de Henares", cp: "28830" },
  { calle: "Avenida de Castilla", poblacion: "San Fernando de Henares", cp: "28830" },
  
  // Arganda del Rey
  { calle: "Calle Real", poblacion: "Arganda del Rey", cp: "28500" },
  { calle: "Avenida del Ejercito", poblacion: "Arganda del Rey", cp: "28500" },
  
  // Tres Cantos
  { calle: "Avenida de los Labradores", poblacion: "Tres Cantos", cp: "28760" },
  { calle: "Calle Sector Oficios", poblacion: "Tres Cantos", cp: "28760" },
  
  // Valdemoro
  { calle: "Calle Estrella de Elola", poblacion: "Valdemoro", cp: "28341" },
  { calle: "Avenida de Espana", poblacion: "Valdemoro", cp: "28340" },
  
  // Pinto
  { calle: "Calle Real", poblacion: "Pinto", cp: "28320" },
  { calle: "Avenida de Madrid", poblacion: "Pinto", cp: "28320" },
];

/**
 * Buscar direcciones usando Google Places Autocomplete API
 */
export async function buscarDireccionesMadrid(query: string): Promise<DireccionSugerida[]> {
  if (!query || query.length < 3) {
    return [];
  }

  const queryLower = query.toLowerCase().trim();
  
  // Extraer posible numero de la busqueda
  const matchNumero = queryLower.match(/\s+(\d+[a-z]?)$/i);
  const numeroBuscado = matchNumero ? matchNumero[1] : '';
  const queryCalleOnly = matchNumero ? queryLower.replace(/\s+\d+[a-z]?$/i, '').trim() : queryLower;

  try {
    // Intentar con Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=address&components=country:es&location=40.4168,-3.7038&radius=50000&language=es&key=${GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.predictions && data.predictions.length > 0) {
      // Filtrar solo direcciones de Madrid y alrededores
      const resultadosFiltrados = data.predictions
        .filter((pred: any) => {
          const desc = pred.description.toLowerCase();
          return municipiosMadrid.some(m => desc.includes(m.toLowerCase())) || desc.includes('madrid');
        })
        .slice(0, 8)
        .map((pred: any, index: number) => {
          // Extraer información de la descripción
          const parts = pred.description.split(',').map((p: string) => p.trim());
          const calleConNumero = parts[0] || '';
          const poblacion = parts[1] || '';
          
          // Intentar extraer número de la calle
          const matchNum = calleConNumero.match(/(\d+[a-z]?)$/i);
          const numero = matchNum ? matchNum[1] : numeroBuscado;
          const calle = matchNum ? calleConNumero.replace(/\s*\d+[a-z]?$/i, '').trim() : calleConNumero;
          
          return {
            id: `google-${index}-${Date.now()}`,
            calle: calle,
            numero: numero,
            codigoPostal: '', // Se obtiene con Place Details
            poblacion: poblacion,
            provincia: 'Madrid',
            descripcionCompleta: pred.description,
            placeId: pred.place_id,
          };
        });
      
      if (resultadosFiltrados.length > 0) {
        return resultadosFiltrados;
      }
    }
  } catch (error) {
    console.error('Error con Google Places API:', error);
  }
  
  // Fallback: usar base de datos local
  const resultadosLocales = callesMadrid
    .filter(item => {
      const calleLower = item.calle.toLowerCase();
      const poblacionLower = item.poblacion.toLowerCase();
      
      return calleLower.includes(queryCalleOnly) || 
             poblacionLower.includes(queryCalleOnly) ||
             queryCalleOnly.includes(calleLower.replace('calle ', '').replace('avenida ', '').replace('paseo ', '').replace('plaza ', ''));
    })
    .slice(0, 10)
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
  
  return resultadosLocales;
}

/**
 * Obtener detalles de un lugar usando Google Places Details API
 */
export async function obtenerDetallesLugar(placeId: string): Promise<PlaceDetails | null> {
  if (!placeId) return null;
  
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components,formatted_address&language=es&key=${GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      const components = data.result.address_components || [];
      
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
        poblacion,
        provincia: provincia || 'Madrid',
        calle,
        numero,
      };
    }
  } catch (error) {
    console.error('Error obteniendo detalles de Google Places:', error);
  }
  
  return null;
}

// Funciones de utilidad
export function obtenerCPPorPoblacion(poblacion: string): string {
  const item = callesMadrid.find(c => c.poblacion.toLowerCase() === poblacion.toLowerCase());
  return item?.cp || '';
}

export function obtenerProvinciaPorPoblacion(poblacion: string): string {
  return 'Madrid';
}
