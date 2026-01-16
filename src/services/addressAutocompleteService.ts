/**
 * Servicio de Autocompletado de Direcciones
 * SOLO Madrid y alrededores - Datos locales + Nominatim
 * 
 * Uniclima Solutions - Zona de cobertura exclusiva
 */

// Poblaciones de Madrid y alrededores con sus códigos postales
export const poblacionesMadridConCP: { nombre: string; cp: string; provincia: string }[] = [
  // Madrid Capital
  { nombre: "Madrid", cp: "28001", provincia: "Madrid" },
  
  // Corredor del Henares
  { nombre: "Torrejón de Ardoz", cp: "28850", provincia: "Madrid" },
  { nombre: "Alcalá de Henares", cp: "28801", provincia: "Madrid" },
  { nombre: "San Fernando de Henares", cp: "28830", provincia: "Madrid" },
  { nombre: "Coslada", cp: "28820", provincia: "Madrid" },
  { nombre: "Mejorada del Campo", cp: "28840", provincia: "Madrid" },
  { nombre: "Velilla de San Antonio", cp: "28891", provincia: "Madrid" },
  { nombre: "Loeches", cp: "28890", provincia: "Madrid" },
  { nombre: "Torres de la Alameda", cp: "28813", provincia: "Madrid" },
  { nombre: "Ajalvir", cp: "28864", provincia: "Madrid" },
  { nombre: "Daganzo de Arriba", cp: "28814", provincia: "Madrid" },
  { nombre: "Paracuellos de Jarama", cp: "28860", provincia: "Madrid" },
  { nombre: "Meco", cp: "28880", provincia: "Madrid" },
  
  // Zona Norte
  { nombre: "Alcobendas", cp: "28100", provincia: "Madrid" },
  { nombre: "San Sebastián de los Reyes", cp: "28700", provincia: "Madrid" },
  { nombre: "Tres Cantos", cp: "28760", provincia: "Madrid" },
  { nombre: "Colmenar Viejo", cp: "28770", provincia: "Madrid" },
  { nombre: "Algete", cp: "28110", provincia: "Madrid" },
  { nombre: "Cobeña", cp: "28863", provincia: "Madrid" },
  { nombre: "Fuente el Saz de Jarama", cp: "28140", provincia: "Madrid" },
  { nombre: "El Molar", cp: "28710", provincia: "Madrid" },
  { nombre: "San Agustín del Guadalix", cp: "28750", provincia: "Madrid" },
  { nombre: "Soto del Real", cp: "28791", provincia: "Madrid" },
  
  // Zona Sur
  { nombre: "Getafe", cp: "28901", provincia: "Madrid" },
  { nombre: "Leganés", cp: "28911", provincia: "Madrid" },
  { nombre: "Alcorcón", cp: "28920", provincia: "Madrid" },
  { nombre: "Móstoles", cp: "28930", provincia: "Madrid" },
  { nombre: "Fuenlabrada", cp: "28940", provincia: "Madrid" },
  { nombre: "Parla", cp: "28980", provincia: "Madrid" },
  { nombre: "Pinto", cp: "28320", provincia: "Madrid" },
  { nombre: "Valdemoro", cp: "28340", provincia: "Madrid" },
  { nombre: "Ciempozuelos", cp: "28350", provincia: "Madrid" },
  { nombre: "San Martín de la Vega", cp: "28330", provincia: "Madrid" },
  { nombre: "Arganda del Rey", cp: "28500", provincia: "Madrid" },
  { nombre: "Rivas-Vaciamadrid", cp: "28521", provincia: "Madrid" },
  { nombre: "Humanes de Madrid", cp: "28970", provincia: "Madrid" },
  
  // Zona Oeste
  { nombre: "Pozuelo de Alarcón", cp: "28223", provincia: "Madrid" },
  { nombre: "Majadahonda", cp: "28220", provincia: "Madrid" },
  { nombre: "Las Rozas de Madrid", cp: "28230", provincia: "Madrid" },
  { nombre: "Boadilla del Monte", cp: "28660", provincia: "Madrid" },
  { nombre: "Villanueva de la Cañada", cp: "28691", provincia: "Madrid" },
  { nombre: "Villanueva del Pardillo", cp: "28229", provincia: "Madrid" },
  { nombre: "Brunete", cp: "28690", provincia: "Madrid" },
  { nombre: "Villaviciosa de Odón", cp: "28670", provincia: "Madrid" },
  { nombre: "Arroyomolinos", cp: "28939", provincia: "Madrid" },
  { nombre: "Navalcarnero", cp: "28600", provincia: "Madrid" },
  { nombre: "El Escorial", cp: "28280", provincia: "Madrid" },
  { nombre: "San Lorenzo de El Escorial", cp: "28200", provincia: "Madrid" },
  { nombre: "Galapagar", cp: "28260", provincia: "Madrid" },
  { nombre: "Torrelodones", cp: "28250", provincia: "Madrid" },
  { nombre: "Collado Villalba", cp: "28400", provincia: "Madrid" },
  
  // Guadalajara cercana
  { nombre: "Azuqueca de Henares", cp: "19200", provincia: "Guadalajara" },
  { nombre: "Guadalajara", cp: "19001", provincia: "Guadalajara" },
  { nombre: "Alovera", cp: "19208", provincia: "Guadalajara" },
  { nombre: "Cabanillas del Campo", cp: "19171", provincia: "Guadalajara" },
  
  // Toledo cercano
  { nombre: "Illescas", cp: "45200", provincia: "Toledo" },
  { nombre: "Seseña", cp: "45223", provincia: "Toledo" },
];

export interface DireccionSugerida {
  id: string;
  direccionCompleta: string;
  calle: string;
  numero: string;
  codigoPostal: string;
  poblacion: string;
  provincia: string;
}

/**
 * Buscar direcciones en Madrid y alrededores usando Nominatim
 */
export async function buscarDireccionesMadrid(query: string): Promise<DireccionSugerida[]> {
  if (!query || query.length < 3) return [];
  
  const resultados: DireccionSugerida[] = [];
  
  // Extraer posible número de la búsqueda
  const matchNumero = query.match(/(\d+)/);
  const numero = matchNumero ? matchNumero[1] : "";
  
  try {
    // Buscar en Nominatim - Solo Madrid y alrededores
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Madrid, España')}&addressdetails=1&limit=8&countrycodes=es&bounded=1&viewbox=-4.5,41.5,-3.0,40.0`;
    
    const response = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'Uniclima-Solutions/1.0',
        'Accept-Language': 'es'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      
      for (const item of data) {
        const address = item.address || {};
        let poblacion = address.city || address.town || address.village || address.municipality || '';
        let provincia = address.state || address.province || '';
        let cp = address.postcode || '';
        
        // Limpiar provincia
        provincia = provincia.replace('Comunidad de ', '').replace('Provincia de ', '');
        
        // Verificar que está en zona de cobertura
        const enZona = provincia.toLowerCase().includes('madrid') || 
                       provincia.toLowerCase().includes('guadalajara') || 
                       provincia.toLowerCase().includes('toledo') ||
                       poblacionesMadridConCP.some(p => 
                         poblacion.toLowerCase().includes(p.nombre.toLowerCase()) ||
                         p.nombre.toLowerCase().includes(poblacion.toLowerCase())
                       );
        
        if (!enZona) continue;
        
        // Si no hay CP, buscar en nuestra base de datos
        if (!cp && poblacion) {
          const pobLocal = poblacionesMadridConCP.find(p => 
            p.nombre.toLowerCase() === poblacion.toLowerCase() ||
            poblacion.toLowerCase().includes(p.nombre.toLowerCase())
          );
          if (pobLocal) {
            cp = pobLocal.cp;
            provincia = pobLocal.provincia;
          }
        }
        
        // Si no hay población, usar Madrid
        if (!poblacion) {
          poblacion = 'Madrid';
          provincia = 'Madrid';
        }
        
        const road = address.road || address.pedestrian || address.street || '';
        const houseNumber = address.house_number || numero || '';
        
        if (road) {
          resultados.push({
            id: `nom-${item.place_id}`,
            direccionCompleta: `${road}${houseNumber ? ' ' + houseNumber : ''}, ${cp ? cp + ' ' : ''}${poblacion}`,
            calle: road,
            numero: houseNumber,
            codigoPostal: cp,
            poblacion: poblacion,
            provincia: provincia || 'Madrid'
          });
        }
      }
    }
  } catch (error) {
    console.error('Error buscando direcciones:', error);
  }
  
  // Si no hay resultados de Nominatim, generar sugerencias locales
  if (resultados.length === 0) {
    const queryLower = query.toLowerCase();
    
    // Buscar poblaciones que coincidan
    const poblacionesCoincidentes = poblacionesMadridConCP.filter(p =>
      p.nombre.toLowerCase().includes(queryLower) ||
      queryLower.includes(p.nombre.toLowerCase().split(' ')[0])
    );
    
    for (const pob of poblacionesCoincidentes.slice(0, 5)) {
      resultados.push({
        id: `local-${pob.nombre}`,
        direccionCompleta: `${query}, ${pob.cp} ${pob.nombre}`,
        calle: query.replace(/\d+/g, '').trim(),
        numero: numero,
        codigoPostal: pob.cp,
        poblacion: pob.nombre,
        provincia: pob.provincia
      });
    }
    
    // Si aún no hay resultados, sugerir Madrid
    if (resultados.length === 0) {
      resultados.push({
        id: 'default-madrid',
        direccionCompleta: `${query}, Madrid`,
        calle: query.replace(/\d+/g, '').trim(),
        numero: numero,
        codigoPostal: '',
        poblacion: 'Madrid',
        provincia: 'Madrid'
      });
    }
  }
  
  // Eliminar duplicados
  const vistos = new Set<string>();
  return resultados.filter(r => {
    const key = r.direccionCompleta.toLowerCase();
    if (vistos.has(key)) return false;
    vistos.add(key);
    return true;
  }).slice(0, 8);
}

/**
 * Obtener código postal por población
 */
export function obtenerCPPorPoblacion(poblacion: string): string {
  const pob = poblacionesMadridConCP.find(p => 
    p.nombre.toLowerCase() === poblacion.toLowerCase() ||
    p.nombre.toLowerCase().includes(poblacion.toLowerCase())
  );
  return pob?.cp || '';
}

/**
 * Obtener provincia por población
 */
export function obtenerProvinciaPorPoblacion(poblacion: string): string {
  const pob = poblacionesMadridConCP.find(p => 
    p.nombre.toLowerCase() === poblacion.toLowerCase() ||
    p.nombre.toLowerCase().includes(poblacion.toLowerCase())
  );
  return pob?.provincia || 'Madrid';
}
