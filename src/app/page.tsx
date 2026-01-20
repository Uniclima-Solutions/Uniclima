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
import { JsonLd, UNICLIMA_ORGANIZATION, UNICLIMA_WEBSITE, UNICLIMA_LOCAL_BUSINESS } from "@/components/JsonLd";


// Categorías de Repuestos de Calderas con imágenes reales
const repuestosCalderas = [
  {
    id: 1,
    name: "Placas",
    slug: "placas-electronicas",
    image: "/images/categorias/PlacasElectronicas.webp",
    count: 245
  },
  {
    id: 2,
    name: "Intercambiadores",
    slug: "intercambiadores-placas",
    image: "/images/categorias/IntercambiadorDePlacas.webp",
    count: 189
  },
  {
    id: 3,
    name: "Bombas",
    slug: "bombas-circulacion",
    image: "/images/categorias/Bombas.webp",
    count: 156
  },
  {
    id: 4,
    name: "Válvulas Gas",
    slug: "valvulas-gas",
    image: "/images/categorias/ValvulaGasCondensacion.webp",
    count: 312
  },
  {
    id: 5,
    name: "Extractores",
    slug: "extractores",
    image: "/images/categorias/Extractores.webp",
    count: 178
  },
  {
    id: 6,
    name: "Bitérmicos",
    slug: "intercambiadores-bitermicos",
    image: "/images/categorias/IntercambiadorBitermico.webp",
    count: 98
  },
  {
    id: 7,
    name: "Combustión",
    slug: "camaras-combustion",
    image: "/images/categorias/CamarasDeCombustion.webp",
    count: 67
  },
  {
    id: 8,
    name: "Válvulas 3 Vías",
    slug: "valvulas-3-vias",
    image: "/images/categorias/Valvulas3Vias.webp",
    count: 234
  },
  {
    id: 9,
    name: "Hidráulicos",
    slug: "cuerpos-hidraulicos",
    image: "/images/categorias/Hidraulicos.webp",
    count: 145
  },
  {
    id: 10,
    name: "Modulantes",
    slug: "extractores-modulantes",
    image: "/images/categorias/ExtractoresModulantes.webp",
    count: 89
  },
  {
    id: 11,
    name: "Vasos Expansión",
    slug: "vasos-expansion",
    image: "/images/categorias/VasoExpansion.webp",
    count: 167
  },
  {
    id: 12,
    name: "V. Seguridad",
    slug: "valvulas-seguridad",
    image: "/images/categorias/ValvulasSeguridad.webp",
    count: 198
  },
  {
    id: 13,
    name: "Sensores",
    slug: "sensores",
    image: "/images/categorias/Sensores.webp",
    count: 276
  },
  {
    id: 14,
    name: "Flujostatos",
    slug: "flujostatos",
    image: "/images/categorias/Flujostato.webp",
    count: 123
  },
  {
    id: 15,
    name: "Presostatos",
    slug: "presostatos",
    image: "/images/categorias/Presostatos.webp",
    count: 187
  },
  {
    id: 16,
    name: "Captadores",
    slug: "captadores-presion",
    image: "/images/categorias/CaptadorPresion.webp",
    count: 156
  },
  {
    id: 17,
    name: "Transformadores",
    slug: "transformadores",
    image: "/images/categorias/Transformadores.webp",
    count: 134
  },
  {
    id: 18,
    name: "V. Llenado",
    slug: "valvulas-llenado",
    image: "/images/categorias/ValvulaLLenado.webp",
    count: 112
  },
  {
    id: 19,
    name: "Microacumuladores",
    slug: "microacumuladores",
    image: "/images/categorias/Microacumuladores.webp",
    count: 78
  }
];

// Categorías de Repuestos de Aire Acondicionado
const categoriasAireAcondicionado: CategoryPart[] = [
  {
    id: 1,
    name: "Placas Interior",
    slug: "placas-interior",
    image: "/images/categorias/PlacasInterior.webp",
    count: 312
  },
  {
    id: 2,
    name: "Placas Exterior",
    slug: "placas-compresor",
    image: "/images/categorias/PlacasCompresor.webp",
    count: 234
  },
  {
    id: 3,
    name: "Turbinas",
    slug: "turbinas",
    image: "/images/categorias/Turbinas.webp",
    count: 187
  },
  {
    id: 4,
    name: "Motores",
    slug: "motor-turbinas",
    image: "/images/categorias/MotorTurbinas.webp",
    count: 156
  },
  {
    id: 5,
    name: "Hélices",
    slug: "helice-compresor",
    image: "/images/categorias/HeliceCompresor.webp",
    count: 198
  },
  {
    id: 6,
    name: "Motor Hélice",
    slug: "motor-helice-compresor",
    image: "/images/categorias/MotorHeliceCompresor.webp",
    count: 276
  },
  {
    id: 7,
    name: "B. Conductos",
    slug: "bomba-condensado-conductos",
    image: "/images/categorias/BombaCondensadoConductos.webp",
    count: 145
  },
  {
    id: 8,
    name: "B. Cassette",
    slug: "bomba-condensados-cassette",
    image: "/images/categorias/BombaCondensadosCassette.webp",
    count: 89
  },
  {
    id: 9,
    name: "Mandos",
    slug: "mandos-distancia",
    image: "/images/categorias/MandosDistanciaSplit.webp",
    count: 167
  }
];

// Categorías destacadas estilo PCComponentes
const categoriasPCC = [
  {
    id: 1,
    nombre: "Repuestos\nCalderas",
    image: "/images/cat-ofertas-calderas.webp",
    slug: "calderas"
  },
  {
    id: 2,
    nombre: "Aire\nAcondicionado",
    image: "/images/cat-aire-acondicionado.webp",
    slug: "aire-acondicionado"
  },
  {
    id: 3,
    nombre: "Calderas\nCompletas",
    image: "/images/cat-calderas-completas.webp",
    slug: "calderas-completas"
  },
  {
    id: 4,
    nombre: "Zona\nProfesionales",
    image: "/images/cat-profesionales.webp",
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
        className="cursor-pointer bg-white overflow-hidden w-full hover:shadow-2xl transition-all duration-300 ease-out rounded-lg sm:rounded-xl lg:rounded-2xl relative aspect-square group transform hover:scale-110 hover:-translate-y-2"
      >
        {/* Banner con forma de onda - posicionado detrás */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%]">
          <svg 
            className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-110" 
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
        <div className="absolute inset-0 flex items-center justify-center p-1 z-10 transition-transform duration-300 group-hover:scale-115">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain drop-shadow-2xl max-w-[92%] max-h-[80%] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Texto blanco en la parte inferior - más abajo y letra más pequeña */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-2 sm:pb-2.5 px-1 sm:px-2">
          <h3 className="text-white font-semibold text-[8px] sm:text-[10px] lg:text-xs leading-tight text-center drop-shadow-lg uppercase tracking-wider">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

// Componente Carrusel de Categorías con scroll automático lento
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll automático lento
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let animationId: number;
    let scrollSpeed = 0.5; // Píxeles por frame (muy lento)

    const autoScroll = () => {
      if (!isPaused && scrollEl) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
        
        // Si llegamos al final, volver al inicio suavemente
        if (scrollLeft >= scrollWidth - clientWidth - 1) {
          scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollEl.scrollLeft += scrollSpeed;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  useEffect(() => {
    checkScroll();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll);
      return () => scrollEl.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-white">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header con título y botón ver todos */}
        <div className="flex items-center justify-between mb-2 sm:mb-4 lg:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <Link 
            href={viewAllLink}
            className={`text-xs sm:text-sm font-semibold flex items-center gap-1 ${
              colorType === 'orange' ? 'text-orange-600 hover:text-orange-700' : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            Ver todos
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Carrusel */}
        <div className="relative">
          {/* Botón izquierda */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-30 w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
          )}

          {/* Contenedor scroll con pausa al hover */}
          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 snap-x"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              overscrollBehavior: 'contain'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="flex-shrink-0 w-[calc(33.333%-8px)] sm:w-[calc(25%-10px)] lg:w-[calc(20%-14px)] transition-transform duration-300 hover:z-10"
              >
                <CategoryPartCard category={category} basePath={basePath} colorType={colorType} />
              </div>
            ))}
          </div>

          {/* Botón derecha */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-30 w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
          )}
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
    color: "orange",
    icono: "shield",
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión", incluido: false },
      { texto: "Asistencia técnica incluida", incluido: false },
    ],
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
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión completa", incluido: true },
      { texto: "Asistencia técnica incluida", incluido: false },
    ],
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
      { texto: "Revisión elementos internos", incluido: true },
      { texto: "Control de presión del sistema", incluido: true },
      { texto: "Verificación sistema seguridad", incluido: true },
      { texto: "Prueba de combustión completa", incluido: true },
      { texto: "2 horas asistencia técnica", incluido: true },
    ],
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
    descripcion: "Mantenimiento preventivo anual",
    caracteristicas: [
      { texto: "Limpieza completa de filtros", incluido: true },
      { texto: "Revisión gas refrigerante", incluido: true },
      { texto: "Comprobación eléctrica", incluido: true },
      { texto: "Limpieza unidad exterior", incluido: false },
      { texto: "Asistencia 48/72 horas", incluido: false },
    ],
  },
  {
    id: 2,
    nombre: "Confort",
    precio: 95,
    periodo: "año",
    destacado: true,
    color: "blue",
    icono: "star",
    descripcion: "Preventivo + reparaciones prioritarias",
    caracteristicas: [
      { texto: "Limpieza completa de filtros", incluido: true },
      { texto: "Revisión gas refrigerante", incluido: true },
      { texto: "Comprobación eléctrica", incluido: true },
      { texto: "Limpieza unidad exterior", incluido: true },
      { texto: "Asistencia 48/72 horas", incluido: false },
    ],
  },
  {
    id: 3,
    nombre: "Premium",
    precio: 120,
    periodo: "año",
    destacado: false,
    color: "indigo",
    icono: "crown",
    descripcion: "Cobertura completa + invierno",
    caracteristicas: [
      { texto: "Limpieza completa de filtros", incluido: true },
      { texto: "Revisión gas refrigerante", incluido: true },
      { texto: "Comprobación eléctrica", incluido: true },
      { texto: "Limpieza unidad exterior", incluido: true },
      { texto: "Asistencia 48/72 horas", incluido: true },
    ],
  }
];

// Iconos por tipo
const PlanIcon = ({ icono, className }: { icono: string; className?: string }) => {
  switch (icono) {
    case 'shield': return <Shield className={className} />;
    case 'star': return <Star className={className} />;
    case 'crown': return <Crown className={className} />;
    default: return <Shield className={className} />;
  }
};

// Tipo para características con incluido/no incluido
type Caracteristica = { texto: string; incluido: boolean };

// Componente de tarjeta de precio - Diseño exacto del mockup con header degradado
function PricingCard({ plan, tipoEquipo }: { plan: typeof planesCaldera[0]; tipoEquipo: 'calderas' | 'aire' }) {
  // Mapear tipo de equipo a valor del formulario
  const tipoAparatoParam = tipoEquipo === 'calderas' ? 'Caldera de Gas' : 'Aire A. Split';
  const urlParams = new URLSearchParams({
    tipo: tipoAparatoParam,
    plan: plan.nombre
  });
  
  const isHighlighted = plan.destacado;
  const contractUrl = `/contrato-mantenimiento?${urlParams.toString()}`;
  
  // Gradientes según tipo de equipo - Naranja para calderas, Azul más azulado para aire
  const getHeaderGradient = () => {
    if (tipoEquipo === 'calderas') {
      if (plan.nombre === 'Esencial') return 'from-orange-400 to-orange-500';
      if (plan.nombre === 'Confort') return 'from-orange-500 to-orange-600';
      return 'from-orange-600 to-orange-700';
    } else {
      // Colores más azulados para aire acondicionado
      if (plan.nombre === 'Esencial') return 'from-sky-500 to-blue-600';
      if (plan.nombre === 'Confort') return 'from-blue-500 to-blue-700';
      return 'from-blue-600 to-indigo-700';
    }
  };

  const getBorderColor = () => {
    if (tipoEquipo === 'calderas') return 'border-orange-400 ring-orange-400';
    return 'border-blue-400 ring-blue-400';
  };

  const getBadgeColor = () => {
    if (tipoEquipo === 'calderas') return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-blue-500 to-blue-600';
  };

  const getButtonGradient = () => {
    if (tipoEquipo === 'calderas') return 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700';
    return 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-indigo-700';
  };

  const getCheckColor = () => {
    if (tipoEquipo === 'calderas') return 'bg-orange-500';
    return 'bg-blue-500';
  };
  
  return (
    <div className={`relative flex flex-col bg-white rounded-2xl shadow-lg border ${
      isHighlighted ? `${getBorderColor()} ring-2 ring-offset-2` : 'border-gray-100'
    }`}>
      {/* Badge Popular - Estrella más visible y texto más legible */}
      {isHighlighted && (
        <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className={`${getBadgeColor()} text-white text-xs font-bold px-5 py-2 rounded-full shadow-xl whitespace-nowrap flex items-center gap-1.5`}>
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="tracking-wide">POPULAR</span>
          </div>
        </div>
      )}
      
      {/* Header con degradado - Nombre, descripción y precio - Textos centrados */}
      <div className={`bg-gradient-to-r ${getHeaderGradient()} px-5 py-4 rounded-t-2xl text-center ${isHighlighted ? 'pt-6' : ''}`}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <PlanIcon icono={plan.icono} className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold text-white drop-shadow-sm">{plan.nombre}</h3>
        </div>
        <p className="text-white text-xs mb-2 opacity-90">{plan.descripcion}</p>
        <div>
          <span className="text-3xl font-black text-white drop-shadow-sm">€{plan.precio}</span>
          <span className="text-white text-sm opacity-90">/año</span>
        </div>
      </div>
      
      {/* Características con checks */}
      <div className="px-5 py-4 flex-grow">
        <ul className="space-y-2.5">
          {(plan.caracteristicas as Caracteristica[]).map((caracteristica, idx) => (
            <li key={idx} className="flex items-center gap-2.5">
              {caracteristica.incluido ? (
                <div className={`w-5 h-5 rounded-full ${getCheckColor()} flex items-center justify-center flex-shrink-0`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-gray-400" />
                </div>
              )}
              <span className={`text-sm ${caracteristica.incluido ? 'text-gray-700' : 'text-gray-400'}`}>
                {caracteristica.texto}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Botón CONTRATAR */}
      <div className="px-4 pb-4 mt-auto">
        <Link
          href={contractUrl}
          className={`w-full bg-gradient-to-r ${getButtonGradient()} text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wide shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
        >
          CONTRATAR
        </Link>
      </div>
    </div>
  );
}

// Sección de Mantenimiento con pestañas fusionadas
function MaintenanceSection() {
  const [activeTab, setActiveTab] = useState<'calderas' | 'aire'>('calderas');
  const planes = activeTab === 'calderas' ? planesCaldera : planesAire;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll suave para centrar en la tarjeta del medio (Confort - Recomendado)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 300;
    const gap = 16;
    const scrollToMiddle = cardWidth + gap;
    
    setTimeout(() => {
      container.scrollTo({ left: scrollToMiddle, behavior: 'smooth' });
    }, 100);
  }, [activeTab]);

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header principal - H2 optimizado para SEO */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Contratos de <span className="text-orange-500">Mantenimiento</span> Preventivo
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Revisión anual de calderas y aire acondicionado desde 70€/año con garantía
          </p>
        </div>
        
        {/* Pestañas con colores corporativos */}
        <div className="flex justify-center mb-6">
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
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
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
        
        {/* Tarjetas - Grid en desktop, scroll horizontal en móvil */}
        <div 
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 pt-6"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain'
          }}
        >
          {planes.map((plan) => (
            <div 
              key={plan.id} 
              className="snap-center flex-shrink-0 w-[300px] md:w-auto"
            >
              <PricingCard plan={plan} tipoEquipo={activeTab} />
            </div>
          ))}
        </div>
        
        {/* Indicadores de posición en móvil */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {planes.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full ${
                idx === 1 ? (activeTab === 'calderas' ? 'bg-orange-500' : 'bg-blue-500') : 'bg-gray-300'
              }`}
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
      {/* Schema.org JSON-LD para SEO */}
      <JsonLd data={[
        UNICLIMA_ORGANIZATION,
        UNICLIMA_WEBSITE,
        UNICLIMA_LOCAL_BUSINESS
      ]} />
      
      <Header />
      {/* Espaciador para compensar el header fixed */}
      <div className="h-14 lg:h-[104px]" />

      {/* Hero Banner Principal - Ofertas (ADAPTATIVO) */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/ofertas" className="block w-full">
            <picture>
              <source media="(max-width: 640px)" srcSet="/banner_ofertas_mobile_final.webp" />
              <source media="(max-width: 1024px)" srcSet="/banner_ofertas_tablet_final.webp" />
              <img 
                src="/banner_ofertas_final.webp" 
                alt="Ofertas en Repuestos para Calderas y Aire Acondicionado -50%" 
                className="w-full h-auto block rounded-2xl shadow-lg"
              />
            </picture>
          </Link>
        </div>
      </section>

      {/* Sección: Repuestos de Calderas - H2 optimizado para SEO */}
      <CategoryCarousel
        title="Repuestos de Calderas"
        subtitle="Placas electrónicas, válvulas, intercambiadores y más componentes originales"
        categories={repuestosCalderas}
        viewAllLink="/c/calderas"
        basePath="/c/calderas"
      />

      {/* Sección: Repuestos de Aire Acondicionado - H2 optimizado para SEO */}
      <CategoryCarousel
        title="Repuestos de Aire Acondicionado"
        subtitle="Placas, turbinas, motores y recambios para splits y climatización"
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
              <source media="(max-width: 640px)" srcSet="/banner_pieza_gratis_mobile_final.webp" />
              <source media="(max-width: 1024px)" srcSet="/banner_pieza_gratis_tablet_final.webp" />
              <img 
                src="/banner_pieza_gratis_final.webp" 
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
              <Link 
                key={cat.id}
                href={`/c/${cat.slug}`}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
              >
                <img 
                  src={cat.image} 
                  alt={cat.nombre.replace('\n', ' ')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg whitespace-pre-line leading-tight">
                    {cat.nombre}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zona Profesionales - H2 optimizado para SEO */}
      <section className="py-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-white text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Exclusivo para instaladores y técnicos HVAC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Zona Profesionales: Descuentos hasta 25%</h2>
              <p className="text-white/90 max-w-xl">
                Más de 500 instaladores de calderas y aire acondicionado ya disfrutan de precios especiales, envío prioritario y soporte técnico dedicado.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-black text-white">500+</div>
                <div className="text-white/80 text-sm">Profesionales activos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-black text-white">25%</div>
                <div className="text-white/80 text-sm">Descuento máximo</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center lg:justify-start">
            <Link 
              href="/profesionales/registro"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Crear Cuenta PRO
            </Link>
            <Link 
              href="/profesionales/presupuesto"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Solicitar Presupuesto
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Mantenimiento */}
      <MaintenanceSection />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Banner Reparación de Placas - Encima de Marcas */}
      <section className="w-full flex justify-center py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/diagnostico-placas" className="block w-full group">
            <img 
              src="/images/banners/banner-reparacion-placas-recortado.webp" 
              alt="¿No encuentras tu placa? ¡La reparamos! Técnicos especializados con 1 año de garantía - 48/72h - Hasta 60% descuento"
              className="w-full h-auto block rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            />
          </Link>
        </div>
      </section>

      {/* Marcas Slider */}
      <BrandScroller />

      <Footer />
    </div>
  );
}
