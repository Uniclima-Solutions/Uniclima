'use client'

/**
 * MegaMenu Component - Diseño Premium Profesional
 * 
 * Características:
 * - 2 pestañas principales: Servicios y Tienda
 * - Iconografía profesional con Lucide React
 * - Miniaturas de marcas en lugar de nombres
 * - Desplegable de zonas de cobertura en Servicios
 * - Desplegable para cada servicio (Mantenimiento, Reparación, Instalación)
 * - Animaciones suaves con Framer Motion
 * - Totalmente responsive
 * - Colores corporativos (Naranja #F97316, Azul oscuro)
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronRight, Phone, Mail, Clock,
  Flame, Snowflake, Sun, Zap, Wrench, Settings,
  ShoppingBag, Package, Shield, Tag, Heart, Truck,
  Search, Star, ArrowRight, Sparkles,
  ThermometerSun, Wind, CircuitBoard, Droplets, Fan,
  Home, Building2, CheckCircle2, Award, MapPin, ChevronDown
} from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "servicios" | "tienda";

// ============================================
// DATOS DEL MENÚ
// ============================================

// Servicios de reparación con sub-servicios desplegables
const servicios = [
  {
    id: "aerotermia",
    name: "Aerotermia",
    description: "Instalación y reparación de sistemas aerotérmicos",
    icon: ThermometerSun,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    href: "/servicios/aerotermia",
    subServicios: [
      { name: "Instalación", slug: "instalacion", icon: Settings },
      { name: "Reparación", slug: "reparacion", icon: Wrench },
      { name: "Mantenimiento", slug: "mantenimiento", icon: CheckCircle2 }
    ]
  },
  {
    id: "fotovoltaica",
    name: "Placas Fotovoltaicas",
    description: "Energía solar para tu hogar o negocio",
    icon: Sun,
    color: "from-amber-500 to-yellow-500",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    href: "/servicios/fotovoltaica",
    subServicios: [
      { name: "Instalación", slug: "instalacion", icon: Settings },
      { name: "Reparación", slug: "reparacion", icon: Wrench },
      { name: "Mantenimiento", slug: "mantenimiento", icon: CheckCircle2 }
    ]
  },
  {
    id: "aire-acondicionado",
    name: "Aire Acondicionado",
    description: "Climatización profesional todo el año",
    icon: Snowflake,
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    href: "/servicios/aire-acondicionado",
    subServicios: [
      { name: "Instalación", slug: "instalacion", icon: Settings },
      { name: "Reparación", slug: "reparacion", icon: Wrench },
      { name: "Mantenimiento", slug: "mantenimiento", icon: CheckCircle2 }
    ]
  },
  {
    id: "calderas",
    name: "Calderas",
    description: "Expertos en calefacción y ACS",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
    href: "/servicios/calderas",
    subServicios: [
      { name: "Instalación", slug: "instalacion", icon: Settings },
      { name: "Reparación", slug: "reparacion", icon: Wrench },
      { name: "Mantenimiento", slug: "mantenimiento", icon: CheckCircle2 }
    ]
  }
];

// Zonas de cobertura
const zonasCobertura = {
  barriosMadrid: {
    title: "Barrios de Madrid",
    icon: Building2,
    zonas: [
      { name: "Salamanca", slug: "salamanca" },
      { name: "Chamberí", slug: "chamberi" },
      { name: "Retiro", slug: "retiro" },
      { name: "Chamartín", slug: "chamartin" },
      { name: "Moncloa-Aravaca", slug: "moncloa-aravaca" },
      { name: "Centro", slug: "centro" },
      { name: "Arganzuela", slug: "arganzuela" },
      { name: "Tetuán", slug: "tetuan" },
      { name: "Fuencarral-El Pardo", slug: "fuencarral" },
      { name: "Hortaleza", slug: "hortaleza" },
      { name: "Ciudad Lineal", slug: "ciudad-lineal" },
      { name: "Barajas", slug: "barajas" }
    ]
  },
  municipiosPremium: {
    title: "Municipios Premium",
    icon: Star,
    zonas: [
      { name: "Pozuelo de Alarcón", slug: "pozuelo" },
      { name: "Las Rozas", slug: "las-rozas" },
      { name: "Majadahonda", slug: "majadahonda" },
      { name: "Boadilla del Monte", slug: "boadilla" },
      { name: "Villanueva de la Cañada", slug: "villanueva-canada" },
      { name: "Torrelodones", slug: "torrelodones" },
      { name: "Alcobendas", slug: "alcobendas" },
      { name: "San Sebastián de los Reyes", slug: "san-sebastian-reyes" },
      { name: "Tres Cantos", slug: "tres-cantos" },
      { name: "La Moraleja", slug: "la-moraleja" }
    ]
  },
  zonaTorrejon: {
    title: "Zona Torrejón de Ardoz",
    icon: MapPin,
    zonas: [
      { name: "Torrejón de Ardoz", slug: "torrejon" },
      { name: "Alcalá de Henares", slug: "alcala-henares" },
      { name: "San Fernando de Henares", slug: "san-fernando" },
      { name: "Coslada", slug: "coslada" },
      { name: "Paracuellos de Jarama", slug: "paracuellos" },
      { name: "Mejorada del Campo", slug: "mejorada" },
      { name: "Velilla de San Antonio", slug: "velilla" },
      { name: "Loeches", slug: "loeches" },
      { name: "Ajalvir", slug: "ajalvir" },
      { name: "Daganzo de Arriba", slug: "daganzo" }
    ]
  }
};

// Categorías de tienda
const categoriasRepuestos = {
  calderas: {
    name: "Repuestos Calderas",
    icon: Flame,
    color: "text-orange-500",
    href: "/c/calderas",
    items: [
      { name: "Placas Electrónicas", slug: "placas-electronicas", icon: CircuitBoard },
      { name: "Intercambiadores", slug: "intercambiadores-placas", icon: Droplets },
      { name: "Bombas Circulación", slug: "bombas-circulacion", icon: Settings },
      { name: "Válvulas de Gas", slug: "valvulas-gas", icon: Settings },
      { name: "Sensores y Sondas", slug: "sensores", icon: Wind },
      { name: "Ver todas →", slug: "", icon: ArrowRight, isLink: true }
    ]
  },
  aire: {
    name: "Repuestos Aire",
    icon: Snowflake,
    color: "text-blue-500",
    href: "/c/aire-acondicionado",
    items: [
      { name: "Placas Interior", slug: "placas-interior", icon: CircuitBoard },
      { name: "Placas Exterior", slug: "placas-compresor", icon: CircuitBoard },
      { name: "Turbinas", slug: "turbinas", icon: Fan },
      { name: "Motores", slug: "motor-turbinas", icon: Settings },
      { name: "Mandos", slug: "mandos-distancia", icon: Settings },
      { name: "Ver todas →", slug: "", icon: ArrowRight, isLink: true }
    ]
  },
  equipos: {
    name: "Equipos Nuevos",
    icon: Package,
    color: "text-green-500",
    href: "/equipos",
    items: [
      { name: "Calderas Completas", slug: "calderas", icon: Flame },
      { name: "Aires Acondicionados", slug: "aires", icon: Snowflake },
      { name: "Aerotermia", slug: "aerotermia", icon: ThermometerSun },
      { name: "Termos Eléctricos", slug: "termos", icon: Droplets },
      { name: "Ver todos →", slug: "", icon: ArrowRight, isLink: true }
    ]
  }
};

// Marcas con logos (miniaturas)
const marcas = [
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.webp" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.webp" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.webp" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.webp" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.webp" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.webp" },
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.webp" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.webp" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.webp" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.webp" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.webp" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.webp" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.webp" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.webp" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.webp" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.webp" },
];

// Enlaces rápidos
const enlacesRapidos = [
  { name: "Ofertas", icon: Tag, href: "/ofertas", color: "text-red-500", bg: "bg-red-50" },
  { name: "Favoritos", icon: Heart, href: "/favoritos", color: "text-pink-500", bg: "bg-pink-50" },
  { name: "Seguimiento", icon: Truck, href: "/seguimiento", color: "text-green-500", bg: "bg-green-50" },
  { name: "Profesionales", icon: Shield, href: "/profesionales", color: "text-purple-500", bg: "bg-purple-50" },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<TabType>("tienda");
  const [searchQuery, setSearchQuery] = useState("");
  const [zonasExpanded, setZonasExpanded] = useState<string | null>(null);
  const [servicioExpanded, setServicioExpanded] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveTab("tienda");
        setSearchQuery("");
        setZonasExpanded(null);
        setServicioExpanded(null);
      }, 300);
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Toggle zonas desplegable
  const toggleZonas = (key: string) => {
    setZonasExpanded(zonasExpanded === key ? null : key);
  };

  // Toggle servicio desplegable
  const toggleServicio = (id: string) => {
    setServicioExpanded(servicioExpanded === id ? null : id);
  };

  // ============================================
  // RENDER PESTAÑA SERVICIOS
  // ============================================
  const renderServicios = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="p-4 md:p-6"
    >
      {/* Grid de servicios principales con desplegables */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-5 h-5 text-orange-500" />
          <h4 className="font-bold text-gray-900">Nuestros Servicios</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {servicios.map((servicio) => {
          const Icon = servicio.icon;
          const isExpanded = servicioExpanded === servicio.id;
          
          return (
            <div
              key={servicio.id}
              className="relative overflow-hidden rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Header del servicio - clickeable para expandir */}
              <button
                onClick={() => toggleServicio(servicio.id)}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Icono */}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${servicio.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  
                  {/* Contenido */}
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">
                      {servicio.name}
                    </h3>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      {servicio.description}
                    </p>
                  </div>
                </div>
                
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {/* Contenido desplegable con sub-servicios */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="p-3 bg-gray-50">
                      <div className="grid grid-cols-3 gap-2">
                        {servicio.subServicios.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.slug}
                              href={`/servicios/${servicio.id}/${sub.slug}`}
                              onClick={onClose}
                              className={`flex flex-col items-center gap-1.5 p-2 md:p-3 rounded-lg ${servicio.bgLight} hover:shadow-md transition-all duration-200 group`}
                            >
                              <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                <SubIcon className={`w-4 h-4 ${servicio.textColor}`} />
                              </div>
                              <span className={`text-xs font-medium ${servicio.textColor} text-center`}>
                                {sub.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      
                      {/* Link a ver todos los servicios de esta categoría */}
                      <Link
                        href={servicio.href}
                        onClick={onClose}
                        className={`mt-2 flex items-center justify-center gap-1 text-xs ${servicio.textColor} hover:underline`}
                      >
                        Ver todos los servicios de {servicio.name}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        </div>
      </div>

      {/* Desplegable de Zonas de Cobertura */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-orange-500" />
          <h4 className="font-bold text-gray-900">Zonas de Cobertura</h4>
        </div>
        
        <div className="space-y-2">
          {Object.entries(zonasCobertura).map(([key, zona]) => {
            const Icon = zona.icon;
            const isExpanded = zonasExpanded === key;
            
            return (
              <div key={key} className="bg-white rounded-xl overflow-hidden border border-gray-100">
                {/* Header del desplegable */}
                <button
                  onClick={() => toggleZonas(key)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{zona.title}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {zona.zonas.length} zonas
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Contenido del desplegable */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 pt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {zona.zonas.map((z) => (
                          <Link
                            key={z.slug}
                            href={`/servicios/zona/${z.slug}`}
                            onClick={onClose}
                            className="text-xs text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-2 py-1.5 rounded-lg transition-colors truncate"
                          >
                            {z.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Banner de garantía */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Técnicos Certificados</h4>
            <p className="text-xs text-gray-400">1 año de garantía en todas las reparaciones</p>
          </div>
        </div>
        <Link
          href="/contacto"
          onClick={onClose}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap text-sm"
        >
          <Phone className="w-4 h-4" />
          Solicitar Presupuesto
        </Link>
      </div>
    </motion.div>
  );

  // ============================================
  // RENDER PESTAÑA TIENDA
  // ============================================
  const renderTienda = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="p-4 md:p-6"
    >
      {/* Grid de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(categoriasRepuestos).map(([key, categoria]) => {
          const Icon = categoria.icon;
          return (
            <div key={key} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${categoria.color}`} />
                <h3 className="font-bold text-gray-900 text-sm">{categoria.name}</h3>
              </div>
              <ul className="space-y-1">
                {categoria.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={item.isLink ? categoria.href : `${categoria.href}/${item.slug}`}
                        onClick={onClose}
                        className={`flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors ${
                          item.isLink ? "text-orange-600 font-medium" : "text-gray-600"
                        }`}
                      >
                        <ItemIcon className="w-3.5 h-3.5 text-gray-400" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* Grid de marcas */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 md:col-span-1 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">Marcas</h3>
            <Link
              href="/marcas"
              onClick={onClose}
              className="text-xs text-orange-600 hover:underline flex items-center gap-1"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {marcas.map((marca) => (
              <Link
                key={marca.slug}
                href={`/marca/${marca.slug}`}
                onClick={onClose}
                className="relative aspect-square rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden group"
                title={marca.name}
              >
                <Image
                  src={marca.logo}
                  alt={marca.name}
                  fill
                  className="object-contain p-1.5 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="flex flex-wrap gap-2 mb-4">
        {enlacesRapidos.map((enlace) => {
          const Icon = enlace.icon;
          return (
            <Link
              key={enlace.href}
              href={enlace.href}
              onClick={onClose}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl ${enlace.bg} ${enlace.color} text-sm font-medium hover:shadow-md transition-shadow`}
            >
              <Icon className="w-4 h-4" />
              {enlace.name}
            </Link>
          );
        })}
      </div>

      {/* Información de contacto */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
        <a href="tel:912345678" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
          <Phone className="w-3.5 h-3.5" />
          912 345 678
        </a>
        <a href="mailto:info@uniclima.es" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
          <Mail className="w-3.5 h-3.5" />
          info@uniclima.es
        </a>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          L-V: 9:00-18:00
        </span>
      </div>
    </motion.div>
  );

  // ============================================
  // RENDER PRINCIPAL
  // ============================================
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel del menú */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-full max-w-2xl bg-gray-50 z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="font-bold text-gray-900">Uniclima</span>
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-100 px-4 flex-shrink-0">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab("tienda")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "tienda"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Tienda
                  {activeTab === "tienda" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("servicios")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "servicios"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Servicios
                  {activeTab === "servicios" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Buscador */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos, marcas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto mega-menu-scroll">
              <AnimatePresence mode="wait">
                {activeTab === "servicios" ? renderServicios() : renderTienda()}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
