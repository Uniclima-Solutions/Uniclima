'use client'

/**
 * MobileMenu Component - Mega Menú Optimizado
 * - SIN framer-motion para mejor rendimiento
 * - Animaciones CSS puras
 * - Diseño moderno con mejor UX
 */

import { useState, useRef, useEffect } from "react";
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
  | "servicios";

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

// Categorías de repuestos de calderas
const categoriasRepuestosCalderas = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", icon: CircuitBoard, count: 245 },
  { name: "Intercambiadores", slug: "intercambiadores-placas", icon: Droplets, count: 189 },
  { name: "Bombas de Circulación", slug: "bombas-circulacion", icon: Droplets, count: 156 },
  { name: "Válvulas de Gas", slug: "valvulas-gas", icon: Settings, count: 312 },
  { name: "Válvulas 3 Vías", slug: "valvulas-3-vias", icon: Settings, count: 234 },
  { name: "Sensores y Sondas", slug: "sensores", icon: Wind, count: 276 },
];

// Categorías de repuestos de aire
const categoriasRepuestosAire = [
  { name: "Placas Interior", slug: "placas-interior", icon: CircuitBoard, count: 312 },
  { name: "Placas Exterior", slug: "placas-compresor", icon: CircuitBoard, count: 234 },
  { name: "Turbinas", slug: "turbinas", icon: Fan, count: 187 },
  { name: "Motores", slug: "motor-turbinas", icon: Settings, count: 156 },
  { name: "Motor Hélice", slug: "motor-helice-compresor", icon: Fan, count: 276 },
  { name: "Mandos", slug: "mandos-distancia", icon: Settings, count: 167 },
];

// Marcas de calderas
const marcasCalderas = [
  { name: "Vaillant", slug: "vaillant", count: 287 },
  { name: "Junkers", slug: "junkers", count: 312 },
  { name: "Baxi", slug: "baxi", count: 176 },
  { name: "Ferroli", slug: "ferroli", count: 198 },
  { name: "Ariston", slug: "ariston", count: 154 },
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
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll
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
        setCurrentView("main");
        setSearchQuery("");
      }, 300);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (currentView === "repuestos-calderas" || currentView === "repuestos-aire") {
      setCurrentView("repuestos");
    } else {
      setCurrentView("main");
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "repuestos": return "Repuestos";
      case "repuestos-calderas": return "Repuestos Calderas";
      case "repuestos-aire": return "Repuestos Aire";
      case "tienda": return "Equipos Nuevos";
      case "servicios": return "Servicios";
      default: return "Menú";
    }
  };

  // Render menú principal
  const renderMain = () => (
    <div className="p-4 animate-fadeIn">
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
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Enlaces rápidos */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {enlacesRapidos.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-xs text-gray-600">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Banner Mantenimiento */}
      <Link
        href="/contrato-mantenimiento"
        onClick={onClose}
        className="block p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Contratos de Mantenimiento</h3>
            <p className="text-sm text-white/80">Desde 70€/año • Ahorra en averías</p>
          </div>
        </div>
      </Link>

      {/* Contacto */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">¿Necesitas ayuda?</h4>
        <div className="space-y-2">
          <a href="tel:+34900123456" className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500">
            <Phone className="w-4 h-4" />
            <span>900 123 456</span>
          </a>
          <a href="mailto:info@uniclima.es" className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500">
            <Mail className="w-4 h-4" />
            <span>info@uniclima.es</span>
          </a>
          <p className="flex items-center gap-3 text-xs text-gray-400">
            <Clock className="w-4 h-4" />
            <span>L-V: 9:00-18:00</span>
          </p>
        </div>
      </div>
    </div>
  );

  // Render submenú de repuestos
  const renderRepuestos = () => (
    <div className="p-4 animate-slideIn">
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
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>

      <Link
        href="/marcas"
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full p-3 text-orange-600 font-medium hover:bg-orange-50 rounded-xl transition-colors"
      >
        <Star className="w-4 h-4" />
        Ver todas las marcas
      </Link>
    </div>
  );

  // Render categorías de calderas
  const renderCalderasCategories = () => (
    <div className="p-4 animate-slideIn">
      <Link
        href="/c/calderas"
        onClick={onClose}
        className="flex items-center justify-between p-3 mb-4 bg-orange-50 rounded-xl text-orange-600 font-medium"
      >
        <span>Ver todos los repuestos</span>
        <ChevronRight className="w-4 h-4" />
      </Link>

      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categorías</h4>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {categoriasRepuestosCalderas.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/c/calderas/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all"
            >
              <Icon className="w-4 h-4 text-orange-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.count} refs</p>
              </div>
            </Link>
          );
        })}
      </div>

      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Marcas populares</h4>
      <div className="grid grid-cols-2 gap-2">
        {marcasCalderas.map((marca) => (
          <Link
            key={marca.slug}
            href={`/marca/${marca.slug}`}
            onClick={onClose}
            className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all"
          >
            <span className="text-sm font-medium text-gray-900">{marca.name}</span>
            <span className="text-xs text-gray-400">{marca.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  // Render categorías de aire
  const renderAireCategories = () => (
    <div className="p-4 animate-slideIn">
      <Link
        href="/c/aire-acondicionado"
        onClick={onClose}
        className="flex items-center justify-between p-3 mb-4 bg-blue-50 rounded-xl text-blue-600 font-medium"
      >
        <span>Ver todos los repuestos</span>
        <ChevronRight className="w-4 h-4" />
      </Link>

      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categorías</h4>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {categoriasRepuestosAire.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/c/aire-acondicionado/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all"
            >
              <Icon className="w-4 h-4 text-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.count} refs</p>
              </div>
            </Link>
          );
        })}
      </div>

      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Marcas populares</h4>
      <div className="grid grid-cols-2 gap-2">
        {marcasAire.map((marca) => (
          <Link
            key={marca.slug}
            href={`/marca/${marca.slug}`}
            onClick={onClose}
            className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all"
          >
            <span className="text-sm font-medium text-gray-900">{marca.name}</span>
            <span className="text-xs text-gray-400">{marca.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  // Render tienda
  const renderTienda = () => (
    <div className="p-4 animate-slideIn">
      <div className="space-y-3">
        <Link
          href="/tienda/calderas"
          onClick={onClose}
          className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Calderas</h3>
            <p className="text-xs text-gray-500">Nuevas y reacondicionadas</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <Link
          href="/tienda/aire-acondicionado"
          onClick={onClose}
          className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <Fan className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Aires Acondicionados</h3>
            <p className="text-xs text-gray-500">Splits, multisplits y más</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>
      </div>
    </div>
  );

  // Render servicios
  const renderServicios = () => (
    <div className="p-4 animate-slideIn">
      <div className="space-y-3">
        {serviciosItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                item.highlight 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                  : 'bg-white border border-gray-100 hover:border-orange-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.highlight ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                <Icon className={`w-6 h-6 ${item.highlight ? 'text-white' : 'text-orange-500'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${item.highlight ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                <p className={`text-xs ${item.highlight ? 'text-white/80' : 'text-gray-500'}`}>{item.description}</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${item.highlight ? 'text-white/60' : 'text-gray-400'}`} />
            </Link>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case "repuestos": return renderRepuestos();
      case "repuestos-calderas": return renderCalderasCategories();
      case "repuestos-aire": return renderAireCategories();
      case "tienda": return renderTienda();
      case "servicios": return renderServicios();
      default: return renderMain();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Panel del menú */}
      <div
        ref={menuRef}
        className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 flex flex-col shadow-2xl animate-slideInLeft"
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
          {renderContent()}
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
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
