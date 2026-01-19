'use client'

/**
 * HOME - Ecommerce Profesional Tipo Retail Tech
 * Estructura PCComponentes con productos HVAC reales
 * Tarjetas de categorías con curva naranja estilo PCComponentes
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Truck, 
  RotateCcw, 
  Shield, 
  Headphones,
  Plus,
  Check,
  X,
  Flame,
  Wind,
  Wrench,
  Clock,
  Phone,
  Calendar,
  BadgePercent,
  Star,
  Crown,
  Zap,
  ArrowRight,
  Info,
  Percent,
  CreditCard
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandScroller from "@/components/BrandScroller";
import GoogleReviews from "@/components/GoogleReviews";
import PricingCardFlip from "@/components/PricingCardFlip";


// Categorías de Repuestos de Calderas con imágenes reales
const repuestosCalderas = [
  {
    id: 1,
    name: "Placas",
    slug: "placas-electronicas",
    image: "/images/categorias/PlacasElectronicas.png",
    count: 245
  },
  {
    id: 2,
    name: "Intercambiadores",
    slug: "intercambiadores-placas",
    image: "/images/categorias/IntercambiadorDePlacas.png",
    count: 189
  },
  {
    id: 3,
    name: "Bombas",
    slug: "bombas-circulacion",
    image: "/images/categorias/Bombas.png",
    count: 156
  },
  {
    id: 4,
    name: "Válvulas Gas",
    slug: "valvulas-gas",
    image: "/images/categorias/ValvulaGasCondensacion.png",
    count: 312
  },
  {
    id: 5,
    name: "Extractores",
    slug: "extractores",
    image: "/images/categorias/Extractores.png",
    count: 178
  },
  {
    id: 6,
    name: "Bitérmicos",
    slug: "intercambiadores-bitermicos",
    image: "/images/categorias/IntercambiadorBitermico.png",
    count: 98
  },
  {
    id: 7,
    name: "Combustión",
    slug: "camaras-combustion",
    image: "/images/categorias/CamarasDeCombustion.png",
    count: 67
  },
  {
    id: 8,
    name: "Válvulas 3 Vías",
    slug: "valvulas-3-vias",
    image: "/images/categorias/Valvulas3Vias.png",
    count: 234
  },
  {
    id: 9,
    name: "Hidráulicos",
    slug: "cuerpos-hidraulicos",
    image: "/images/categorias/Hidraulicos.png",
    count: 145
  },
  {
    id: 10,
    name: "Modulantes",
    slug: "extractores-modulantes",
    image: "/images/categorias/ExtractoresModulantes.png",
    count: 89
  },
  {
    id: 11,
    name: "Vasos Expansión",
    slug: "vasos-expansion",
    image: "/images/categorias/VasoExpansion.png",
    count: 167
  },
  {
    id: 12,
    name: "V. Seguridad",
    slug: "valvulas-seguridad",
    image: "/images/categorias/ValvulasSeguridad.png",
    count: 198
  },
  {
    id: 13,
    name: "Sensores",
    slug: "sensores",
    image: "/images/categorias/Sensores.png",
    count: 276
  },
  {
    id: 14,
    name: "Flujostatos",
    slug: "flujostatos",
    image: "/images/categorias/Flujostato.png",
    count: 123
  },
  {
    id: 15,
    name: "Presostatos",
    slug: "presostatos",
    image: "/images/categorias/Presostatos.png",
    count: 187
  },
  {
    id: 16,
    name: "Captadores",
    slug: "captadores-presion",
    image: "/images/categorias/CaptadorPresion.png",
    count: 156
  },
  {
    id: 17,
    name: "Transformadores",
    slug: "transformadores",
    image: "/images/categorias/Transformadores.png",
    count: 134
  },
  {
    id: 18,
    name: "V. Llenado",
    slug: "valvulas-llenado",
    image: "/images/categorias/ValvulaLLenado.png",
    count: 112
  },
  {
    id: 19,
    name: "Microacumuladores",
    slug: "microacumuladores",
    image: "/images/categorias/Microacumuladores.png",
    count: 78
  }
];

// Categorías de Repuestos de Aire Acondicionado
const categoriasAireAcondicionado: CategoryPart[] = [
  {
    id: 1,
    name: "Placas Interior",
    slug: "placas-interior",
    image: "/images/categorias/PlacasInterior.png",
    count: 312
  },
  {
    id: 2,
    name: "Placas Exterior",
    slug: "placas-compresor",
    image: "/images/categorias/PlacasCompresor.png",
    count: 234
  },
  {
    id: 3,
    name: "Turbinas",
    slug: "turbinas",
    image: "/images/categorias/Turbinas.png",
    count: 187
  },
  {
    id: 4,
    name: "Motores",
    slug: "motor-turbinas",
    image: "/images/categorias/MotorTurbinas.png",
    count: 156
  },
  {
    id: 5,
    name: "Hélices",
    slug: "helice-compresor",
    image: "/images/categorias/HeliceCompresor.png",
    count: 198
  },
  {
    id: 6,
    name: "Motor Hélice",
    slug: "motor-helice-compresor",
    image: "/images/categorias/MotorHeliceCompresor.png",
    count: 276
  },
  {
    id: 7,
    name: "B. Conductos",
    slug: "bomba-condensado-conductos",
    image: "/images/categorias/BombaCondensadoConductos.png",
    count: 145
  },
  {
    id: 8,
    name: "B. Cassette",
    slug: "bomba-condensados-cassette",
    image: "/images/categorias/BombaCondensadosCassette.png",
    count: 89
  },
  {
    id: 9,
    name: "Mandos",
    slug: "mandos-distancia",
    image: "/images/categorias/MandosDistanciaSplit.png",
    count: 167
  }
];

// Categorías destacadas estilo PCComponentes
const categoriasPCC = [
  {
    id: 1,
    nombre: "Repuestos\nCalderas",
    image: "/images/cat-ofertas-calderas.png",
    slug: "calderas"
  },
  {
    id: 2,
    nombre: "Aire\nAcondicionado",
    image: "/images/cat-aire-acondicionado.png",
    slug: "aire-acondicionado"
  },
  {
    id: 3,
    nombre: "Calderas\nCompletas",
    image: "/images/cat-calderas-completas.png",
    slug: "calderas-completas"
  },
  {
    id: 4,
    nombre: "Zona\nProfesionales",
    image: "/images/cat-profesionales.png",
    slug: "profesionales"
  }
];

// Componente CategoryCard para repuestos - Estilo PCComponentes con curva naranja
interface CategoryPart {
  id: number;
  name: string;
  slug: string;
  image: string;
  count: number;
}

// Formas de onda redondeadas y suaves para los banners
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z", // Curva suave central
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z", // Arco bajo
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z", // Colina central
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z", // Doble curva
  "M0,35 C100,35 150,55 200,55 C250,55 300,35 400,35 L400,100 L0,100 Z", // Valle suave
  "M0,25 C80,25 130,45 200,45 C270,45 320,25 400,25 L400,100 L0,100 Z", // Loma alta
  "M0,55 C70,30 140,30 200,45 C260,60 330,60 400,35 L400,100 L0,100 Z", // Onda asimétrica
  "M0,40 C50,55 100,55 150,40 C200,25 250,25 300,40 C350,55 400,55 400,40 L400,100 L0,100 Z", // Ondulación suave
];

function CategoryPartCard({ category, basePath = "/c/calderas", colorType = "orange" }: { category: CategoryPart; basePath?: string; colorType?: "orange" | "blue" }) {
  const isOrange = colorType === "orange";
  
  // Seleccionar forma de onda basada en el nombre de la categoría (para que sea consistente pero variada)
  const waveIndex = (category.name.length + category.name.charCodeAt(0)) % waveShapes.length;
  const wavePath = waveShapes[waveIndex];
  
  // Variación de degradado basada en el índice
  const gradientVariant = waveIndex % 3;
  
  return (
    <Link href={`${basePath}/${category.slug}`}>
      <div 
        className="cursor-pointer bg-white overflow-hidden w-full hover:shadow-2xl transition-all duration-300 rounded-lg sm:rounded-xl lg:rounded-2xl relative aspect-square"
      >
        {/* Banner con forma de onda - posicionado detrás */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%]">
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 400 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-${isOrange ? 'orange' : 'blue'}-${category.slug}`} 
                x1={gradientVariant === 0 ? "0%" : gradientVariant === 1 ? "100%" : "50%"} 
                y1="0%" 
                x2={gradientVariant === 0 ? "100%" : gradientVariant === 1 ? "0%" : "50%"} 
                y2="100%"
              >
                <stop offset="0%" stopColor={isOrange ? '#ffab66' : '#818cf8'} />
                <stop offset="50%" stopColor={isOrange ? '#ff6900' : '#6366f1'} />
                <stop offset="100%" stopColor={isOrange ? '#cc5500' : '#4f46e5'} />
              </linearGradient>
            </defs>
            <path d={wavePath} fill={`url(#gradient-${isOrange ? 'orange' : 'blue'}-${category.slug})`} />
          </svg>
        </div>
        
        {/* Contenedor de imagen - ocupa todo el espacio disponible */}
        <div className="absolute inset-0 flex items-center justify-center p-1 z-10">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain drop-shadow-2xl max-w-[92%] max-h-[85%]"
            loading="lazy"
          />
        </div>
        
        {/* Texto blanco en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-3 sm:pb-4 px-1 sm:px-2">
          <h3 className="text-white font-bold text-[10px] sm:text-xs lg:text-sm leading-tight text-center drop-shadow-lg uppercase tracking-wide">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

// Componente Carrusel de Categorías
function CategoryCarousel({ 
  title, 
  subtitle,
  categories, 
  viewAllLink,
  basePath = "/c/calderas",
  colorType = "orange"
}: { 
  title: string; 
  subtitle?: string;
  categories: CategoryPart[]; 
  viewAllLink: string;
  basePath?: string;
  colorType?: "orange" | "blue";
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Actualizar estado de scroll
  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      updateScrollState();
      return () => container.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 200; // Ancho aproximado de cada tarjeta
      const visibleCards = Math.floor(container.clientWidth / cardWidth);
      const scrollAmount = cardWidth * Math.max(1, visibleCards - 1);
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
      <section className="py-6 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 text-[10px] sm:text-xs lg:text-sm mt-0.5 hidden sm:block">{subtitle}</p>}
          </div>
          <Link href={viewAllLink} className="flex items-center gap-0.5 sm:gap-1 text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm transition-colors">
            Ver todos
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Carrusel con scroll fluido */}
        <div className="relative group">
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl ${
              canScrollLeft
                ? "opacity-100 -translate-x-1/2"
                : "opacity-0 pointer-events-none -translate-x-full"
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>

          {/* Contenedor de scroll fluido */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="flex-shrink-0 w-[160px] sm:w-[200px] lg:w-[240px]"
              >
                <CategoryPartCard category={category} basePath={basePath} colorType={colorType} />
              </div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl ${
              canScrollRight
                ? "opacity-100 translate-x-1/2"
                : "opacity-0 pointer-events-none translate-x-full"
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Datos de planes de mantenimiento - Calderas (preventivo: octubre-noviembre)
const planesCaldera = [
  {
    id: 1,
    nombre: "Esencial",
    precio: 90,
    periodo: "año",
    destacado: false,
    color: "emerald",
    icono: "shield",
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      "1 intervención preventiva (oct-nov)",
      "Revisión completa de seguridad",
      "Control de presión y estanqueidad",
      "Limpieza de quemador",
      "Certificado de mantenimiento",
    ],
    detalles: [
      "Intervención programada entre octubre y noviembre",
      "Técnico certificado en calderas de gas",
      "Informe detallado del estado del equipo",
      "Recomendaciones de uso y ahorro",
      "Garantía de servicio 30 días",
    ],
    ventajas: [
      "Cumple normativa vigente",
      "Previene averías en invierno",
      "Optimiza el consumo de gas",
    ]
  },
  {
    id: 2,
    nombre: "Confort",
    precio: 120,
    periodo: "año",
    destacado: true,
    color: "orange",
    icono: "star",
    descripcion: "Preventivo + reparaciones prioritarias",
    caracteristicas: [
      "1 intervención preventiva (oct-nov)",
      "Reparaciones en 48-72 horas",
      "10% dto. en repuestos",
      "Atención telefónica prioritaria",
      "Sin costes de desplazamiento",
    ],
    detalles: [
      "Todo lo incluido en el plan Esencial",
      "Prioridad en la asignación de técnicos",
      "Diagnóstico telefónico gratuito",
      "Presupuesto sin compromiso en reparaciones",
      "Seguimiento post-intervención",
    ],
    ventajas: [
      "Respuesta rápida ante averías",
      "Ahorro en repuestos originales",
      "Tranquilidad todo el año",
    ]
  },
  {
    id: 3,
    nombre: "Premium",
    precio: 140,
    periodo: "año",
    destacado: false,
    color: "violet",
    icono: "crown",
    descripcion: "Cobertura completa + verano",
    caracteristicas: [
      "2 intervenciones anuales",
      "Reparaciones en 48-72 horas",
      "15% dto. en repuestos",
      "Mano de obra incluida",
      "Atención telefónica prioritaria",
    ],
    detalles: [
      "1ª intervención preventiva (oct-nov)",
      "2ª intervención de verificación (verano)",
      "Máxima prioridad en reparaciones urgentes",
      "Repuestos originales con descuento máximo",
      "Garantía extendida en reparaciones",
    ],
    ventajas: [
      "Doble revisión = doble seguridad",
      "Respuesta urgente garantizada",
      "El mejor precio en reparaciones",
    ]
  }
];

// Datos de planes de mantenimiento - Aire Acondicionado (preventivo: marzo-abril)
const planesAire = [
  {
    id: 1,
    nombre: "Esencial",
    precio: 70,
    periodo: "año",
    destacado: false,
    color: "sky",
    icono: "shield",
    descripcion: "Revisión preventiva anual",
    caracteristicas: [
      "1 revisión preventiva (abr-may)",
      "Limpieza de filtros",
      "Comprobación visual del equipo",
      "Certificado de mantenimiento",
    ],
    detalles: [
      "Intervención programada entre abril y mayo",
      "Técnico certificado en climatización",
      "Informe básico del estado del equipo",
      "Recomendaciones de uso",
    ],
    ventajas: [
      "Equipo revisado para el verano",
      "Cumple normativa vigente",
    ]
  },
  {
    id: 2,
    nombre: "Confort",
    precio: 95,
    periodo: "año",
    destacado: true,
    color: "blue",
    icono: "star",
    descripcion: "Preventivo + atención prioritaria",
    caracteristicas: [
      "1 revisión preventiva (abr-may)",
      "Limpieza de filtros y unidad interior",
      "Comprobación gas refrigerante",
      "Atención prioritaria en averías",
      "5% dto. en repuestos",
    ],
    detalles: [
      "Todo lo incluido en el plan Esencial",
      "Prioridad en la asignación de técnicos",
      "Diagnóstico telefónico",
      "Presupuesto sin compromiso",
    ],
    ventajas: [
      "Respuesta más rápida en verano",
      "Ahorro en repuestos",
      "Mayor tranquilidad",
    ]
  },
  {
    id: 3,
    nombre: "Premium",
    precio: 120,
    periodo: "año",
    destacado: false,
    color: "indigo",
    icono: "crown",
    descripcion: "Cobertura ampliada",
    caracteristicas: [
      "2 revisiones anuales",
      "Limpieza completa (interior + exterior)",
      "Comprobación gas refrigerante",
      "10% dto. en repuestos",
      "Atención telefónica prioritaria",
    ],
    detalles: [
      "1ª revisión preventiva (abr-may)",
      "2ª revisión de verificación (otoño)",
      "Prioridad en reparaciones",
      "Repuestos con descuento",
    ],
    ventajas: [
      "Doble revisión anual",
      "Mejor precio en reparaciones",
      "Equipo siempre a punto",
    ]
  }
];

// Colores con degradados - Naranja para calderas, Azul para aire
// Calderas: degradados de naranja claro a oscuro según plan
const calderaColors = {
  esencial: { gradient: 'from-orange-400 to-orange-500', bg: 'bg-orange-400', bgLight: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-300', accent: 'bg-orange-100' },
  confort: { gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-500', bgLight: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-400', accent: 'bg-orange-100' },
  premium: { gradient: 'from-orange-600 to-orange-700', bg: 'bg-orange-600', bgLight: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-500', accent: 'bg-orange-100' },
};

// Aire: degradados de azul claro a oscuro según plan
const aireColors = {
  esencial: { gradient: 'from-sky-400 to-sky-500', bg: 'bg-sky-400', bgLight: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-300', accent: 'bg-sky-100' },
  confort: { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-400', accent: 'bg-blue-100' },
  premium: { gradient: 'from-blue-600 to-blue-700', bg: 'bg-blue-600', bgLight: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500', accent: 'bg-blue-100' },
};

// Función para obtener colores según tipo de equipo y plan
const getColors = (tipoEquipo: 'calderas' | 'aire', planNombre: string) => {
  const colorSet = tipoEquipo === 'calderas' ? calderaColors : aireColors;
  const planKey = planNombre.toLowerCase() as keyof typeof calderaColors;
  return colorSet[planKey] || colorSet.confort;
};

// Iconos por tipo
const PlanIcon = ({ icono, className }: { icono: string; className?: string }) => {
  switch (icono) {
    case 'shield': return <Shield className={className} />;
    case 'star': return <Star className={className} />;
    case 'crown': return <Crown className={className} />;
    default: return <Shield className={className} />;
  }
};

// Componente de tarjeta de precio - Diseño Premium sin flip
function PricingCard({ plan, tipoEquipo }: { plan: typeof planesCaldera[0]; tipoEquipo: 'calderas' | 'aire' }) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Mapear tipo de equipo a valor del formulario
  const tipoAparatoParam = tipoEquipo === 'calderas' ? 'Caldera de Gas' : 'Aire A. Split';
  const urlParams = new URLSearchParams({
    tipo: tipoAparatoParam,
    plan: plan.nombre
  });
  
  // Obtener colores según tipo de equipo y plan
  const colors = getColors(tipoEquipo, plan.nombre);
  const isHighlighted = plan.destacado;
  
  const handleContract = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/contrato-mantenimiento?${urlParams.toString()}`;
  };
  
  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white flex-shrink-0 w-[280px] sm:w-full ${
      isHighlighted 
        ? 'ring-2 ring-orange-500 ring-offset-2 scale-[1.02]' 
        : 'border border-gray-200'
    }`}>
      {/* Badge Recomendado */}
      {isHighlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-[10px] font-bold px-3 py-1 rounded-b-lg shadow-md">
            ★ RECOMENDADO
          </div>
        </div>
      )}
      
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-br ${colors.gradient} px-4 py-4 text-white relative overflow-hidden`}>
        {/* Patrón decorativo */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <PlanIcon icono={plan.icono} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">{plan.nombre}</h3>
              <p className="text-white/80 text-xs leading-tight">{plan.descripcion}</p>
            </div>
          </div>
          
          {/* Precio */}
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-black">€{plan.precio}</span>
            <span className="text-white/70 text-sm">/{plan.periodo}</span>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="px-4 py-4 bg-white">
        {/* Características principales */}
        <ul className="space-y-2 mb-4">
          {plan.caracteristicas.map((caracteristica, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className={`w-5 h-5 rounded-full ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check className={`w-3 h-3 ${colors.text}`} />
              </div>
              <span className="text-sm text-gray-700 leading-tight">{caracteristica}</span>
            </li>
          ))}
        </ul>
        
        {/* Ventajas destacadas */}
        <div className={`${colors.bgLight} rounded-xl p-3 mb-4 border ${colors.border}`}>
          <p className={`text-xs font-bold ${colors.text} mb-2 flex items-center gap-1.5 uppercase tracking-wider`}>
            <Zap className="w-3 h-3" /> Ventajas incluidas
          </p>
          <ul className="space-y-1">
            {plan.ventajas.map((ventaja, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                {ventaja}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Botón ver detalles */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${colors.bgLight} ${colors.text} hover:opacity-80 transition-all mb-3`}
        >
          <Info className="w-3.5 h-3.5" />
          {showDetails ? 'Ocultar detalles' : 'Ver detalles del servicio'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Detalles expandibles */}
        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className={`text-xs font-bold ${colors.text} mb-2 uppercase tracking-wider flex items-center gap-1.5`}>
              <Info className="w-3 h-3" />
              Detalles del servicio
            </p>
            <ul className="space-y-2">
              {plan.detalles.map((detalle, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-md ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <ArrowRight className={`w-2.5 h-2.5 ${colors.text}`} />
                  </div>
                  <span className="text-xs text-gray-700 leading-tight">{detalle}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Botón contratar */}
        <button
          onClick={handleContract}
          className={`w-full bg-gradient-to-r ${colors.gradient} text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2`}
        >
          Contratar ahora
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Sección de Mantenimiento con scroll horizontal en móvil
function MaintenanceSection() {
  const [activeTab, setActiveTab] = useState<'calderas' | 'aire'>('calderas');
  const planes = activeTab === 'calderas' ? planesCaldera : planesAire;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Contratos de <span className="text-orange-500">Mantenimiento</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Protege tu inversión con nuestros planes de mantenimiento preventivo
          </p>
        </div>
        
        {/* Tabs con colores corporativos */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab('calderas')}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === 'calderas'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              <Flame className="w-4 h-4" />
              Calderas
            </button>
            <button
              onClick={() => setActiveTab('aire')}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === 'aire'
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Wind className="w-4 h-4" />
              Aire Acondicionado
            </button>
          </div>
        </div>
        
        {/* Indicador de scroll en móvil */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <ChevronLeft className="w-4 h-4 animate-pulse" />
            <span>Desliza para ver todos los planes</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
        
        {/* Tarjetas con scroll horizontal en móvil */}
        <div 
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 pt-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {planes.map((plan) => (
            <div key={plan.id} className="snap-center">
              <PricingCardFlip plan={plan} tipoEquipo={activeTab} />
            </div>
          ))}
        </div>
        
        {/* Indicadores de posición en móvil */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {planes.map((_, idx) => (
            <div 
              key={idx} 
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Espaciador para compensar el header fixed */}
      <div className="h-14 lg:h-[104px]" />

      {/* Hero Banner Principal - Ofertas (ADAPTATIVO) */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/ofertas" className="block w-full">
            <picture>
              <source media="(max-width: 640px)" srcSet="/banner_ofertas_mobile_final.png" />
              <source media="(max-width: 1024px)" srcSet="/banner_ofertas_tablet_final.png" />
              <img 
                src="/banner_ofertas_final.png" 
                alt="Ofertas en Repuestos para Calderas y Aire Acondicionado -50%" 
                className="w-full h-auto block rounded-2xl shadow-lg"
              />
            </picture>
          </Link>
        </div>
      </section>

      {/* Sección: Repuestos de Calderas */}
      <CategoryCarousel
        title="Repuestos de Calderas"
        subtitle="Componentes originales y compatibles de las mejores marcas"
        categories={repuestosCalderas}
        viewAllLink="/c/calderas"
        basePath="/c/calderas"
      />

      {/* Sección: Repuestos de Aire Acondicionado */}
      <CategoryCarousel
        title="Repuestos de Aire Acondicionado"
        subtitle="Componentes para splits, multisplits y sistemas de climatización"
        categories={categoriasAireAcondicionado}
        viewAllLink="/c/aire-acondicionado"
        basePath="/c/aire-acondicionado"
        colorType="blue"
      />

      {/* Banner Pieza Gratis - ADAPTATIVO */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/pieza-gratis" className="block w-full">
            <picture>
              <source media="(max-width: 640px)" srcSet="/banner_pieza_gratis_mobile_final.png" />
              <source media="(max-width: 1024px)" srcSet="/banner_pieza_gratis_tablet_final.png" />
              <img 
                src="/banner_pieza_gratis_final.png" 
                alt="Llévate tu pieza GRATIS - Envíanos un vídeo de la reparación y te regalamos la pieza"
                className="w-full h-auto block rounded-2xl shadow-lg"
              />
            </picture>
          </Link>
        </div>
      </section>

      {/* Categorías destacadas - Estilo PCComponentes */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {categoriasPCC.map((cat) => (
              <Link key={cat.id} href={`/c/${cat.slug}`}>
                <div className="group relative aspect-square rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden bg-gray-100 hover:shadow-xl transition-all duration-300">
                  {/* Imagen de fondo */}
                  <img
                    src={cat.image}
                    alt={cat.nombre.replace('\n', ' ')}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Título en esquina inferior izquierda */}
                  <div className="absolute bottom-0 left-0 p-2 sm:p-3 lg:p-5">
                    <h3 className="text-white font-bold text-xs sm:text-sm lg:text-lg leading-tight whitespace-pre-line drop-shadow-lg">
                      {cat.nombre}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA Profesionales - Diseño Premium */}
      <section className="py-10 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Contenido izquierdo */}
              <div className="text-white text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-white text-xs font-medium mb-4">
                  <Shield className="w-4 h-4" />
                  Exclusivo para profesionales
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                  ¿Eres profesional del sector?
                </h2>
                <p className="text-orange-100 text-sm sm:text-base lg:text-lg mb-6 leading-relaxed">
                  Únete a más de 500 instaladores que ya disfrutan de descuentos exclusivos, 
                  envío prioritario y soporte técnico dedicado.
                </p>
                
                {/* Beneficios */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Percent className="w-3.5 h-3.5" />
                    </div>
                    <span>Hasta 25% dto.</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <span>Envío prioritario</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <span>Soporte dedicado</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <span>Pago a 30 días</span>
                  </div>
                </div>
                
                {/* Botones CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link 
                    href="/registro-profesional" 
                    className="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 text-center text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Crear Cuenta PRO
                  </Link>
                  <Link 
                    href="/contacto" 
                    className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-300 text-center text-sm sm:text-base"
                  >
                    Solicitar Presupuesto
                  </Link>
                </div>
              </div>
              
              {/* Stats derecha - solo desktop */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
                  <div className="text-4xl font-bold text-white mb-1">500+</div>
                  <div className="text-orange-100 text-sm">Profesionales activos</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
                  <div className="text-4xl font-bold text-white mb-1">25%</div>
                  <div className="text-orange-100 text-sm">Descuento máximo</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
                  <div className="text-4xl font-bold text-white mb-1">24h</div>
                  <div className="text-orange-100 text-sm">Envío express</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
                  <div className="text-4xl font-bold text-white mb-1">30</div>
                  <div className="text-orange-100 text-sm">Días para pagar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Contratos de Mantenimiento */}
      <MaintenanceSection />

      {/* Reseñas de Google */}
      <GoogleReviews />

      {/* Banner Reparación de Placas - ADAPTATIVO */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/diagnostico-placas" className="block w-full">
            <picture>
              <source media="(max-width: 640px)" srcSet="/banner_placa_mobile_final.png" />
              <source media="(max-width: 1024px)" srcSet="/banner_placa_tablet_final.png" />
              <img 
                src="/banner_placa_final.png" 
                alt="¿No encuentras tu placa? ¡La reparamos! Técnicos especializados con 1 año de garantía"
                className="w-full h-auto block rounded-2xl shadow-lg"
              />
            </picture>
          </Link>
        </div>
      </section>

      {/* Marcas */}
      <BrandScroller />

      <Footer />
    </div>
  );
}
