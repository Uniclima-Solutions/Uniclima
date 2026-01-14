/**
 * Base de datos de calles de la Comunidad de Madrid
 * Incluye calles principales de Madrid capital y municipios
 * Para autocompletado de direcciones
 */

export interface Calle {
  nombre: string;
  tipo: string; // Calle, Avenida, Plaza, Paseo, etc.
  poblacion: string;
  codigoPostal: string;
}

// Calles de Madrid Capital organizadas por distritos
export const callesMadrid: Calle[] = [
  // CENTRO
  { nombre: "Gran Vía", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28013" },
  { nombre: "Mayor", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28012" },
  { nombre: "Alcalá", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28014" },
  { nombre: "Preciados", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28013" },
  { nombre: "Arenal", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28013" },
  { nombre: "Montera", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28013" },
  { nombre: "Fuencarral", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28004" },
  { nombre: "Hortaleza", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28004" },
  { nombre: "Atocha", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28012" },
  { nombre: "Sol", tipo: "Puerta del", poblacion: "Madrid", codigoPostal: "28013" },
  { nombre: "Plaza Mayor", tipo: "Plaza", poblacion: "Madrid", codigoPostal: "28012" },
  { nombre: "Cibeles", tipo: "Plaza de", poblacion: "Madrid", codigoPostal: "28014" },
  { nombre: "España", tipo: "Plaza de", poblacion: "Madrid", codigoPostal: "28008" },
  { nombre: "Callao", tipo: "Plaza del", poblacion: "Madrid", codigoPostal: "28013" },
  
  // SALAMANCA
  { nombre: "Serrano", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Velázquez", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Goya", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Príncipe de Vergara", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Castellana", tipo: "Paseo de la", poblacion: "Madrid", codigoPostal: "28046" },
  { nombre: "Ortega y Gasset", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28006" },
  { nombre: "Claudio Coello", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Jorge Juan", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Lagasca", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  { nombre: "Núñez de Balboa", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28001" },
  
  // CHAMBERÍ
  { nombre: "Santa Engracia", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28010" },
  { nombre: "Bravo Murillo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28015" },
  { nombre: "Alberto Aguilera", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28015" },
  { nombre: "Eloy Gonzalo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28010" },
  { nombre: "Ríos Rosas", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28003" },
  { nombre: "Olavide", tipo: "Plaza de", poblacion: "Madrid", codigoPostal: "28010" },
  { nombre: "Alonso Cano", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28003" },
  { nombre: "Ponzano", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28003" },
  
  // CHAMARTÍN
  { nombre: "Arturo Soria", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28002" },
  { nombre: "Padre Damián", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28036" },
  { nombre: "Costa Rica", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28016" },
  { nombre: "López de Hoyos", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28002" },
  { nombre: "María de Molina", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28006" },
  { nombre: "Doctor Fleming", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28036" },
  { nombre: "Concha Espina", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28016" },
  
  // TETUÁN
  { nombre: "Orense", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28020" },
  { nombre: "Raimundo Fernández Villaverde", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28003" },
  { nombre: "General Perón", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28020" },
  { nombre: "Capitán Haya", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28020" },
  { nombre: "Azca", tipo: "Centro Comercial", poblacion: "Madrid", codigoPostal: "28020" },
  
  // MONCLOA-ARAVACA
  { nombre: "Princesa", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28008" },
  { nombre: "Isaac Peral", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28040" },
  { nombre: "Meléndez Valdés", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28015" },
  { nombre: "Gaztambide", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28015" },
  { nombre: "Hilarión Eslava", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28015" },
  { nombre: "Fernández de los Ríos", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28015" },
  { nombre: "Moncloa", tipo: "Plaza de", poblacion: "Madrid", codigoPostal: "28040" },
  
  // LATINA
  { nombre: "Caramuel", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28011" },
  { nombre: "Segovia", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28005" },
  { nombre: "Toledo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28005" },
  { nombre: "Puerta de Toledo", tipo: "Glorieta de la", poblacion: "Madrid", codigoPostal: "28005" },
  { nombre: "Latina", tipo: "Plaza de la", poblacion: "Madrid", codigoPostal: "28005" },
  
  // CARABANCHEL
  { nombre: "General Ricardos", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28019" },
  { nombre: "Oporto", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28019" },
  { nombre: "Eugenia de Montijo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28025" },
  { nombre: "Carabanchel Alto", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28044" },
  { nombre: "Vía Carpetana", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28047" },
  
  // USERA
  { nombre: "Marcelo Usera", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28026" },
  { nombre: "Olvido", tipo: "Calle del", poblacion: "Madrid", codigoPostal: "28026" },
  { nombre: "Amparo Usera", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28026" },
  
  // PUENTE DE VALLECAS
  { nombre: "Vallecas", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28018" },
  { nombre: "Puerto de Canfranc", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28038" },
  { nombre: "Sierra Toledana", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28031" },
  { nombre: "Monte Igueldo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28018" },
  
  // MORATALAZ
  { nombre: "Hacienda de Pavones", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28030" },
  { nombre: "Camino de los Vinateros", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28030" },
  { nombre: "Arroyo de la Media Legua", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28030" },
  
  // CIUDAD LINEAL
  { nombre: "Hermanos García Noblejas", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28037" },
  { nombre: "Alcalá", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28027" },
  { nombre: "Pueblo Nuevo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28032" },
  
  // HORTALEZA
  { nombre: "Hortaleza", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28033" },
  { nombre: "Mar de Cristal", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28033" },
  { nombre: "Pinar del Rey", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28033" },
  { nombre: "Sanchinarro", tipo: "Barrio de", poblacion: "Madrid", codigoPostal: "28050" },
  
  // VILLAVERDE
  { nombre: "Villaverde", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28021" },
  { nombre: "San Cristóbal", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28021" },
  { nombre: "Andalucía", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28041" },
  
  // VILLA DE VALLECAS
  { nombre: "Congosto", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28031" },
  { nombre: "Ensanche de Vallecas", tipo: "Barrio", poblacion: "Madrid", codigoPostal: "28051" },
  
  // SAN BLAS-CANILLEJAS
  { nombre: "Canillejas", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28022" },
  { nombre: "Julián Camarillo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28037" },
  { nombre: "Las Mercedes", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28022" },
  
  // BARAJAS
  { nombre: "Barajas", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28042" },
  { nombre: "Logroño", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28042" },
  { nombre: "Timón", tipo: "Calle del", poblacion: "Madrid", codigoPostal: "28042" },
  
  // RETIRO
  { nombre: "Ibiza", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28009" },
  { nombre: "Narváez", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28009" },
  { nombre: "Doctor Esquerdo", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28007" },
  { nombre: "Menéndez Pelayo", tipo: "Avenida de", poblacion: "Madrid", codigoPostal: "28007" },
  { nombre: "Retiro", tipo: "Parque del", poblacion: "Madrid", codigoPostal: "28009" },
  
  // ARGANZUELA
  { nombre: "Paseo de las Delicias", tipo: "Paseo", poblacion: "Madrid", codigoPostal: "28045" },
  { nombre: "Embajadores", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28012" },
  { nombre: "Santa María de la Cabeza", tipo: "Paseo de", poblacion: "Madrid", codigoPostal: "28045" },
  { nombre: "Méndez Álvaro", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28045" },
  { nombre: "Legazpi", tipo: "Plaza de", poblacion: "Madrid", codigoPostal: "28045" },
  
  // FUENCARRAL-EL PARDO
  { nombre: "Sinesio Delgado", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28029" },
  { nombre: "Monforte de Lemos", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28029" },
  { nombre: "Ginzo de Limia", tipo: "Calle", poblacion: "Madrid", codigoPostal: "28029" },
  { nombre: "Montecarmelo", tipo: "Barrio de", poblacion: "Madrid", codigoPostal: "28034" },
  { nombre: "Las Tablas", tipo: "Barrio de", poblacion: "Madrid", codigoPostal: "28050" },
  
  // VICÁLVARO
  { nombre: "Vicálvaro", tipo: "Calle de", poblacion: "Madrid", codigoPostal: "28032" },
  { nombre: "Valdebernardo", tipo: "Barrio de", poblacion: "Madrid", codigoPostal: "28030" },
  
  // === MUNICIPIOS DE LA COMUNIDAD DE MADRID ===
  
  // TORREJÓN DE ARDOZ
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Constitución", tipo: "Avenida de la", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Grafito", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Silicio", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Cobalto", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Titanio", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Cromo", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Platino", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Hierro", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Cobre", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Aluminio", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Zinc", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Estaño", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Plomo", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Mercurio", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Oro", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Plata", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Níquel", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Mayor", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Veredillas", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  { nombre: "Solana", tipo: "Calle", poblacion: "Torrejón de Ardoz", codigoPostal: "28850" },
  
  // ALCALÁ DE HENARES
  { nombre: "Mayor", tipo: "Calle", poblacion: "Alcalá de Henares", codigoPostal: "28801" },
  { nombre: "Libreros", tipo: "Calle", poblacion: "Alcalá de Henares", codigoPostal: "28801" },
  { nombre: "Cervantes", tipo: "Plaza de", poblacion: "Alcalá de Henares", codigoPostal: "28801" },
  { nombre: "Complutense", tipo: "Avenida", poblacion: "Alcalá de Henares", codigoPostal: "28805" },
  { nombre: "Vía Complutense", tipo: "Avenida", poblacion: "Alcalá de Henares", codigoPostal: "28805" },
  { nombre: "Juan de Austria", tipo: "Avenida", poblacion: "Alcalá de Henares", codigoPostal: "28804" },
  { nombre: "Guadalajara", tipo: "Avenida de", poblacion: "Alcalá de Henares", codigoPostal: "28802" },
  { nombre: "Santos Niños", tipo: "Plaza de los", poblacion: "Alcalá de Henares", codigoPostal: "28801" },
  
  // ALCOBENDAS
  { nombre: "Bulevar Salvador Allende", tipo: "Bulevar", poblacion: "Alcobendas", codigoPostal: "28100" },
  { nombre: "Marqués de la Valdavia", tipo: "Calle", poblacion: "Alcobendas", codigoPostal: "28100" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Alcobendas", codigoPostal: "28100" },
  { nombre: "Paseo de la Chopera", tipo: "Paseo", poblacion: "Alcobendas", codigoPostal: "28100" },
  { nombre: "Valdelaparra", tipo: "Calle", poblacion: "Alcobendas", codigoPostal: "28108" },
  
  // GETAFE
  { nombre: "Madrid", tipo: "Calle", poblacion: "Getafe", codigoPostal: "28901" },
  { nombre: "Toledo", tipo: "Calle", poblacion: "Getafe", codigoPostal: "28901" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Getafe", codigoPostal: "28901" },
  { nombre: "Juan de la Cierva", tipo: "Avenida", poblacion: "Getafe", codigoPostal: "28902" },
  { nombre: "Sector 3", tipo: "Barrio", poblacion: "Getafe", codigoPostal: "28903" },
  
  // LEGANÉS
  { nombre: "Juan Carlos I", tipo: "Avenida", poblacion: "Leganés", codigoPostal: "28911" },
  { nombre: "Fuenlabrada", tipo: "Avenida de", poblacion: "Leganés", codigoPostal: "28912" },
  { nombre: "España", tipo: "Plaza de", poblacion: "Leganés", codigoPostal: "28911" },
  { nombre: "Rioja", tipo: "Calle", poblacion: "Leganés", codigoPostal: "28915" },
  { nombre: "Zarzaquemada", tipo: "Barrio", poblacion: "Leganés", codigoPostal: "28916" },
  
  // MÓSTOLES
  { nombre: "Dos de Mayo", tipo: "Avenida del", poblacion: "Móstoles", codigoPostal: "28931" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Móstoles", codigoPostal: "28931" },
  { nombre: "Bulevar del Río", tipo: "Bulevar", poblacion: "Móstoles", codigoPostal: "28935" },
  { nombre: "Pradillo", tipo: "Calle", poblacion: "Móstoles", codigoPostal: "28931" },
  
  // FUENLABRADA
  { nombre: "España", tipo: "Plaza de", poblacion: "Fuenlabrada", codigoPostal: "28940" },
  { nombre: "Leganés", tipo: "Avenida de", poblacion: "Fuenlabrada", codigoPostal: "28941" },
  { nombre: "Loranca", tipo: "Barrio de", poblacion: "Fuenlabrada", codigoPostal: "28942" },
  { nombre: "De las Provincias", tipo: "Avenida", poblacion: "Fuenlabrada", codigoPostal: "28943" },
  
  // ALCORCÓN
  { nombre: "Lisboa", tipo: "Avenida de", poblacion: "Alcorcón", codigoPostal: "28922" },
  { nombre: "Leganés", tipo: "Avenida de", poblacion: "Alcorcón", codigoPostal: "28923" },
  { nombre: "Pablo Iglesias", tipo: "Avenida de", poblacion: "Alcorcón", codigoPostal: "28924" },
  { nombre: "Mayor", tipo: "Calle", poblacion: "Alcorcón", codigoPostal: "28921" },
  
  // PARLA
  { nombre: "Juan Carlos I", tipo: "Avenida", poblacion: "Parla", codigoPostal: "28980" },
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Parla", codigoPostal: "28981" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Parla", codigoPostal: "28980" },
  
  // COSLADA
  { nombre: "Constitución", tipo: "Avenida de la", poblacion: "Coslada", codigoPostal: "28820" },
  { nombre: "Fuentemar", tipo: "Calle", poblacion: "Coslada", codigoPostal: "28821" },
  { nombre: "España", tipo: "Plaza de", poblacion: "Coslada", codigoPostal: "28820" },
  
  // SAN SEBASTIÁN DE LOS REYES
  { nombre: "España", tipo: "Plaza de", poblacion: "San Sebastián de los Reyes", codigoPostal: "28700" },
  { nombre: "Baunatal", tipo: "Avenida de", poblacion: "San Sebastián de los Reyes", codigoPostal: "28701" },
  { nombre: "Castilla", tipo: "Avenida de", poblacion: "San Sebastián de los Reyes", codigoPostal: "28702" },
  
  // POZUELO DE ALARCÓN
  { nombre: "Europa", tipo: "Avenida de", poblacion: "Pozuelo de Alarcón", codigoPostal: "28224" },
  { nombre: "Padre Claret", tipo: "Calle", poblacion: "Pozuelo de Alarcón", codigoPostal: "28223" },
  { nombre: "Mayor", tipo: "Plaza", poblacion: "Pozuelo de Alarcón", codigoPostal: "28223" },
  { nombre: "Somosaguas", tipo: "Urbanización", poblacion: "Pozuelo de Alarcón", codigoPostal: "28223" },
  
  // LAS ROZAS
  { nombre: "España", tipo: "Plaza de", poblacion: "Las Rozas de Madrid", codigoPostal: "28230" },
  { nombre: "Comunidad de Madrid", tipo: "Avenida de la", poblacion: "Las Rozas de Madrid", codigoPostal: "28231" },
  { nombre: "Europolis", tipo: "Polígono", poblacion: "Las Rozas de Madrid", codigoPostal: "28232" },
  
  // MAJADAHONDA
  { nombre: "España", tipo: "Plaza de", poblacion: "Majadahonda", codigoPostal: "28220" },
  { nombre: "Colón", tipo: "Plaza de", poblacion: "Majadahonda", codigoPostal: "28220" },
  { nombre: "Gran Vía", tipo: "Calle", poblacion: "Majadahonda", codigoPostal: "28220" },
  
  // BOADILLA DEL MONTE
  { nombre: "Infante Don Luis", tipo: "Avenida del", poblacion: "Boadilla del Monte", codigoPostal: "28660" },
  { nombre: "Siglo XXI", tipo: "Avenida", poblacion: "Boadilla del Monte", codigoPostal: "28660" },
  { nombre: "Valdepastores", tipo: "Urbanización", poblacion: "Boadilla del Monte", codigoPostal: "28660" },
  
  // TRES CANTOS
  { nombre: "Colmenar Viejo", tipo: "Avenida de", poblacion: "Tres Cantos", codigoPostal: "28760" },
  { nombre: "Viñuelas", tipo: "Avenida de", poblacion: "Tres Cantos", codigoPostal: "28760" },
  { nombre: "Sector Islas", tipo: "Barrio", poblacion: "Tres Cantos", codigoPostal: "28760" },
  
  // COLMENAR VIEJO
  { nombre: "España", tipo: "Plaza de", poblacion: "Colmenar Viejo", codigoPostal: "28770" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Colmenar Viejo", codigoPostal: "28770" },
  { nombre: "Norte", tipo: "Avenida del", poblacion: "Colmenar Viejo", codigoPostal: "28770" },
  
  // RIVAS-VACIAMADRID
  { nombre: "Levante", tipo: "Avenida de", poblacion: "Rivas-Vaciamadrid", codigoPostal: "28521" },
  { nombre: "Pablo Iglesias", tipo: "Calle", poblacion: "Rivas-Vaciamadrid", codigoPostal: "28522" },
  { nombre: "Covibar", tipo: "Barrio de", poblacion: "Rivas-Vaciamadrid", codigoPostal: "28523" },
  
  // ARGANDA DEL REY
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Arganda del Rey", codigoPostal: "28500" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Arganda del Rey", codigoPostal: "28500" },
  { nombre: "Del Ejército", tipo: "Avenida", poblacion: "Arganda del Rey", codigoPostal: "28500" },
  
  // VALDEMORO
  { nombre: "España", tipo: "Plaza de", poblacion: "Valdemoro", codigoPostal: "28340" },
  { nombre: "Hispanidad", tipo: "Avenida de la", poblacion: "Valdemoro", codigoPostal: "28341" },
  { nombre: "Europa", tipo: "Avenida de", poblacion: "Valdemoro", codigoPostal: "28342" },
  
  // PINTO
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Pinto", codigoPostal: "28320" },
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Pinto", codigoPostal: "28320" },
  { nombre: "Egido", tipo: "Barrio del", poblacion: "Pinto", codigoPostal: "28320" },
  
  // ARANJUEZ
  { nombre: "Palacio", tipo: "Plaza del", poblacion: "Aranjuez", codigoPostal: "28300" },
  { nombre: "Príncipe", tipo: "Calle del", poblacion: "Aranjuez", codigoPostal: "28300" },
  { nombre: "Toledo", tipo: "Avenida de", poblacion: "Aranjuez", codigoPostal: "28300" },
  
  // COLLADO VILLALBA
  { nombre: "Juan Carlos I", tipo: "Avenida", poblacion: "Collado Villalba", codigoPostal: "28400" },
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Collado Villalba", codigoPostal: "28400" },
  { nombre: "Estación", tipo: "Barrio de la", poblacion: "Collado Villalba", codigoPostal: "28400" },
  
  // GALAPAGAR
  { nombre: "España", tipo: "Plaza de", poblacion: "Galapagar", codigoPostal: "28260" },
  { nombre: "Guadarrama", tipo: "Avenida de", poblacion: "Galapagar", codigoPostal: "28260" },
  { nombre: "La Navata", tipo: "Urbanización", poblacion: "Galapagar", codigoPostal: "28260" },
  
  // TORRELODONES
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Torrelodones", codigoPostal: "28250" },
  { nombre: "Dehesa", tipo: "Calle de la", poblacion: "Torrelodones", codigoPostal: "28250" },
  { nombre: "Colonia", tipo: "Barrio de la", poblacion: "Torrelodones", codigoPostal: "28250" },
  
  // SAN FERNANDO DE HENARES
  { nombre: "España", tipo: "Plaza de", poblacion: "San Fernando de Henares", codigoPostal: "28830" },
  { nombre: "Constitución", tipo: "Avenida de la", poblacion: "San Fernando de Henares", codigoPostal: "28830" },
  { nombre: "Parque Henares", tipo: "Barrio", poblacion: "San Fernando de Henares", codigoPostal: "28830" },
  
  // MEJORADA DEL CAMPO
  { nombre: "España", tipo: "Plaza de", poblacion: "Mejorada del Campo", codigoPostal: "28840" },
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Mejorada del Campo", codigoPostal: "28840" },
  
  // HUMANES DE MADRID
  { nombre: "Constitución", tipo: "Plaza de la", poblacion: "Humanes de Madrid", codigoPostal: "28970" },
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Humanes de Madrid", codigoPostal: "28970" },
  
  // NAVALCARNERO
  { nombre: "Segovia", tipo: "Plaza de", poblacion: "Navalcarnero", codigoPostal: "28600" },
  { nombre: "Madrid", tipo: "Avenida de", poblacion: "Navalcarnero", codigoPostal: "28600" },
  
  // VILLAVICIOSA DE ODÓN
  { nombre: "España", tipo: "Plaza de", poblacion: "Villaviciosa de Odón", codigoPostal: "28670" },
  { nombre: "Príncipe de Asturias", tipo: "Avenida del", poblacion: "Villaviciosa de Odón", codigoPostal: "28670" },
  
  // ARROYOMOLINOS
  { nombre: "Hispanidad", tipo: "Avenida de la", poblacion: "Arroyomolinos", codigoPostal: "28939" },
  { nombre: "Xanadú", tipo: "Centro Comercial", poblacion: "Arroyomolinos", codigoPostal: "28939" },
];

/**
 * Busca calles que coincidan con el texto introducido
 * @param texto Texto a buscar
 * @param limite Número máximo de resultados (por defecto 10)
 * @returns Array de calles que coinciden
 */
export function buscarCalles(texto: string, limite: number = 10): Calle[] {
  if (!texto || texto.length < 2) return [];
  
  const textoNormalizado = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return callesMadrid
    .filter(calle => {
      const nombreNormalizado = calle.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const tipoNormalizado = calle.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const poblacionNormalizada = calle.poblacion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      return nombreNormalizado.includes(textoNormalizado) || 
             tipoNormalizado.includes(textoNormalizado) ||
             poblacionNormalizada.includes(textoNormalizado) ||
             `${tipoNormalizado} ${nombreNormalizado}`.includes(textoNormalizado);
    })
    .slice(0, limite);
}

/**
 * Formatea una calle para mostrar en el autocompletado
 * @param calle Objeto calle
 * @returns String formateado
 */
export function formatearCalle(calle: Calle): string {
  return `${calle.tipo} ${calle.nombre}`;
}

/**
 * Formatea la dirección completa
 * @param calle Objeto calle
 * @param numero Número de portal (opcional)
 * @returns String con la dirección completa
 */
export function formatearDireccionCompleta(calle: Calle, numero?: string): string {
  const direccion = `${calle.tipo} ${calle.nombre}`;
  return numero ? `${direccion}, ${numero}` : direccion;
}
