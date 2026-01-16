/**
 * Servicio de Autocompletado de Direcciones
 * Uniclima Solutions - Solo Madrid y alrededores
 * 
 * Usa API routes internas que conectan con Google Places API
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

/**
 * Buscar direcciones usando la API route interna que conecta con Google Places
 */
export async function buscarDireccionesMadrid(query: string): Promise<DireccionSugerida[]> {
  if (!query || query.length < 3) {
    return [];
  }

  try {
    // Llamar a nuestra API route interna
    const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.predictions && data.predictions.length > 0) {
      return data.predictions.map((pred: any, index: number) => {
        // Extraer información de la descripción
        const parts = pred.description.split(',').map((p: string) => p.trim());
        const calleConNumero = parts[0] || '';
        const poblacion = parts[1] || '';
        const provincia = parts.length > 2 ? parts[2] : 'Madrid';
        
        // Intentar extraer número de la calle
        const matchNum = calleConNumero.match(/(\d+[a-z]?)$/i);
        const numero = matchNum ? matchNum[1] : '';
        const calle = matchNum ? calleConNumero.replace(/\s*\d+[a-z]?$/i, '').trim() : calleConNumero;
        
        return {
          id: `google-${index}-${Date.now()}`,
          calle: calle,
          numero: numero,
          codigoPostal: '', // Se obtiene con Place Details
          poblacion: poblacion,
          provincia: provincia.includes('Madrid') ? 'Madrid' : provincia,
          descripcionCompleta: pred.description,
          placeId: pred.place_id,
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error buscando direcciones:', error);
    return [];
  }
}

/**
 * Obtener detalles de un lugar usando la API route interna
 */
export async function obtenerDetallesLugar(placeId: string): Promise<PlaceDetails | null> {
  if (!placeId) return null;
  
  try {
    const response = await fetch(`/api/places/details?place_id=${encodeURIComponent(placeId)}`);
    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      return {
        codigoPostal: data.result.codigoPostal || '',
        poblacion: data.result.poblacion || '',
        provincia: data.result.provincia || 'Madrid',
        calle: data.result.calle || '',
        numero: data.result.numero || '',
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo detalles:', error);
    return null;
  }
}

// Funciones de utilidad (para compatibilidad)
export function obtenerCPPorPoblacion(poblacion: string): string {
  return '';
}

export function obtenerProvinciaPorPoblacion(poblacion: string): string {
  return 'Madrid';
}
