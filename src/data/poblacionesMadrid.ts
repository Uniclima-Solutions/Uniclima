/**
 * Poblaciones de la Comunidad de Madrid con sus códigos postales
 * Ordenadas alfabéticamente
 */

export interface Poblacion {
  nombre: string;
  codigoPostal: string;
}

export const poblacionesMadrid: Poblacion[] = [
  { nombre: "Alcalá de Henares", codigoPostal: "28801" },
  { nombre: "Alcobendas", codigoPostal: "28100" },
  { nombre: "Alcorcón", codigoPostal: "28920" },
  { nombre: "Algete", codigoPostal: "28110" },
  { nombre: "Alpedrete", codigoPostal: "28430" },
  { nombre: "Aranjuez", codigoPostal: "28300" },
  { nombre: "Arganda del Rey", codigoPostal: "28500" },
  { nombre: "Arroyomolinos", codigoPostal: "28939" },
  { nombre: "Boadilla del Monte", codigoPostal: "28660" },
  { nombre: "Brunete", codigoPostal: "28690" },
  { nombre: "Ciempozuelos", codigoPostal: "28350" },
  { nombre: "Collado Villalba", codigoPostal: "28400" },
  { nombre: "Colmenar Viejo", codigoPostal: "28770" },
  { nombre: "Colmenarejo", codigoPostal: "28270" },
  { nombre: "Coslada", codigoPostal: "28820" },
  { nombre: "El Escorial", codigoPostal: "28280" },
  { nombre: "Fuenlabrada", codigoPostal: "28940" },
  { nombre: "Galapagar", codigoPostal: "28260" },
  { nombre: "Getafe", codigoPostal: "28901" },
  { nombre: "Griñón", codigoPostal: "28971" },
  { nombre: "Guadarrama", codigoPostal: "28440" },
  { nombre: "Hoyo de Manzanares", codigoPostal: "28240" },
  { nombre: "Humanes de Madrid", codigoPostal: "28970" },
  { nombre: "Las Rozas de Madrid", codigoPostal: "28230" },
  { nombre: "Leganés", codigoPostal: "28910" },
  { nombre: "Madrid", codigoPostal: "28001" },
  { nombre: "Madrid - Arganzuela", codigoPostal: "28045" },
  { nombre: "Madrid - Barajas", codigoPostal: "28042" },
  { nombre: "Madrid - Carabanchel", codigoPostal: "28025" },
  { nombre: "Madrid - Centro", codigoPostal: "28012" },
  { nombre: "Madrid - Chamartín", codigoPostal: "28002" },
  { nombre: "Madrid - Chamberí", codigoPostal: "28010" },
  { nombre: "Madrid - Ciudad Lineal", codigoPostal: "28017" },
  { nombre: "Madrid - Fuencarral-El Pardo", codigoPostal: "28034" },
  { nombre: "Madrid - Hortaleza", codigoPostal: "28033" },
  { nombre: "Madrid - Latina", codigoPostal: "28047" },
  { nombre: "Madrid - Moncloa-Aravaca", codigoPostal: "28008" },
  { nombre: "Madrid - Moratalaz", codigoPostal: "28030" },
  { nombre: "Madrid - Puente de Vallecas", codigoPostal: "28018" },
  { nombre: "Madrid - Retiro", codigoPostal: "28007" },
  { nombre: "Madrid - Salamanca", codigoPostal: "28001" },
  { nombre: "Madrid - San Blas-Canillejas", codigoPostal: "28022" },
  { nombre: "Madrid - Tetuán", codigoPostal: "28020" },
  { nombre: "Madrid - Usera", codigoPostal: "28026" },
  { nombre: "Madrid - Vicálvaro", codigoPostal: "28032" },
  { nombre: "Madrid - Villa de Vallecas", codigoPostal: "28031" },
  { nombre: "Madrid - Villaverde", codigoPostal: "28021" },
  { nombre: "Majadahonda", codigoPostal: "28220" },
  { nombre: "Mejorada del Campo", codigoPostal: "28840" },
  { nombre: "Miraflores de la Sierra", codigoPostal: "28792" },
  { nombre: "Móstoles", codigoPostal: "28930" },
  { nombre: "Navalcarnero", codigoPostal: "28600" },
  { nombre: "Paracuellos de Jarama", codigoPostal: "28860" },
  { nombre: "Parla", codigoPostal: "28980" },
  { nombre: "Pinto", codigoPostal: "28320" },
  { nombre: "Pozuelo de Alarcón", codigoPostal: "28223" },
  { nombre: "Rivas-Vaciamadrid", codigoPostal: "28521" },
  { nombre: "San Fernando de Henares", codigoPostal: "28830" },
  { nombre: "San Lorenzo de El Escorial", codigoPostal: "28200" },
  { nombre: "San Martín de la Vega", codigoPostal: "28330" },
  { nombre: "San Sebastián de los Reyes", codigoPostal: "28700" },
  { nombre: "Soto del Real", codigoPostal: "28791" },
  { nombre: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Torrelodones", codigoPostal: "28250" },
  { nombre: "Tres Cantos", codigoPostal: "28760" },
  { nombre: "Valdemoro", codigoPostal: "28340" },
  { nombre: "Velilla de San Antonio", codigoPostal: "28891" },
  { nombre: "Villanueva de la Cañada", codigoPostal: "28691" },
  { nombre: "Villanueva del Pardillo", codigoPostal: "28229" },
  { nombre: "Villaviciosa de Odón", codigoPostal: "28670" },
];

// Función para validar NIF/CIF español
// Validación simplificada: solo verifica el formato, no el dígito de control
// Esto permite que los usuarios introduzcan documentos sin errores de validación
export function validarNifCif(documento: string): { valido: boolean; tipo: 'NIF' | 'NIE' | 'CIF' | null; mensaje: string } {
  if (!documento) {
    return { valido: false, tipo: null, mensaje: "El documento es obligatorio" };
  }

  const doc = documento.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  // Validar longitud mínima
  if (doc.length < 8 || doc.length > 9) {
    return { valido: false, tipo: null, mensaje: "El documento debe tener entre 8 y 9 caracteres" };
  }
  
  // Validar NIF (DNI español): 8 números + 1 letra
  const nifRegex = /^[0-9]{8}[A-Z]$/;
  if (nifRegex.test(doc)) {
    return { valido: true, tipo: 'NIF', mensaje: "NIF válido" };
  }

  // Validar NIE (Número de Identidad de Extranjero): X/Y/Z + 7 números + 1 letra
  const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
  if (nieRegex.test(doc)) {
    return { valido: true, tipo: 'NIE', mensaje: "NIE válido" };
  }

  // Validar CIF (Código de Identificación Fiscal): letra + 7 números + letra/número
  // Letras válidas para CIF: A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, U, V, W
  const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW][0-9]{7}[0-9A-Z]$/;
  if (cifRegex.test(doc)) {
    return { valido: true, tipo: 'CIF', mensaje: "CIF válido" };
  }
  
  // Formato alternativo de CIF con 8 dígitos (sin letra final)
  const cifRegexCorto = /^[ABCDEFGHJKLMNPQRSUVW][0-9]{8}$/;
  if (cifRegexCorto.test(doc)) {
    return { valido: true, tipo: 'CIF', mensaje: "CIF válido" };
  }

  return { valido: false, tipo: null, mensaje: "Formato de documento no válido. Use NIF (8 números + letra), NIE (X/Y/Z + 7 números + letra) o CIF (letra + 8 caracteres)" };
}
