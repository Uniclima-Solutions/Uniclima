/**
 * Servicio de Autocompletado de Direcciones
 * Uniclima Solutions - Solo Madrid y alrededores
 * 
 * Usa API routes internas para evitar problemas de CORS con Google Places
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

// Base de datos local de calles de Madrid y alrededores
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
  { calle: "Calle Grafito", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Silicio", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Cobalto", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Titanio", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Cromo", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Niquel", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Avenida de la Constitucion", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Madrid", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Solana", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Plaza Mayor", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Calle Virgen de Loreto", poblacion: "Torrejon de Ardoz", cp: "28850" },
  { calle: "Avenida de Torrejon", poblacion: "Torrejon de Ardoz", cp: "28850" },
  
  // Alcala de Henares
  { calle: "Calle Mayor", poblacion: "Alcala de Henares", cp: "28801" },
  { calle: "Plaza de Cervantes", poblacion: "Alcala de Henares", cp: "28801" },
  { calle: "Calle Libreros", poblacion: "Alcala de Henares", cp: "28801" },
  { calle: "Via Complutense", poblacion: "Alcala de Henares", cp: "28805" },
  { calle: "Calle Santiago", poblacion: "Alcala de Henares", cp: "28801" },
  { calle: "Paseo de la Estacion", poblacion: "Alcala de Henares", cp: "28807" },
  
  // Getafe
  { calle: "Calle Madrid", poblacion: "Getafe", cp: "28901" },
  { calle: "Avenida de Espana", poblacion: "Getafe", cp: "28902" },
  { calle: "Calle Leganes", poblacion: "Getafe", cp: "28901" },
  { calle: "Calle Toledo", poblacion: "Getafe", cp: "28901" },
  
  // Leganes
  { calle: "Avenida de la Universidad", poblacion: "Leganes", cp: "28911" },
  { calle: "Calle Real", poblacion: "Leganes", cp: "28911" },
  { calle: "Plaza de Espana", poblacion: "Leganes", cp: "28911" },
  { calle: "Calle Juan Munoz", poblacion: "Leganes", cp: "28911" },
  
  // Mostoles
  { calle: "Avenida de Portugal", poblacion: "Mostoles", cp: "28931" },
  { calle: "Calle Libertad", poblacion: "Mostoles", cp: "28931" },
  { calle: "Avenida de la Constitucion", poblacion: "Mostoles", cp: "28932" },
  
  // Alcorcon
  { calle: "Avenida de Lisboa", poblacion: "Alcorcon", cp: "28922" },
  { calle: "Calle Mayor", poblacion: "Alcorcon", cp: "28921" },
  { calle: "Avenida de Leganes", poblacion: "Alcorcon", cp: "28923" },
  
  // Fuenlabrada
  { calle: "Calle de la Industria", poblacion: "Fuenlabrada", cp: "28943" },
  { calle: "Avenida de Espana", poblacion: "Fuenlabrada", cp: "28942" },
  { calle: "Calle Leganes", poblacion: "Fuenlabrada", cp: "28941" },
  
  // Las Rozas
  { calle: "Calle Real", poblacion: "Las Rozas de Madrid", cp: "28231" },
  { calle: "Avenida del Camino de Santiago", poblacion: "Las Rozas de Madrid", cp: "28232" },
  { calle: "Calle Comunidad de Madrid", poblacion: "Las Rozas de Madrid", cp: "28230" },
  
  // Pozuelo de Alarcon
  { calle: "Avenida de Europa", poblacion: "Pozuelo de Alarcon", cp: "28224" },
  { calle: "Calle del Prado", poblacion: "Pozuelo de Alarcon", cp: "28223" },
  { calle: "Calle Doctor Marin", poblacion: "Pozuelo de Alarcon", cp: "28223" },
  
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
  { calle: "Calle Real", poblacion: "San Sebastian de los Reyes", cp: "28700" },
  { calle: "Avenida de Espana", poblacion: "San Sebastian de los Reyes", cp: "28701" },
  { calle: "Plaza de la Constitucion", poblacion: "San Sebastian de los Reyes", cp: "28700" },
  
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
 * Buscar direcciones en la base de datos local
 * Incluye numero si el usuario lo escribe
 */
export async function buscarDireccionesMadrid(query: string): Promise<DireccionSugerida[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const queryLower = query.toLowerCase().trim();
  
  // Extraer posible numero de la busqueda
  const matchNumero = queryLower.match(/\s+(\d+[a-z]?)$/i);
  const numeroBuscado = matchNumero ? matchNumero[1] : '';
  const queryCalleOnly = matchNumero ? queryLower.replace(/\s+\d+[a-z]?$/i, '').trim() : queryLower;
  
  // Buscar coincidencias
  const resultados = callesMadrid
    .filter(item => {
      const calleLower = item.calle.toLowerCase();
      const poblacionLower = item.poblacion.toLowerCase();
      
      // Buscar en calle o poblacion
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
  
  return resultados;
}

/**
 * Obtener detalles de un lugar (para compatibilidad)
 */
export async function obtenerDetallesLugar(placeId: string): Promise<PlaceDetails | null> {
  // No hacemos nada porque ya tenemos los datos en la busqueda local
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
