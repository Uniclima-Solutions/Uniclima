/*
 * DESIGN SYSTEM: Premium Corporate
 * Datos estructurados para el menú predictivo de repuestos
 * Marcas reales del mercado español
 * NOTA: Calderas atmosféricas y estancas están PROHIBIDAS en España
 */

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount: number;
  category: "calderas" | "aire-acondicionado" | "ambos";
}

export interface PartType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  category: "calderas" | "aire-acondicionado" | "ambos";
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
  group: "general" | "tecnico" | "dimensiones" | "compatibilidad";
}

export interface ProductDocument {
  id: string;
  name: string;
  type: "manual" | "ficha-tecnica" | "esquema" | "certificado";
  url: string;
  size: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  reference: string;
  brand: string;
  partType: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: ProductImage[];
  inStock: boolean;
  stockQuantity?: number;
  description: string;
  longDescription?: string;
  category: "calderas" | "aire-acondicionado";
  specifications?: ProductSpec[];
  compatibleModels?: string[];
  documents?: ProductDocument[];
  reviews?: ProductReview[];
  averageRating?: number;
  reviewCount?: number;
  sku?: string;
  ean?: string;
  weight?: number;
  warranty?: string;
  deliveryTime?: string;
  relatedProducts?: string[];
  alternativeProducts?: string[];
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

// Estructura de datos para el menú móvil mejorado
export const menuData = {
  repuestosCalderas: {
    title: "Repuestos Calderas",
    href: "/repuestos/calderas",
    items: [
      { name: "Válvulas de gas", href: "/repuestos/calderas/valvulas-gas", count: 320 },
      { name: "Intercambiadores", href: "/repuestos/calderas/intercambiadores", count: 185 },
      { name: "Placas electrónicas", href: "/repuestos/calderas/placas-electronicas", count: 278 },
      { name: "Bombas de circulación", href: "/repuestos/calderas/bombas", count: 156 },
      { name: "Quemadores", href: "/repuestos/calderas/quemadores", count: 142 },
      { name: "Electrodos de encendido", href: "/repuestos/calderas/electrodos", count: 98 },
      { name: "Ventiladores / Extractores", href: "/repuestos/calderas/ventiladores", count: 124 },
      { name: "Presostatos", href: "/repuestos/calderas/presostatos", count: 87 },
      { name: "Termostatos", href: "/repuestos/calderas/termostatos", count: 112 },
      { name: "Sondas y sensores", href: "/repuestos/calderas/sondas", count: 145 },
      { name: "Vasos de expansión", href: "/repuestos/calderas/vasos-expansion", count: 76 },
      { name: "Válvulas de 3 vías", href: "/repuestos/calderas/valvulas-3-vias", count: 98 },
      { name: "Juntas y retenes", href: "/repuestos/calderas/juntas", count: 234 },
      { name: "Grifos de llenado", href: "/repuestos/calderas/grifos", count: 65 },
      { name: "Cuerpos de agua", href: "/repuestos/calderas/cuerpos-agua", count: 54 },
      { name: "Manómetros", href: "/repuestos/calderas/manometros", count: 48 },
    ]
  },
  repuestosAire: {
    title: "Repuestos Aire Acondicionado",
    href: "/repuestos/aire-acondicionado",
    items: [
      { name: "Compresores", href: "/repuestos/aire/compresores", count: 187 },
      { name: "Placas electrónicas", href: "/repuestos/aire/placas", count: 234 },
      { name: "Motores ventilador", href: "/repuestos/aire/motores", count: 156 },
      { name: "Turbinas", href: "/repuestos/aire/turbinas", count: 98 },
      { name: "Condensadores", href: "/repuestos/aire/condensadores", count: 76 },
      { name: "Sensores y sondas", href: "/repuestos/aire/sensores", count: 145 },
      { name: "Mandos a distancia", href: "/repuestos/aire/mandos", count: 112 },
      { name: "Filtros", href: "/repuestos/aire/filtros", count: 87 },
      { name: "Válvulas de expansión", href: "/repuestos/aire/valvulas-expansion", count: 65 },
      { name: "Bobinas y solenoides", href: "/repuestos/aire/bobinas", count: 54 },
      { name: "Ventiladores exteriores", href: "/repuestos/aire/ventiladores-ext", count: 67 },
      { name: "Tarjetas de control", href: "/repuestos/aire/tarjetas", count: 89 },
    ]
  },
  marcas: {
    calderas: [
      { name: "Junkers / Bosch", href: "/marcas/junkers-bosch", count: 312 },
      { name: "Vaillant", href: "/marcas/vaillant", count: 287 },
      { name: "Saunier Duval", href: "/marcas/saunier-duval", count: 265 },
      { name: "Ferroli", href: "/marcas/ferroli", count: 198 },
      { name: "Baxi / BaxiRoca", href: "/marcas/baxi", count: 176 },
      { name: "Ariston", href: "/marcas/ariston", count: 154 },
      { name: "Beretta", href: "/marcas/beretta", count: 132 },
      { name: "Roca", href: "/marcas/roca", count: 118 },
      { name: "Cointra", href: "/marcas/cointra", count: 95 },
      { name: "Chaffoteaux", href: "/marcas/chaffoteaux", count: 87 },
      { name: "Hermann", href: "/marcas/hermann", count: 76 },
      { name: "Manaut", href: "/marcas/manaut", count: 68 },
      { name: "Fondital", href: "/marcas/fondital", count: 54 },
      { name: "Immergas", href: "/marcas/immergas", count: 48 },
      { name: "Viessmann", href: "/marcas/viessmann", count: 42 },
      { name: "Wolf", href: "/marcas/wolf", count: 35 },
      { name: "De Dietrich", href: "/marcas/de-dietrich", count: 28 },
      { name: "Lamborghini", href: "/marcas/lamborghini", count: 32 },
      { name: "Fagor", href: "/marcas/fagor", count: 45 },
      { name: "Sime", href: "/marcas/sime", count: 38 },
    ],
    aire: [
      { name: "Daikin", href: "/marcas/daikin", count: 234 },
      { name: "Mitsubishi Electric", href: "/marcas/mitsubishi", count: 198 },
      { name: "Fujitsu", href: "/marcas/fujitsu", count: 167 },
      { name: "LG", href: "/marcas/lg", count: 145 },
      { name: "Samsung", href: "/marcas/samsung", count: 132 },
      { name: "Panasonic", href: "/marcas/panasonic", count: 118 },
      { name: "Toshiba", href: "/marcas/toshiba", count: 98 },
      { name: "Hitachi", href: "/marcas/hitachi", count: 87 },
      { name: "Carrier", href: "/marcas/carrier", count: 76 },
      { name: "Hisense", href: "/marcas/hisense", count: 65 },
      { name: "Haier", href: "/marcas/haier", count: 54 },
      { name: "Midea", href: "/marcas/midea", count: 48 },
      { name: "Gree", href: "/marcas/gree", count: 42 },
      { name: "General (Fujitsu)", href: "/marcas/general", count: 38 },
      { name: "Johnson", href: "/marcas/johnson", count: 32 },
      { name: "Mundoclima", href: "/marcas/mundoclima", count: 28 },
    ]
  },
  equiposNuevos: {
    calderas: [
      { name: "Calderas de condensación", href: "/equipos/calderas/condensacion", count: 78 },
      { name: "Solo calefacción", href: "/equipos/calderas/solo-calefaccion", count: 32 },
      { name: "Mixtas (calefacción + ACS)", href: "/equipos/calderas/mixtas", count: 46 },
      { name: "Con acumulador", href: "/equipos/calderas/con-acumulador", count: 18 },
      { name: "Calderas de biomasa", href: "/equipos/calderas/biomasa", count: 24 },
      { name: "Aerotermia", href: "/equipos/calderas/aerotermia", count: 35 },
    ],
    aire: [
      { name: "Split 1x1", href: "/equipos/aire/split-1x1", count: 156 },
      { name: "Multisplit 2x1", href: "/equipos/aire/multisplit-2x1", count: 67 },
      { name: "Multisplit 3x1", href: "/equipos/aire/multisplit-3x1", count: 34 },
      { name: "Multisplit 4x1", href: "/equipos/aire/multisplit-4x1", count: 18 },
      { name: "Multisplit 5x1", href: "/equipos/aire/multisplit-5x1", count: 12 },
      { name: "Cassette", href: "/equipos/aire/cassette", count: 45 },
      { name: "Conductos", href: "/equipos/aire/conductos", count: 38 },
      { name: "Suelo / Techo", href: "/equipos/aire/suelo-techo", count: 28 },
    ],
    porFrigorias: [
      { name: "Hasta 2.500 fg (20m²)", href: "/equipos/aire/hasta-2500fg", count: 45 },
      { name: "2.500 - 3.500 fg (20-30m²)", href: "/equipos/aire/2500-3500fg", count: 78 },
      { name: "3.500 - 4.500 fg (30-40m²)", href: "/equipos/aire/3500-4500fg", count: 56 },
      { name: "4.500 - 6.000 fg (40-50m²)", href: "/equipos/aire/4500-6000fg", count: 34 },
      { name: "Más de 6.000 fg (+50m²)", href: "/equipos/aire/mas-6000fg", count: 23 },
    ]
  },
  servicios: [
    { 
      name: "Reparación de placas electrónicas", 
      href: "/servicios/reparacion-placas",
      description: "Reparamos placas electrónicas de calderas y aire acondicionado"
    },
    { 
      name: "Mantenimiento de calderas", 
      href: "/servicios/mantenimiento-calderas",
      description: "Revisión anual obligatoria y contratos de mantenimiento"
    },
    { 
      name: "Mantenimiento de aire acondicionado", 
      href: "/servicios/mantenimiento-aire",
      description: "Limpieza, recarga de gas y revisión completa"
    },
    { 
      name: "Instalación de equipos", 
      href: "/servicios/instalacion",
      description: "Instalación profesional de calderas y aire acondicionado"
    },
    { 
      name: "Servicio técnico urgente 24h", 
      href: "/servicios/urgente",
      description: "Asistencia técnica de emergencia todos los días"
    },
  ]
};

// Productos de ejemplo con información completa
export const products: Product[] = [
  {
    id: "1",
    name: "Válvula de Gas Honeywell VK4105M",
    reference: "VK4105M5033",
    brand: "Junkers / Bosch",
    partType: "Válvulas de gas",
    price: 89.90,
    originalPrice: 112.00,
    image: "/images/boiler-parts/valvula-gas.webp",
    images: [
      { id: "1-1", url: "/images/category-valvulas.webp", alt: "Válvula de Gas Honeywell VK4105M - Vista frontal", isPrimary: true },
      { id: "1-2", url: "/images/category-intercambiadores.webp", alt: "Válvula de Gas Honeywell VK4105M - Vista lateral", isPrimary: false },
      { id: "1-3", url: "/images/category-placas.webp", alt: "Válvula de Gas Honeywell VK4105M - Conexiones", isPrimary: false },
      { id: "1-4", url: "/images/hero-calderas.webp", alt: "Válvula de Gas Honeywell VK4105M - Instalada", isPrimary: false },
    ],
    inStock: true,
    stockQuantity: 15,
    description: "Válvula de gas compatible con calderas Junkers, Bosch y otras marcas",
    longDescription: `La válvula de gas Honeywell VK4105M es un componente esencial para el correcto funcionamiento de tu caldera. 
    
Esta válvula de gas combinada integra todas las funciones necesarias para el control seguro del gas en calderas murales de condensación y convencionales. Fabricada con los más altos estándares de calidad por Honeywell, líder mundial en sistemas de control.

**Características principales:**
- Válvula de gas modulante con regulación electrónica
- Sistema de seguridad integrado con doble cierre
- Compatible con gas natural y GLP (requiere kit de conversión)
- Conexión eléctrica mediante conector Molex
- Presión de entrada: 17-25 mbar (gas natural)
- Caudal máximo: 4 m³/h

**Ventajas:**
- Fácil instalación gracias a su diseño compacto
- Alta durabilidad y fiabilidad probada
- Repuesto original del fabricante
- Cumple con todas las normativas europeas de seguridad`,
    category: "calderas",
    sku: "HON-VK4105M5033",
    ean: "4012345678901",
    weight: 0.85,
    warranty: "1 año",
    deliveryTime: "24-48 horas",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    specifications: [
      { label: "Fabricante", value: "Honeywell", group: "general" },
      { label: "Referencia fabricante", value: "VK4105M5033", group: "general" },
      { label: "Tipo de gas", value: "Gas Natural / GLP", group: "general" },
      { label: "Presión entrada", value: "17-25 mbar", group: "tecnico" },
      { label: "Presión salida", value: "0-35 mbar", group: "tecnico" },
      { label: "Caudal máximo", value: "4 m³/h", group: "tecnico" },
      { label: "Tensión alimentación", value: "230V AC", group: "tecnico" },
      { label: "Consumo", value: "10W", group: "tecnico" },
      { label: "Conexión gas entrada", value: "3/4\" macho", group: "dimensiones" },
      { label: "Conexión gas salida", value: "3/4\" macho", group: "dimensiones" },
      { label: "Dimensiones (AxLxP)", value: "95 x 85 x 120 mm", group: "dimensiones" },
      { label: "Peso", value: "850 g", group: "dimensiones" },
    ],
    compatibleModels: [
      "Junkers Cerapur ZWB 24-1",
      "Junkers Cerapur ZWB 28-1",
      "Junkers Cerapur ZWB 35-1",
      "Junkers Ceraclass Excellence ZWC 24-1",
      "Junkers Ceraclass Excellence ZWC 28-1",
      "Bosch Condens 2300i W",
      "Bosch Condens 2500 W",
      "Bosch Condens 5300i W",
      "Bosch Condens 7000i W",
    ],
    documents: [
      { id: "doc-1", name: "Manual de instalación", type: "manual", url: "/docs/vk4105m-manual.pdf", size: "2.4 MB" },
      { id: "doc-2", name: "Ficha técnica", type: "ficha-tecnica", url: "/docs/vk4105m-ficha.pdf", size: "890 KB" },
      { id: "doc-3", name: "Esquema de conexiones", type: "esquema", url: "/docs/vk4105m-esquema.pdf", size: "1.2 MB" },
      { id: "doc-4", name: "Certificado CE", type: "certificado", url: "/docs/vk4105m-ce.pdf", size: "456 KB" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Carlos M.",
        rating: 5,
        date: "2025-12-15",
        title: "Excelente calidad, repuesto original",
        comment: "Llegó en 24 horas como prometían. Es el repuesto original Honeywell, no una imitación. Mi caldera Junkers vuelve a funcionar perfectamente. Muy recomendable.",
        verified: true,
        helpful: 12
      },
      {
        id: "rev-2",
        author: "Ana G.",
        rating: 5,
        date: "2025-11-28",
        title: "Perfecto para mi Bosch",
        comment: "Compatible 100% con mi caldera Bosch Condens 2500. La instalación fue sencilla siguiendo el manual que viene incluido. El técnico me cobró la mitad que si la hubiera comprado él.",
        verified: true,
        helpful: 8
      },
      {
        id: "rev-3",
        author: "Miguel F.",
        rating: 4,
        date: "2025-10-20",
        title: "Buen producto, envío rápido",
        comment: "El producto es correcto y funciona bien. Le quito una estrella porque el embalaje podría ser mejor para un componente tan delicado.",
        verified: true,
        helpful: 3
      },
    ],
    averageRating: 4.7,
    reviewCount: 47,
    relatedProducts: ["2", "3", "5"],
    alternativeProducts: ["9", "10"],
    tags: ["válvula gas", "honeywell", "junkers", "bosch", "calderas condensación"]
  },
  {
    id: "2",
    name: "Intercambiador de Placas 14P",
    reference: "87161066850",
    brand: "Vaillant",
    partType: "Intercambiadores",
    price: 145.50,
    image: "/images/boiler-parts/intercambiador-placas.webp",
    images: [
      { id: "2-1", url: "/images/category-intercambiadores.webp", alt: "Intercambiador de Placas 14P - Vista frontal", isPrimary: true },
      { id: "2-2", url: "/images/category-valvulas.webp", alt: "Intercambiador de Placas 14P - Vista lateral", isPrimary: false },
      { id: "2-3", url: "/images/category-placas.webp", alt: "Intercambiador de Placas 14P - Conexiones", isPrimary: false },
    ],
    inStock: true,
    stockQuantity: 8,
    description: "Intercambiador de placas para producción de ACS",
    longDescription: `Intercambiador de placas de 14 placas para la producción de agua caliente sanitaria (ACS) en calderas Vaillant.

Este intercambiador secundario es el encargado de transferir el calor del circuito primario de calefacción al agua fría de red para producir ACS instantánea. Fabricado en acero inoxidable AISI 316 para máxima durabilidad y resistencia a la corrosión.

**Características principales:**
- 14 placas de acero inoxidable AISI 316
- Soldadura por cobre al vacío
- Alta eficiencia de transferencia térmica
- Diseño compacto y ligero
- Juntas de EPDM resistentes a altas temperaturas

**Especificaciones técnicas:**
- Potencia térmica: hasta 28 kW
- Temperatura máxima: 95°C
- Presión máxima: 10 bar
- Caudal ACS: hasta 13 l/min`,
    category: "calderas",
    sku: "VAI-87161066850",
    ean: "4024074660850",
    weight: 1.2,
    warranty: "1 año",
    deliveryTime: "24-48 horas",
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    specifications: [
      { label: "Fabricante", value: "Vaillant", group: "general" },
      { label: "Referencia fabricante", value: "87161066850", group: "general" },
      { label: "Material placas", value: "Acero inoxidable AISI 316", group: "general" },
      { label: "Número de placas", value: "14", group: "tecnico" },
      { label: "Potencia térmica", value: "Hasta 28 kW", group: "tecnico" },
      { label: "Temperatura máxima", value: "95°C", group: "tecnico" },
      { label: "Presión máxima", value: "10 bar", group: "tecnico" },
      { label: "Caudal ACS", value: "Hasta 13 l/min", group: "tecnico" },
      { label: "Conexiones", value: "3/4\" macho", group: "dimensiones" },
      { label: "Dimensiones (AxLxP)", value: "190 x 75 x 80 mm", group: "dimensiones" },
      { label: "Peso", value: "1.2 kg", group: "dimensiones" },
    ],
    compatibleModels: [
      "Vaillant ecoTEC plus VMW 236/5-5",
      "Vaillant ecoTEC plus VMW 306/5-5",
      "Vaillant ecoTEC plus VMW 346/5-5",
      "Vaillant ecoTEC pro VMW 236/5-3",
      "Vaillant ecoTEC pro VMW 286/5-3",
      "Vaillant ecoTEC exclusive VMW 356/5-7",
    ],
    documents: [
      { id: "doc-1", name: "Ficha técnica", type: "ficha-tecnica", url: "/docs/intercambiador-ficha.pdf", size: "1.1 MB" },
      { id: "doc-2", name: "Instrucciones de montaje", type: "manual", url: "/docs/intercambiador-montaje.pdf", size: "2.8 MB" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Pedro L.",
        rating: 5,
        date: "2025-12-10",
        title: "Repuesto original Vaillant",
        comment: "Exactamente igual que el original que tenía. Mi caldera vuelve a producir agua caliente sin problemas. Envío muy rápido.",
        verified: true,
        helpful: 7
      },
      {
        id: "rev-2",
        author: "Laura S.",
        rating: 5,
        date: "2025-11-15",
        title: "Perfecto",
        comment: "El técnico me dijo que era el repuesto correcto. Funciona perfectamente desde el primer día.",
        verified: true,
        helpful: 4
      },
    ],
    averageRating: 4.8,
    reviewCount: 32,
    relatedProducts: ["1", "4"],
    alternativeProducts: [],
    tags: ["intercambiador", "placas", "vaillant", "ACS", "agua caliente"]
  },
  {
    id: "3",
    name: "Placa Electrónica Thema Condens",
    reference: "S5742000",
    brand: "Saunier Duval",
    partType: "Placas electrónicas",
    price: 178.00,
    originalPrice: 210.00,
    image: "/images/boiler-parts/placa-electronica.webp",
    images: [
      { id: "3-1", url: "/images/category-placas.webp", alt: "Placa Electrónica Thema Condens - Vista frontal", isPrimary: true },
      { id: "3-2", url: "/images/category-valvulas.webp", alt: "Placa Electrónica Thema Condens - Conectores", isPrimary: false },
    ],
    inStock: false,
    stockQuantity: 0,
    description: "Placa electrónica principal para Thema Condens",
    longDescription: `Placa electrónica principal (PCB) para calderas Saunier Duval serie Thema Condens. Esta placa es el cerebro de la caldera, controlando todas las funciones de seguridad, encendido, modulación y comunicación.

**Características principales:**
- Placa de control principal con microprocesador
- Gestión completa de seguridades
- Control de modulación de llama
- Interfaz con termostato ambiente
- Diagnóstico de averías mediante códigos de error
- Compatible con sistemas de control remoto

**Importante:** Esta placa requiere configuración inicial tras su instalación. Se recomienda instalación por técnico cualificado.`,
    category: "calderas",
    sku: "SD-S5742000",
    ean: "3414975742000",
    weight: 0.45,
    warranty: "1 año",
    deliveryTime: "3-5 días (bajo pedido)",
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    specifications: [
      { label: "Fabricante", value: "Saunier Duval", group: "general" },
      { label: "Referencia fabricante", value: "S5742000", group: "general" },
      { label: "Tipo", value: "Placa principal (PCB)", group: "general" },
      { label: "Tensión alimentación", value: "230V AC 50Hz", group: "tecnico" },
      { label: "Consumo máximo", value: "15W", group: "tecnico" },
      { label: "Protección", value: "IP20", group: "tecnico" },
      { label: "Temperatura funcionamiento", value: "0 a 60°C", group: "tecnico" },
      { label: "Dimensiones", value: "180 x 120 x 35 mm", group: "dimensiones" },
      { label: "Peso", value: "450 g", group: "dimensiones" },
    ],
    compatibleModels: [
      "Saunier Duval Thema Condens F25",
      "Saunier Duval Thema Condens F30",
      "Saunier Duval Thema Condens AS 25",
      "Saunier Duval Thema Condens AS 30",
    ],
    documents: [
      { id: "doc-1", name: "Manual de servicio", type: "manual", url: "/docs/thema-condens-manual.pdf", size: "4.2 MB" },
      { id: "doc-2", name: "Esquema eléctrico", type: "esquema", url: "/docs/thema-condens-esquema.pdf", size: "1.8 MB" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Roberto M.",
        rating: 5,
        date: "2025-09-20",
        title: "Salvó mi caldera",
        comment: "Mi caldera daba error F28 constantemente. Cambié la placa y problema resuelto. El técnico la configuró en 10 minutos.",
        verified: true,
        helpful: 15
      },
    ],
    averageRating: 4.5,
    reviewCount: 18,
    relatedProducts: ["1", "5"],
    alternativeProducts: [],
    tags: ["placa electrónica", "PCB", "saunier duval", "thema condens"]
  },
  {
    id: "4",
    name: "Bomba Grundfos UPS 15-60",
    reference: "UPS15-60",
    brand: "Ferroli",
    partType: "Bombas de circulación",
    price: 198.00,
    image: "/images/boiler-parts/bomba-circulacion.webp",
    images: [
      { id: "4-1", url: "/images/hero-calderas.webp", alt: "Bomba Grundfos UPS 15-60 - Vista frontal", isPrimary: true },
      { id: "4-2", url: "/images/category-valvulas.webp", alt: "Bomba Grundfos UPS 15-60 - Vista lateral", isPrimary: false },
    ],
    inStock: true,
    stockQuantity: 12,
    description: "Bomba de circulación para calefacción",
    longDescription: `Bomba de circulación Grundfos UPS 15-60 para sistemas de calefacción. Esta bomba de rotor húmedo es ideal para la circulación de agua en instalaciones de calefacción domésticas.

**Características principales:**
- Motor de rotor húmedo sin mantenimiento
- 3 velocidades seleccionables
- Funcionamiento silencioso
- Bajo consumo energético
- Fácil instalación

**Aplicaciones:**
- Calderas murales
- Sistemas de calefacción por radiadores
- Suelo radiante (circuito primario)`,
    category: "calderas",
    sku: "GRU-UPS15-60",
    ean: "5700310000000",
    weight: 2.1,
    warranty: "1 año",
    deliveryTime: "24-48 horas",
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    specifications: [
      { label: "Fabricante", value: "Grundfos", group: "general" },
      { label: "Modelo", value: "UPS 15-60", group: "general" },
      { label: "Tipo", value: "Rotor húmedo", group: "general" },
      { label: "Tensión", value: "230V AC 50Hz", group: "tecnico" },
      { label: "Potencia", value: "45/65/80 W", group: "tecnico" },
      { label: "Altura manométrica", value: "6 m", group: "tecnico" },
      { label: "Caudal máximo", value: "2.5 m³/h", group: "tecnico" },
      { label: "Temperatura máx. fluido", value: "110°C", group: "tecnico" },
      { label: "Conexión", value: "1\" rosca macho", group: "dimensiones" },
      { label: "Longitud instalación", value: "130 mm", group: "dimensiones" },
      { label: "Peso", value: "2.1 kg", group: "dimensiones" },
    ],
    compatibleModels: [
      "Ferroli Bluehelix Tech 25C",
      "Ferroli Bluehelix Tech 35C",
      "Ferroli Divacondens D Plus",
      "Ferroli Econcept 25A",
      "Ferroli Econcept 35A",
    ],
    documents: [
      { id: "doc-1", name: "Ficha técnica", type: "ficha-tecnica", url: "/docs/ups15-60-ficha.pdf", size: "980 KB" },
      { id: "doc-2", name: "Manual de instalación", type: "manual", url: "/docs/ups15-60-manual.pdf", size: "1.5 MB" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Javier R.",
        rating: 5,
        date: "2025-12-01",
        title: "Calidad Grundfos",
        comment: "Bomba de primera calidad. Silenciosa y eficiente. La instalé yo mismo sin problemas.",
        verified: true,
        helpful: 9
      },
    ],
    averageRating: 4.9,
    reviewCount: 56,
    relatedProducts: ["1", "2"],
    alternativeProducts: [],
    tags: ["bomba", "circulación", "grundfos", "calefacción"]
  },
  {
    id: "5",
    name: "Electrodo de Encendido",
    reference: "090724",
    brand: "Baxi / BaxiRoca",
    partType: "Electrodos de encendido",
    price: 24.90,
    image: "/images/boiler-parts/valvula-gas.webp",
    images: [
      { id: "5-1", url: "/images/category-valvulas.webp", alt: "Electrodo de Encendido - Vista frontal", isPrimary: true },
    ],
    inStock: true,
    stockQuantity: 45,
    description: "Electrodo de encendido universal",
    longDescription: `Electrodo de encendido para calderas Baxi y BaxiRoca. Este electrodo es el encargado de generar la chispa que enciende el quemador de la caldera.

**Características:**
- Electrodo cerámico de alta resistencia
- Cable de conexión incluido
- Fácil instalación
- Compatible con múltiples modelos`,
    category: "calderas",
    sku: "BAX-090724",
    ean: "8435483800724",
    weight: 0.08,
    warranty: "1 año",
    deliveryTime: "24-48 horas",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    specifications: [
      { label: "Fabricante", value: "Baxi", group: "general" },
      { label: "Referencia", value: "090724", group: "general" },
      { label: "Material", value: "Cerámico", group: "tecnico" },
      { label: "Longitud cable", value: "350 mm", group: "dimensiones" },
      { label: "Peso", value: "80 g", group: "dimensiones" },
    ],
    compatibleModels: [
      "Baxi Platinum Compact 24/24 F",
      "Baxi Platinum Compact 28/28 F",
      "BaxiRoca Platinum Alux 24/24 F",
      "BaxiRoca Neodens Plus 24/24 F",
    ],
    documents: [],
    reviews: [],
    averageRating: 4.6,
    reviewCount: 23,
    relatedProducts: ["1", "3"],
    alternativeProducts: [],
    tags: ["electrodo", "encendido", "baxi", "baxiroca"]
  },
  {
    id: "6",
    name: "Compresor Scroll JT90",
    reference: "JT90BHBY1L",
    brand: "Daikin",
    partType: "Compresores",
    price: 456.00,
    originalPrice: 520.00,
    image: "/images/boiler-parts/quemador.webp",
    images: [
      { id: "6-1", url: "/images/category-quemadores.webp", alt: "Compresor Scroll JT90 - Vista frontal", isPrimary: true },
      { id: "6-2", url: "/images/category-intercambiadores.webp", alt: "Compresor Scroll JT90 - Vista lateral", isPrimary: false },
    ],
    inStock: true,
    stockQuantity: 5,
    description: "Compresor scroll para unidades exteriores",
    longDescription: `Compresor scroll Daikin JT90 para unidades exteriores de aire acondicionado. Los compresores scroll Daikin son reconocidos mundialmente por su eficiencia, fiabilidad y bajo nivel sonoro.

**Características principales:**
- Tecnología scroll de alta eficiencia
- Funcionamiento silencioso
- Arranque suave
- Protección térmica integrada
- Compatible con refrigerante R410A

**Ventajas del compresor scroll:**
- Mayor eficiencia energética
- Menor vibración y ruido
- Mayor vida útil
- Menos piezas móviles`,
    category: "aire-acondicionado",
    sku: "DAI-JT90BHBY1L",
    ean: "4548848000000",
    weight: 12.5,
    warranty: "1 año",
    deliveryTime: "3-5 días",
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    specifications: [
      { label: "Fabricante", value: "Daikin", group: "general" },
      { label: "Modelo", value: "JT90BHBY1L", group: "general" },
      { label: "Tipo", value: "Scroll", group: "general" },
      { label: "Refrigerante", value: "R410A", group: "tecnico" },
      { label: "Capacidad", value: "9.0 kW", group: "tecnico" },
      { label: "Tensión", value: "230V AC 50Hz", group: "tecnico" },
      { label: "Corriente arranque", value: "45 A", group: "tecnico" },
      { label: "Corriente nominal", value: "12.5 A", group: "tecnico" },
      { label: "Nivel sonoro", value: "52 dB(A)", group: "tecnico" },
      { label: "Conexión aspiración", value: "7/8\"", group: "dimensiones" },
      { label: "Conexión descarga", value: "1/2\"", group: "dimensiones" },
      { label: "Peso", value: "12.5 kg", group: "dimensiones" },
    ],
    compatibleModels: [
      "Daikin FTXS25K",
      "Daikin FTXS35K",
      "Daikin RXS25L",
      "Daikin RXS35L",
    ],
    documents: [
      { id: "doc-1", name: "Ficha técnica", type: "ficha-tecnica", url: "/docs/jt90-ficha.pdf", size: "1.2 MB" },
      { id: "doc-2", name: "Manual de servicio", type: "manual", url: "/docs/jt90-manual.pdf", size: "3.5 MB" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Antonio P.",
        rating: 5,
        date: "2025-11-10",
        title: "Compresor original Daikin",
        comment: "Excelente compresor. Mi aire acondicionado vuelve a enfriar como el primer día. Instalación por técnico sin problemas.",
        verified: true,
        helpful: 11
      },
    ],
    averageRating: 4.8,
    reviewCount: 14,
    relatedProducts: ["7", "8"],
    alternativeProducts: [],
    tags: ["compresor", "scroll", "daikin", "R410A", "aire acondicionado"]
  },
  {
    id: "7",
    name: "Motor Ventilador Interior",
    reference: "E22F46451",
    brand: "Mitsubishi Electric",
    partType: "Motores ventilador",
    price: 134.50,
    image: "/images/boiler-parts/intercambiador-placas.webp",
    images: [
      { id: "7-1", url: "/images/category-intercambiadores.webp", alt: "Motor Ventilador Interior - Vista frontal", isPrimary: true },
    ],
    inStock: true,
    stockQuantity: 18,
    description: "Motor de ventilador para unidad interior",
    longDescription: `Motor de ventilador para unidades interiores de aire acondicionado Mitsubishi Electric. Este motor DC sin escobillas ofrece un funcionamiento silencioso y eficiente.

**Características:**
- Motor DC sin escobillas
- Alta eficiencia energética
- Funcionamiento ultra silencioso
- Larga vida útil
- Fácil instalación`,
    category: "aire-acondicionado",
    sku: "MIT-E22F46451",
    ean: "4902901000000",
    weight: 0.95,
    warranty: "1 año",
    deliveryTime: "24-48 horas",
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    specifications: [
      { label: "Fabricante", value: "Mitsubishi Electric", group: "general" },
      { label: "Referencia", value: "E22F46451", group: "general" },
      { label: "Tipo motor", value: "DC sin escobillas", group: "tecnico" },
      { label: "Tensión", value: "DC 310V", group: "tecnico" },
      { label: "Potencia", value: "25W", group: "tecnico" },
      { label: "RPM", value: "1200", group: "tecnico" },
      { label: "Peso", value: "950 g", group: "dimensiones" },
    ],
    compatibleModels: [
      "Mitsubishi MSZ-SF25VE",
      "Mitsubishi MSZ-SF35VE",
      "Mitsubishi MSZ-EF25VE",
      "Mitsubishi MSZ-EF35VE",
    ],
    documents: [],
    reviews: [],
    averageRating: 4.7,
    reviewCount: 28,
    relatedProducts: ["6", "8"],
    alternativeProducts: [],
    tags: ["motor", "ventilador", "mitsubishi", "interior"]
  },
  {
    id: "8",
    name: "Placa Electrónica ASYG",
    reference: "K9709893018",
    brand: "Fujitsu",
    partType: "Placas electrónicas",
    price: 189.00,
    image: "/images/boiler-parts/placa-electronica.webp",
    images: [
      { id: "8-1", url: "/images/category-placas.webp", alt: "Placa Electrónica ASYG - Vista frontal", isPrimary: true },
    ],
    inStock: true,
    stockQuantity: 6,
    description: "Placa electrónica para serie ASYG",
    longDescription: `Placa electrónica principal para unidades interiores Fujitsu serie ASYG. Esta placa controla todas las funciones de la unidad interior incluyendo el motor del ventilador, las persianas y la comunicación con la unidad exterior.

**Características:**
- Control completo de la unidad interior
- Interfaz con mando a distancia
- Diagnóstico de averías
- Protecciones integradas`,
    category: "aire-acondicionado",
    sku: "FUJ-K9709893018",
    ean: "4974270000000",
    weight: 0.35,
    warranty: "1 año",
    deliveryTime: "24-48 horas",
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    specifications: [
      { label: "Fabricante", value: "Fujitsu", group: "general" },
      { label: "Referencia", value: "K9709893018", group: "general" },
      { label: "Tipo", value: "Placa principal interior", group: "tecnico" },
      { label: "Tensión", value: "230V AC", group: "tecnico" },
      { label: "Peso", value: "350 g", group: "dimensiones" },
    ],
    compatibleModels: [
      "Fujitsu ASYG09LMCE",
      "Fujitsu ASYG12LMCE",
      "Fujitsu ASYG14LMCE",
    ],
    documents: [],
    reviews: [],
    averageRating: 4.6,
    reviewCount: 12,
    relatedProducts: ["6", "7"],
    alternativeProducts: [],
    tags: ["placa", "electrónica", "fujitsu", "ASYG"]
  }
];

// Función para obtener un producto por ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

// Función para obtener productos relacionados
export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product?.relatedProducts) return [];
  return product.relatedProducts.map(id => getProductById(id)).filter((p): p is Product => p !== undefined);
};

// Función para obtener productos alternativos
export const getAlternativeProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product?.alternativeProducts) return [];
  return product.alternativeProducts.map(id => getProductById(id)).filter((p): p is Product => p !== undefined);
};

// Categorías destacadas para la home
export const featuredCategories = [
  {
    id: "valvulas",
    name: "Válvulas de gas",
    count: 320,
    image: "/images/boiler-parts/valvula-gas.webp",
    href: "/repuestos/calderas/valvulas-gas",
    category: "calderas" as const
  },
  {
    id: "intercambiadores",
    name: "Intercambiadores",
    count: 185,
    image: "/images/boiler-parts/intercambiador-placas.webp",
    href: "/repuestos/calderas/intercambiadores",
    category: "calderas" as const
  },
  {
    id: "bombas",
    name: "Bombas de circulación",
    count: 156,
    image: "/images/boiler-parts/bomba-circulacion.webp",
    href: "/repuestos/calderas/bombas",
    category: "calderas" as const
  },
  {
    id: "placas",
    name: "Placas electrónicas",
    count: 278,
    image: "/images/boiler-parts/placa-electronica.webp",
    href: "/repuestos/calderas/placas-electronicas",
    category: "calderas" as const
  },
  {
    id: "compresores",
    name: "Compresores",
    count: 187,
    image: "/images/boiler-parts/quemador.webp",
    href: "/repuestos/aire/compresores",
    category: "aire-acondicionado" as const
  },
  {
    id: "motores",
    name: "Motores ventilador",
    count: 156,
    image: "/images/boiler-parts/intercambiador-placas.webp",
    href: "/repuestos/aire/motores",
    category: "aire-acondicionado" as const
  }
];
