'use client'

/**
 * MegaMenu Component - Diseño Premium Profesional
 * 
 * Características:
 * - 2 pestañas principales: Servicios y Tienda
 * - Iconografía profesional con Lucide React
 * - Miniaturas de marcas en lugar de nombres
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
  Home, Building2, CheckCircle2, Award
} from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "servicios" | "tienda";

// ============================================
// DATOS DEL MENÚ
// ============================================

// Servicios de reparación
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
    features: ["Instalación", "Reparación", "Mantenimiento"]
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
    features: ["Instalación", "Mantenimiento", "Monitorización"]
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
    features: ["Reparación", "Instalación", "Mantenimiento"]
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
    features: ["Reparación", "Instalación", "Mantenimiento"]
  }
];

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
      {/* Grid de servicios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {servicios.map((servicio) => {
          const Icon = servicio.icon;
          return (
            <Link
              key={servicio.id}
              href={servicio.href}
              onClick={onClose}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              {/* Fondo con gradiente al hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${servicio.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icono */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${servicio.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Contenido */}
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                {servicio.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {servicio.description}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1.5">
                {servicio.features.map((feature) => (
                  <span
                    key={feature}
                    className={`text-xs px-2 py-0.5 rounded-full ${servicio.bgLight} ${servicio.textColor} font-medium`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* Flecha */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-orange-500">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Banner de garantía */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white">Técnicos Certificados</h4>
            <p className="text-sm text-gray-400">1 año de garantía en todas las reparaciones</p>
          </div>
        </div>
        <Link
          href="/contacto"
          onClick={onClose}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Columnas de categorías */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(categoriasRepuestos).map(([key, categoria]) => {
            const Icon = categoria.icon;
            return (
              <div key={key} className="bg-white rounded-2xl border border-gray-100 p-4">
                {/* Header de categoría */}
                <Link
                  href={categoria.href}
                  onClick={onClose}
                  className="flex items-center gap-3 mb-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors`}>
                    <Icon className={`w-5 h-5 ${categoria.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {categoria.name}
                  </h3>
                </Link>
                
                {/* Lista de subcategorías */}
                <ul className="space-y-1">
                  {categoria.items.map((item) => {
                    const ItemIcon = item.icon;
                    const href = item.isLink 
                      ? categoria.href 
                      : `${categoria.href}/${item.slug}`;
                    return (
                      <li key={item.slug || 'all'}>
                        <Link
                          href={href}
                          onClick={onClose}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                            item.isLink 
                              ? 'text-orange-600 font-semibold hover:bg-orange-50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <ItemIcon className={`w-4 h-4 ${item.isLink ? 'text-orange-500' : 'text-gray-400'}`} />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Columna de marcas */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Marcas</h3>
            <Link
              href="/marcas"
              onClick={onClose}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium"
            >
              Ver todas →
            </Link>
          </div>
          
          {/* Grid de logos de marcas */}
          <div className="grid grid-cols-4 gap-2">
            {marcas.slice(0, 16).map((marca) => (
              <Link
                key={marca.slug}
                href={`/marca/${marca.slug}`}
                onClick={onClose}
                className="group relative aspect-square bg-white rounded-xl border border-gray-200 p-2 hover:border-orange-300 hover:shadow-md transition-all overflow-hidden"
                title={marca.name}
              >
                <div className="w-full h-full relative grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={marca.logo}
                    alt={marca.name}
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {enlacesRapidos.map((enlace) => {
          const Icon = enlace.icon;
          return (
            <Link
              key={enlace.name}
              href={enlace.href}
              onClick={onClose}
              className={`flex items-center gap-2 px-4 py-2 ${enlace.bg} rounded-full hover:shadow-md transition-all`}
            >
              <Icon className={`w-4 h-4 ${enlace.color}`} />
              <span className="text-sm font-medium text-gray-700">{enlace.name}</span>
            </Link>
          );
        })}
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Menú */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header del menú */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 md:px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo y título */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">U</span>
                  </div>
                  <span className="text-xl font-bold text-white">Uniclima</span>
                </div>

                {/* Pestañas */}
                <div className="flex items-center gap-1 bg-gray-800/50 rounded-xl p-1">
                  <button
                    onClick={() => setActiveTab("tienda")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === "tienda"
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Tienda
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("servicios")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === "servicios"
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Servicios
                    </span>
                  </button>
                </div>

                {/* Buscador */}
                <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar productos, marcas..."
                      className="w-full h-10 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Botón cerrar */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido del menú */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "servicios" ? renderServicios() : renderTienda()}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer del menú */}
            <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-3">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Contacto */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <a href="tel:+34912345678" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>912 345 678</span>
                  </a>
                  <a href="mailto:info@uniclima.es" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>info@uniclima.es</span>
                  </a>
                  <span className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>L-V: 9:00-18:00</span>
                  </span>
                </div>

                {/* Beneficios */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-green-500" />
                    Envío gratis +120€
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Garantía 2 años
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    Pago seguro
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
