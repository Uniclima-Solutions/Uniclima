'use client'

/**
 * MobileMenu Component - Mega Menú Rediseñado
 * - Diseño moderno con mejor UX
 * - Vínculos coherentes con las páginas existentes
 * - Animaciones suaves y transiciones fluidas
 * - Estructura clara y navegación intuitiva
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { 
  X, ChevronRight, ChevronLeft, Phone, Mail,
  Flame, Snowflake, Package, Wrench, Search,
  Fan, CircuitBoard, Droplets, Wind, Settings,
  LayoutGrid, PhoneCall, ChevronDown, Shield,
  FileText, Tag, Truck, Clock, Star, Heart,
  ShoppingBag, Home, Building2, MapPin, Sparkles
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuView = 
  | "main" 
  | "repuestos"
  | "repuestos-calderas" 
  | "repuestos-aire" 
  | "tienda"
  | "tienda-calderas"
  | "tienda-aires"
  | "servicios"
  | "marca-caldera"
  | "marca-aire";

// Estructura del menú principal
const menuPrincipal = [
  { 
    id: "repuestos",
    name: "Repuestos",
    description: "Piezas para calderas y aire acondicionado",
    icon: Wrench,
    color: "from-orange-500 to-orange-600",
    view: "repuestos" as MenuView
  },
  { 
    id: "tienda",
    name: "Equipos Nuevos",
    description: "Calderas y aires acondicionados",
    icon: ShoppingBag,
    color: "from-blue-500 to-blue-600",
    view: "tienda" as MenuView
  },
  { 
    id: "servicios",
    name: "Servicios",
    description: "Mantenimiento, reparación e instalación",
    icon: Settings,
    color: "from-green-500 to-green-600",
    view: "servicios" as MenuView
  },
];

// Submenú de Repuestos
const repuestosMenu = [
  {
    id: "calderas",
    name: "Repuestos de Calderas",
    description: "Más de 3,000 referencias",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    href: "/c/calderas",
    view: "repuestos-calderas" as MenuView
  },
  {
    id: "aire",
    name: "Repuestos de Aire Acondicionado",
    description: "Más de 1,700 referencias",
    icon: Snowflake,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    href: "/c/aire-acondicionado",
    view: "repuestos-aire" as MenuView
  },
];

// Submenú de Tienda (Equipos Nuevos)
const tiendaMenu = [
  {
    id: "calderas",
    name: "Calderas",
    description: "Nuevas y reacondicionadas",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    href: "/tienda/calderas",
    view: "tienda-calderas" as MenuView
  },
  {
    id: "aires",
    name: "Aires Acondicionados",
    description: "Splits, multisplits y más",
    icon: Fan,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    href: "/tienda/aire-acondicionado",
    view: "tienda-aires" as MenuView
  },
];

// Categorías de repuestos de calderas
const categoriasRepuestosCalderas = [
  { name: "Placas Electrónicas", slug: "placas", icon: CircuitBoard, count: 245 },
  { name: "Intercambiadores", slug: "intercambiadores", icon: Droplets, count: 189 },
  { name: "Bombas de Circulación", slug: "bombas", icon: Droplets, count: 156 },
  { name: "Válvulas de Gas", slug: "valvulas-gas", icon: Settings, count: 312 },
  { name: "Válvulas 3 Vías", slug: "valvulas-3-vias", icon: Settings, count: 234 },
  { name: "Sensores y Sondas", slug: "sensores", icon: Wind, count: 276 },
  { name: "Ventiladores", slug: "ventiladores", icon: Fan, count: 145 },
  { name: "Quemadores", slug: "quemadores", icon: Flame, count: 98 },
];

// Categorías de repuestos de aire
const categoriasRepuestosAire = [
  { name: "Placas Interior", slug: "placas-interior", icon: CircuitBoard, count: 312 },
  { name: "Placas Exterior", slug: "placas-exterior", icon: CircuitBoard, count: 234 },
  { name: "Turbinas", slug: "turbinas", icon: Fan, count: 187 },
  { name: "Motores", slug: "motores", icon: Settings, count: 156 },
  { name: "Motor Hélice", slug: "motor-helice", icon: Fan, count: 276 },
  { name: "Mandos", slug: "mandos", icon: Settings, count: 167 },
  { name: "Compresores", slug: "compresores", icon: Settings, count: 89 },
  { name: "Filtros", slug: "filtros", icon: Wind, count: 234 },
];

// Marcas de calderas
const marcasCalderas = [
  { name: "Vaillant", slug: "vaillant", count: 287 },
  { name: "Junkers", slug: "junkers", count: 312 },
  { name: "Baxi", slug: "baxi", count: 176 },
  { name: "Ferroli", slug: "ferroli", count: 198 },
  { name: "Ariston", slug: "ariston", count: 154 },
  { name: "Viessmann", slug: "viessmann", count: 89 },
  { name: "Beretta", slug: "beretta", count: 132 },
  { name: "Chaffoteaux", slug: "chaffoteaux", count: 87 },
  { name: "Cointra", slug: "cointra", count: 95 },
  { name: "Bosch", slug: "bosch", count: 156 },
  { name: "Wolf", slug: "wolf", count: 54 },
  { name: "Saunier Duval", slug: "saunier-duval", count: 265 },
];

// Marcas de aire acondicionado
const marcasAire = [
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 198 },
  { name: "Daikin", slug: "daikin", count: 234 },
  { name: "Fujitsu", slug: "fujitsu", count: 167 },
  { name: "LG", slug: "lg", count: 145 },
  { name: "Samsung", slug: "samsung", count: 132 },
  { name: "Panasonic", slug: "panasonic", count: 118 },
  { name: "Toshiba", slug: "toshiba", count: 98 },
  { name: "Hisense", slug: "hisense", count: 65 },
  { name: "Haier", slug: "haier", count: 54 },
  { name: "Carrier", slug: "carrier", count: 76 },
  { name: "Midea", slug: "midea", count: 48 },
  { name: "Gree", slug: "gree", count: 56 },
];

// Servicios
const serviciosItems = [
  { 
    name: "Contratos de Mantenimiento", 
    description: "Desde 70€/año",
    icon: FileText,
    href: "/contrato-mantenimiento",
    highlight: true
  },
  { 
    name: "Diagnóstico de Placas", 
    description: "Reparación de placas electrónicas",
    icon: CircuitBoard,
    href: "/diagnostico-placas"
  },
  { 
    name: "Zona Profesionales", 
    description: "Precios especiales para instaladores",
    icon: Shield,
    href: "/profesionales"
  },
];

// Enlaces rápidos
const enlacesRapidos = [
  { name: "Ofertas", icon: Tag, href: "/ofertas", color: "text-red-500" },
  { name: "Marcas", icon: Star, href: "/marcas", color: "text-yellow-500" },
  { name: "Favoritos", icon: Heart, href: "/favoritos", color: "text-pink-500" },
  { name: "Seguimiento", icon: Truck, href: "/seguimiento", color: "text-green-500" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [currentView, setCurrentView] = useState<MenuView>("main");
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentView("main");
        setSearchQuery("");
      }, 300);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (currentView === "repuestos-calderas" || currentView === "repuestos-aire") {
      setCurrentView("repuestos");
    } else if (currentView === "tienda-calderas" || currentView === "tienda-aires") {
      setCurrentView("tienda");
    } else if (currentView === "repuestos" || currentView === "tienda" || currentView === "servicios") {
      setCurrentView("main");
    } else {
      setCurrentView("main");
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 80 && info.velocity.x > 0.3) {
      if (currentView !== "main") {
        handleBack();
      } else {
        onClose();
      }
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "repuestos": return "Repuestos";
      case "repuestos-calderas": return "Repuestos Calderas";
      case "repuestos-aire": return "Repuestos Aire";
      case "tienda": return "Equipos Nuevos";
      case "tienda-calderas": return "Calderas";
      case "tienda-aires": return "Aires Acondicionados";
      case "servicios": return "Servicios";
      default: return "Menú";
    }
  };

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
    exit: { x: "-100%", transition: { type: "spring", damping: 30, stiffness: 300 } }
  };

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  };

  // Render menú principal
  const renderMain = () => (
    <motion.div
      key="main"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-4"
    >
      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos, marcas..."
          className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
        />
      </div>

      {/* Categorías principales */}
      <div className="space-y-3 mb-6">
        {menuPrincipal.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.view)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </button>
          );
        })}
      </div>

      {/* Enlaces rápidos */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {enlacesRapidos.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group"
            >
              <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
              <span className="text-[10px] font-medium text-gray-600 group-hover:text-orange-600">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Banner de Mantenimiento */}
      <Link
        href="/contrato-mantenimiento"
        onClick={onClose}
        className="block p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white mb-6 hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Contratos de Mantenimiento</p>
            <p className="text-xs text-orange-100">Desde 70€/año • Calderas y Aires</p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
      </Link>

      {/* Contacto */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contacto</p>
        <div className="space-y-2">
          <a href="tel:+34912345678" className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors">
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">912 345 678</span>
          </a>
          <a href="mailto:info@uniclima.es" className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors">
            <Mail className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">info@uniclima.es</span>
          </a>
          <div className="flex items-center gap-3 p-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Lun-Vie: 9:00 - 18:00</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Render submenú de Repuestos
  const renderRepuestos = () => (
    <motion.div
      key="repuestos"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-4"
    >
      {/* Opciones principales */}
      <div className="space-y-3 mb-6">
        {repuestosMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center gap-4 p-4 ${item.bgColor} rounded-2xl hover:shadow-md transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
          );
        })}
      </div>

      {/* Ver todas las marcas */}
      <Link
        href="/marcas"
        onClick={onClose}
        className="flex items-center justify-between p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-gray-900">Ver todas las marcas</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </Link>
    </motion.div>
  );

  // Render repuestos de calderas
  const renderRepuestosCalderas = () => (
    <motion.div
      key="repuestos-calderas"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-4"
    >
      {/* Ver todo */}
      <Link
        href="/c/calderas"
        onClick={onClose}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl mb-4 hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-5 h-5" />
          <span className="font-bold">Ver todos los repuestos</span>
        </div>
        <ChevronRight className="w-5 h-5" />
      </Link>

      {/* Categorías */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Por categoría</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {categoriasRepuestosCalderas.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/c/calderas/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group"
            >
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate group-hover:text-orange-600">{cat.name}</p>
                <p className="text-[10px] text-gray-400">{cat.count} productos</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Marcas */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Por marca</p>
      <div className="grid grid-cols-3 gap-2">
        {marcasCalderas.slice(0, 12).map((marca) => (
          <Link
            key={marca.slug}
            href={`/marca/${marca.slug}`}
            onClick={onClose}
            className="p-3 bg-gray-50 rounded-xl hover:bg-orange-50 text-center transition-colors group"
          >
            <p className="text-xs font-medium text-gray-700 truncate group-hover:text-orange-600">{marca.name}</p>
            <p className="text-[10px] text-gray-400">{marca.count}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );

  // Render repuestos de aire
  const renderRepuestosAire = () => (
    <motion.div
      key="repuestos-aire"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-4"
    >
      {/* Ver todo */}
      <Link
        href="/c/aire-acondicionado"
        onClick={onClose}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl mb-4 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-5 h-5" />
          <span className="font-bold">Ver todos los repuestos</span>
        </div>
        <ChevronRight className="w-5 h-5" />
      </Link>

      {/* Categorías */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Por categoría</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {categoriasRepuestosAire.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/c/aire-acondicionado/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate group-hover:text-blue-600">{cat.name}</p>
                <p className="text-[10px] text-gray-400">{cat.count} productos</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Marcas */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Por marca</p>
      <div className="grid grid-cols-3 gap-2">
        {marcasAire.slice(0, 12).map((marca) => (
          <Link
            key={marca.slug}
            href={`/marca/${marca.slug}`}
            onClick={onClose}
            className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 text-center transition-colors group"
          >
            <p className="text-xs font-medium text-gray-700 truncate group-hover:text-blue-600">{marca.name}</p>
            <p className="text-[10px] text-gray-400">{marca.count}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );

  // Render submenú de Tienda
  const renderTienda = () => (
    <motion.div
      key="tienda"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-4"
    >
      {/* Ver todo */}
      <Link
        href="/tienda"
        onClick={onClose}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl mb-4 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5" />
          <span className="font-bold">Ver toda la tienda</span>
        </div>
        <ChevronRight className="w-5 h-5" />
      </Link>

      {/* Opciones principales */}
      <div className="space-y-3">
        {tiendaMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 p-4 ${item.bgColor} rounded-2xl hover:shadow-md transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );

  // Render submenú de Servicios
  const renderServicios = () => (
    <motion.div
      key="servicios"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-4"
    >
      <div className="space-y-3">
        {serviciosItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                item.highlight 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.highlight ? 'bg-white/20' : 'bg-white shadow-sm'
              }`}>
                <Icon className={`w-6 h-6 ${item.highlight ? 'text-white' : 'text-orange-500'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-bold ${item.highlight ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                <p className={`text-xs ${item.highlight ? 'text-orange-100' : 'text-gray-500'}`}>{item.description}</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${item.highlight ? 'text-white' : 'text-gray-400'} group-hover:translate-x-1 transition-transform`} />
            </Link>
          );
        })}
      </div>

      {/* Contacto directo */}
      <div className="mt-6 p-4 bg-gray-100 rounded-2xl">
        <p className="text-sm font-semibold text-gray-900 mb-3">¿Necesitas ayuda?</p>
        <a 
          href="tel:+34912345678" 
          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-orange-50 transition-colors"
        >
          <Phone className="w-5 h-5 text-orange-500" />
          <div>
            <p className="font-bold text-gray-900">912 345 678</p>
            <p className="text-xs text-gray-500">Lun-Vie: 9:00 - 18:00</p>
          </div>
        </a>
      </div>
    </motion.div>
  );

  // Render contenido según la vista actual
  const renderContent = () => {
    switch (currentView) {
      case "repuestos":
        return renderRepuestos();
      case "repuestos-calderas":
        return renderRepuestosCalderas();
      case "repuestos-aire":
        return renderRepuestosAire();
      case "tienda":
        return renderTienda();
      case "servicios":
        return renderServicios();
      default:
        return renderMain();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel del menú */}
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header del menú */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              {currentView !== "main" ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Volver</span>
                </button>
              ) : (
                <Link href="/" onClick={onClose} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                  <span className="font-bold text-gray-900">Uniclima</span>
                </Link>
              )}
              
              <div className="flex items-center gap-2">
                {currentView !== "main" && (
                  <span className="text-sm font-semibold text-gray-900">{getViewTitle()}</span>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>

            {/* Footer del menú */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <Link href="/aviso-legal" onClick={onClose} className="hover:text-orange-500">Aviso Legal</Link>
                <span>•</span>
                <Link href="/privacidad" onClick={onClose} className="hover:text-orange-500">Privacidad</Link>
                <span>•</span>
                <Link href="/cookies" onClick={onClose} className="hover:text-orange-500">Cookies</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
