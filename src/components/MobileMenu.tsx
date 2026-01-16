'use client'

/**
 * MobileMenu Component - Menú móvil estilo PCComponentes
 * - Equipos Nuevos separados: Calderas Nuevas / Aires Nuevos
 * - Marcas con productos reales (solo muestran lo que fabrican)
 * - Acordeones exclusivos (solo uno abierto a la vez)
 * - Contacto al final del menú
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  X, ChevronRight, ChevronLeft, ChevronsLeft, Phone, Mail,
  Flame, Snowflake, Package, Wrench, Search, Zap, Thermometer,
  Fan, Gauge, CircuitBoard, Droplets, Wind, Settings, Cpu,
  Radio, Filter, Disc, BatteryCharging, Waves, RefreshCw,
  LayoutGrid, MessageCircleQuestion, PhoneCall, ChevronDown
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuView = 
  | "main" 
  | "repuestos-calderas" 
  | "repuestos-aire" 
  | "calderas-nuevas"
  | "aires-nuevos"
  | "calderas-reacondicionadas"
  | "servicios"
  | "faq"
  | "contacto"
  | "marca-caldera"
  | "marca-aire"
  | "marca-caldera-nueva"
  | "marca-aire-nuevo";

// Menú principal con desplegables
const categoriasConDesplegable = [
  { 
    id: "repuestos", 
    name: "Repuestos", 
    icon: Wrench, 
    hasDropdown: true,
    subItems: [
      { id: "repuestos-calderas", name: "Calderas", icon: Flame, view: "repuestos-calderas" as MenuView },
      { id: "repuestos-aire", name: "Aire Acondicionado", icon: Snowflake, view: "repuestos-aire" as MenuView },
    ]
  },
  { 
    id: "calderas", 
    name: "Calderas", 
    icon: Package, 
    hasDropdown: true,
    subItems: [
      { id: "calderas-nuevas", name: "Nuevas", icon: Package, view: "calderas-nuevas" as MenuView },
      { id: "calderas-reacondicionadas", name: "Reacondicionadas", icon: RefreshCw, view: "calderas-reacondicionadas" as MenuView },
    ]
  },
  { id: "aires-nuevos", name: "Aires Acondicionados", icon: Fan, view: "aires-nuevos" as MenuView, hasDropdown: false },
  { id: "servicios", name: "Servicios", icon: Wrench, view: "servicios" as MenuView, hasDropdown: false },
  { id: "faq", name: "Preguntas Frecuentes", icon: MessageCircleQuestion, view: "faq" as MenuView, hasDropdown: false },
  { id: "contacto", name: "Contacto", icon: PhoneCall, view: "contacto" as MenuView, hasDropdown: false },
];

// Marcas de calderas para REPUESTOS
const marcasRepuestosCalderas = [
  { name: "Junkers / Bosch", count: 312 },
  { name: "Vaillant", count: 287 },
  { name: "Saunier Duval", count: 265 },
  { name: "Ferroli", count: 198 },
  { name: "Baxi / BaxiRoca", count: 176 },
  { name: "Ariston", count: 154 },
  { name: "Beretta", count: 132 },
  { name: "Roca", count: 118 },
  { name: "Cointra", count: 95 },
  { name: "Chaffoteaux", count: 87 },
  { name: "Hermann", count: 76 },
  { name: "Manaut", count: 68 },
  { name: "Viessmann", count: 89 },
  { name: "Wolf", count: 54 },
  { name: "Buderus", count: 62 },
  { name: "Immergas", count: 48 },
  { name: "Biasi", count: 42 },
  { name: "Lamborghini", count: 38 },
  { name: "Fondital", count: 35 },
  { name: "De Dietrich", count: 45 },
];

// Marcas de aire para REPUESTOS
const marcasRepuestosAire = [
  { name: "Daikin", count: 234 },
  { name: "Mitsubishi Electric", count: 198 },
  { name: "Fujitsu", count: 167 },
  { name: "LG", count: 145 },
  { name: "Samsung", count: 132 },
  { name: "Panasonic", count: 118 },
  { name: "Toshiba", count: 98 },
  { name: "Hitachi", count: 87 },
  { name: "Carrier", count: 76 },
  { name: "Hisense", count: 65 },
  { name: "Haier", count: 54 },
  { name: "Midea", count: 48 },
  { name: "Gree", count: 56 },
  { name: "Mitsubishi Heavy", count: 78 },
];

// Marcas de CALDERAS NUEVAS con productos que fabrican
const marcasCalderasNuevas = [
  { name: "Junkers / Bosch", productos: ["condensacion", "calentadores"] },
  { name: "Vaillant", productos: ["condensacion", "calentadores", "aerotermia"] },
  { name: "Saunier Duval", productos: ["condensacion", "calentadores", "aerotermia"] },
  { name: "Ferroli", productos: ["condensacion", "calentadores", "biomasa"] },
  { name: "Baxi", productos: ["condensacion", "calentadores"] },
  { name: "Ariston", productos: ["condensacion", "termos", "calentadores"] },
  { name: "Viessmann", productos: ["condensacion", "aerotermia", "biomasa"] },
  { name: "Wolf", productos: ["condensacion"] },
  { name: "Buderus", productos: ["condensacion", "biomasa"] },
  { name: "Cointra", productos: ["condensacion", "termos", "calentadores"] },
  { name: "Thermor", productos: ["termos", "calentadores"] },
  { name: "Fleck", productos: ["termos"] },
  { name: "Domusa", productos: ["condensacion", "biomasa"] },
  { name: "Chaffoteaux", productos: ["condensacion"] },
];

// Marcas de AIRES NUEVOS con productos que fabrican
const marcasAiresNuevos = [
  { name: "Daikin", productos: ["split", "multisplit", "conductos", "cassette"] },
  { name: "Mitsubishi Electric", productos: ["split", "multisplit", "conductos", "cassette"] },
  { name: "Fujitsu", productos: ["split", "multisplit", "conductos"] },
  { name: "LG", productos: ["split", "multisplit", "conductos"] },
  { name: "Samsung", productos: ["split", "multisplit"] },
  { name: "Panasonic", productos: ["split", "multisplit", "conductos"] },
  { name: "Toshiba", productos: ["split", "multisplit", "conductos"] },
  { name: "Hitachi", productos: ["split", "multisplit", "conductos"] },
  { name: "Carrier", productos: ["split", "multisplit", "conductos"] },
  { name: "Hisense", productos: ["split", "multisplit"] },
  { name: "Haier", productos: ["split", "multisplit"] },
  { name: "Gree", productos: ["split", "multisplit"] },
  { name: "Midea", productos: ["split"] },
];

// Categorías de calderas nuevas con opciones (kW, litros)
const categoriasCalderasNuevas: Record<string, { name: string; icon: any; options: string[] }> = {
  condensacion: { 
    name: "Calderas de condensación", 
    icon: Flame,
    options: ["24 kW", "28 kW", "30 kW", "35 kW"]
  },
  calentadores: { 
    name: "Calentadores", 
    icon: Droplets,
    options: ["6 L/min", "11 L/min", "14 L/min", "18 L/min"]
  },
  termos: { 
    name: "Termos eléctricos", 
    icon: Thermometer,
    options: ["30 L", "50 L", "80 L", "100 L", "150 L"]
  },
  aerotermia: { 
    name: "Aerotermia", 
    icon: Wind,
    options: ["Monobloc 6 kW", "Monobloc 8 kW", "Bibloc 8 kW", "Bibloc 12 kW", "Híbrida"]
  },
  biomasa: { 
    name: "Calderas de biomasa", 
    icon: Flame,
    options: ["Pellets 15 kW", "Pellets 25 kW", "Leña 20 kW", "Leña 30 kW"]
  },
};

// Categorías de aires nuevos con opciones (frigorías)
const categoriasAiresNuevos: Record<string, { name: string; icon: any; options: string[] }> = {
  split: { 
    name: "Split 1x1", 
    icon: Fan,
    options: ["2.000 fg (2,3 kW)", "2.500 fg (2,9 kW)", "3.000 fg (3,5 kW)", "3.500 fg (4,0 kW)", "4.500 fg (5,2 kW)", "6.000 fg (7,0 kW)"]
  },
  multisplit: { 
    name: "Multisplit", 
    icon: Waves,
    options: ["2x1 4.500 fg", "2x1 5.200 fg", "3x1 6.800 fg", "3x1 8.000 fg", "4x1 9.500 fg", "5x1 12.000 fg"]
  },
  conductos: { 
    name: "Conductos", 
    icon: Filter,
    options: ["3.000 fg", "4.500 fg", "6.000 fg", "8.000 fg", "10.000 fg", "12.000 fg"]
  },
  cassette: { 
    name: "Cassette", 
    icon: Settings,
    options: ["3.500 fg", "5.000 fg", "6.000 fg", "8.000 fg"]
  },
};

// Categorías de repuestos de calderas
const categoriasRepuestosCalderas = [
  { name: "Válvulas de gas", count: 45, icon: Gauge },
  { name: "Intercambiadores", count: 32, icon: Waves },
  { name: "Placas electrónicas", count: 28, icon: CircuitBoard },
  { name: "Bombas de circulación", count: 18, icon: Droplets },
  { name: "Quemadores", count: 15, icon: Flame },
  { name: "Electrodos de encendido", count: 12, icon: Zap },
  { name: "Ventiladores / Extractores", count: 14, icon: Fan },
  { name: "Presostatos", count: 8, icon: Gauge },
  { name: "Termostatos", count: 10, icon: Thermometer },
  { name: "Sondas y sensores", count: 16, icon: Radio },
  { name: "Vasos de expansión", count: 6, icon: Disc },
  { name: "Válvulas de 3 vías", count: 9, icon: Settings },
  { name: "Juntas y retenes", count: 22, icon: Disc },
  { name: "Cuerpos de agua", count: 8, icon: Droplets },
  { name: "Kits de mantenimiento", count: 14, icon: Wrench },
  { name: "Transformadores", count: 6, icon: BatteryCharging },
];

// Categorías de repuestos de aire
const categoriasRepuestosAire = [
  { name: "Compresores", count: 24, icon: Cpu },
  { name: "Placas electrónicas", count: 18, icon: CircuitBoard },
  { name: "Motores ventilador", count: 22, icon: Fan },
  { name: "Condensadores", count: 12, icon: Disc },
  { name: "Sensores y sondas", count: 16, icon: Radio },
  { name: "Mandos a distancia", count: 8, icon: Radio },
  { name: "Turbinas", count: 10, icon: Wind },
  { name: "Válvulas de expansión", count: 6, icon: Gauge },
  { name: "Filtros", count: 14, icon: Filter },
  { name: "Rejillas y difusores", count: 12, icon: Wind },
  { name: "Bombas de drenaje", count: 8, icon: Droplets },
  { name: "Kits de instalación", count: 18, icon: Wrench },
];

// Calderas reacondicionadas (sin marcas)
const calderasReacondicionadas = [
  { name: "Calderas de condensación", options: ["24 kW", "28 kW", "30 kW", "35 kW"] },
  { name: "Calderas murales", options: ["24 kW", "28 kW"] },
  { name: "Termos eléctricos", options: ["50 L", "80 L", "100 L"] },
];

// Servicios
const serviciosItems = [
  { name: "Reparación de placas electrónicas", desc: "Reparamos placas de calderas y aire" },
  { name: "Mantenimiento de calderas", desc: "Revisión anual y puesta a punto" },
  { name: "Mantenimiento de aire acondicionado", desc: "Limpieza y recarga de gas" },
  { name: "Instalación de equipos", desc: "Instalación profesional certificada" },
  { name: "Asistencia técnica", desc: "Servicio técnico especializado" },
];

// FAQ
const faqItems = [
  { q: "¿Cuánto tarda el envío?", a: "Envío en 24-48 horas para pedidos antes de las 14:00" },
  { q: "¿Cómo puedo devolver un producto?", a: "Tienes 30 días para devoluciones sin coste" },
  { q: "¿Los repuestos son originales?", a: "Trabajamos con piezas originales y compatibles de alta calidad" },
  { q: "¿Ofrecen garantía?", a: "Todos nuestros productos tienen garantía de 1 año" },
  { q: "¿Cómo encuentro mi repuesto?", a: "Busca por referencia, marca o modelo en nuestro buscador" },
];

// Productos para búsqueda predictiva
const productosEjemplo = [
  { id: 1, name: "Válvula de Gas Honeywell VK4105M", ref: "VK4105M5033", marca: "Junkers", precio: 89.90, imagen: "/images/hero-calderas.png" },
  { id: 2, name: "Intercambiador de Placas 14P", ref: "87161066850", marca: "Vaillant", precio: 145.50, imagen: "/images/category-intercambiadores.png" },
  { id: 3, name: "Placa Electrónica Thema Condens", ref: "S5742000", marca: "Saunier Duval", precio: 178.00, imagen: "/images/category-placas.png" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [currentView, setCurrentView] = useState<MenuView>("main");
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [selectedMarcaProductos, setSelectedMarcaProductos] = useState<string[]>([]);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll de la página
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentView("main");
        setSelectedMarca("");
        setSelectedMarcaProductos([]);
        setExpandedAccordion(null);
        setSearchQuery("");
      }, 300);
    }
  }, [isOpen]);

  const filteredProducts = searchQuery.length >= 2 
    ? productosEjemplo.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.marca.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleBack = () => {
    if (currentView === "marca-caldera") {
      setCurrentView("repuestos-calderas");
    } else if (currentView === "marca-aire") {
      setCurrentView("repuestos-aire");
    } else if (currentView === "marca-caldera-nueva") {
      setCurrentView("calderas-nuevas");
    } else if (currentView === "marca-aire-nuevo") {
      setCurrentView("aires-nuevos");
    } else {
      setCurrentView("main");
    }
    setSelectedMarca("");
    setSelectedMarcaProductos([]);
    setExpandedAccordion(null);
  };

  const handleClose = () => {
    onClose();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 80 && info.velocity.x > 0.3) {
      if (currentView !== "main") {
        handleBack();
      } else {
        handleClose();
      }
    }
  };

  const toggleAccordion = (key: string) => {
    setExpandedAccordion(expandedAccordion === key ? null : key);
  };

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
    exit: { x: "-100%", transition: { type: "spring" as const, damping: 30, stiffness: 300 } }
  };

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  };

  // Render menú principal con desplegables
  const renderMain = () => (
    <motion.div
      key="main"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      {/* Enlace a Inicio */}
      <a
        href="/"
        onClick={handleClose}
        className="flex items-center gap-2 px-3 py-2.5 mb-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Inicio</span>
      </a>
      
      <a
        href="/catalogo"
        className="flex items-center gap-2 px-3 py-2.5 mb-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Ver catálogo</span>
        <ChevronRight className="w-4 h-4 ml-auto" />
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Categorías</p>
      
      <div className="space-y-0.5">
        {categoriasConDesplegable.map((cat) => {
          const Icon = cat.icon;
          
          // Si tiene desplegable
          if (cat.hasDropdown && cat.subItems) {
            const isExpanded = expandedAccordion === cat.id;
            return (
              <div key={cat.id}>
                <button
                  onClick={() => toggleAccordion(cat.id)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors group"
                >
                  <div className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-800 text-[13px]">{cat.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden ml-4 pl-5 border-l-2 border-gray-200"
                    >
                      {cat.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => setCurrentView(subItem.view)}
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors group"
                          >
                            <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                              <SubIcon className="w-3 h-3 text-gray-500 group-hover:text-orange-600" />
                            </div>
                            <span className="font-medium text-gray-700 text-[12px]">{subItem.name}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          
          // Sin desplegable
          return (
            <button
              key={cat.id}
              onClick={() => setCurrentView(cat.view as MenuView)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors group"
            >
              <div className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-600" />
              </div>
              <span className="font-medium text-gray-800 text-[13px]">{cat.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  // Render repuestos calderas
  const renderRepuestosCalderas = () => (
    <motion.div
      key="repuestos-calderas"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">Repuestos Calderas</h2>
      <a href="/repuestos-calderas" className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todo →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Marcas</p>
      <div className="space-y-0.5 mb-4">
        {marcasRepuestosCalderas.map((marca) => (
          <button
            key={marca.name}
            onClick={() => {
              setSelectedMarca(marca.name);
              setCurrentView("marca-caldera");
            }}
            className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-800 text-[13px]">{marca.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-xs">{marca.count}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Render repuestos aire
  const renderRepuestosAire = () => (
    <motion.div
      key="repuestos-aire"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">Repuestos Aire Acondicionado</h2>
      <a href="/repuestos-aire" className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todo →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Marcas</p>
      <div className="space-y-0.5 mb-4">
        {marcasRepuestosAire.map((marca) => (
          <button
            key={marca.name}
            onClick={() => {
              setSelectedMarca(marca.name);
              setCurrentView("marca-aire");
            }}
            className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-800 text-[13px]">{marca.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-xs">{marca.count}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Render marca caldera (repuestos)
  const renderMarcaCaldera = () => (
    <motion.div
      key="marca-caldera"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">{selectedMarca}</h2>
      <a href={`/repuestos-calderas/${selectedMarca.toLowerCase().replace(/ /g, '-')}`} className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todos los repuestos →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Categorías</p>
      <div className="space-y-0.5">
        {categoriasRepuestosCalderas.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-800 text-[13px]">{cat.name}</span>
              </div>
              <span className="text-gray-400 text-xs">{cat.count}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  // Render marca aire (repuestos)
  const renderMarcaAire = () => (
    <motion.div
      key="marca-aire"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">{selectedMarca}</h2>
      <a href={`/repuestos-aire/${selectedMarca.toLowerCase().replace(/ /g, '-')}`} className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todos los repuestos →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Categorías</p>
      <div className="space-y-0.5">
        {categoriasRepuestosAire.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-800 text-[13px]">{cat.name}</span>
              </div>
              <span className="text-gray-400 text-xs">{cat.count}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  // Render calderas nuevas
  const renderCalderasNuevas = () => (
    <motion.div
      key="calderas-nuevas"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">Calderas Nuevas</h2>
      <a href="/calderas-nuevas" className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todas →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Marcas</p>
      <div className="space-y-0.5">
        {marcasCalderasNuevas.map((marca) => (
          <button
            key={marca.name}
            onClick={() => {
              setSelectedMarca(marca.name);
              setSelectedMarcaProductos(marca.productos);
              setCurrentView("marca-caldera-nueva");
              setExpandedAccordion(null);
            }}
            className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-800 text-[13px]">{marca.name}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Render aires nuevos
  const renderAiresNuevos = () => (
    <motion.div
      key="aires-nuevos"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">Aires Acondicionados Nuevos</h2>
      <a href="/aires-nuevos" className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todos →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Marcas</p>
      <div className="space-y-0.5">
        {marcasAiresNuevos.map((marca) => (
          <button
            key={marca.name}
            onClick={() => {
              setSelectedMarca(marca.name);
              setSelectedMarcaProductos(marca.productos);
              setCurrentView("marca-aire-nuevo");
              setExpandedAccordion(null);
            }}
            className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-800 text-[13px]">{marca.name}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Render marca caldera nueva (con acordeón de categorías)
  const renderMarcaCalderaNueva = () => (
    <motion.div
      key="marca-caldera-nueva"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">{selectedMarca}</h2>
      <a href={`/calderas-nuevas/${selectedMarca.toLowerCase().replace(/ /g, '-')}`} className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todos los productos →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Categorías</p>
      <div className="space-y-1.5">
        {selectedMarcaProductos.map((productoKey) => {
          const categoria = categoriasCalderasNuevas[productoKey];
          if (!categoria) return null;
          const Icon = categoria.icon;
          const isExpanded = expandedAccordion === productoKey;
          
          return (
            <div key={productoKey} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(productoKey)}
                className="w-full flex items-center justify-between p-2.5 bg-orange-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-800 text-[13px]">{categoria.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 bg-white border-t border-slate-100">
                      {categoria.options.map((option) => (
                        <button
                          key={option}
                          className="w-full text-left text-[13px] text-gray-600 hover:text-orange-600 py-1.5 px-2 hover:bg-orange-50 rounded transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render marca aire nuevo (con acordeón de categorías)
  const renderMarcaAireNuevo = () => (
    <motion.div
      key="marca-aire-nuevo"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">{selectedMarca}</h2>
      <a href={`/aires-nuevos/${selectedMarca.toLowerCase().replace(/ /g, '-')}`} className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todos los productos →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Categorías</p>
      <div className="space-y-1.5">
        {selectedMarcaProductos.map((productoKey) => {
          const categoria = categoriasAiresNuevos[productoKey];
          if (!categoria) return null;
          const Icon = categoria.icon;
          const isExpanded = expandedAccordion === productoKey;
          
          return (
            <div key={productoKey} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(productoKey)}
                className="w-full flex items-center justify-between p-2.5 bg-orange-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-800 text-[13px]">{categoria.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 bg-white border-t border-slate-100">
                      {categoria.options.map((option) => (
                        <button
                          key={option}
                          className="w-full text-left text-[13px] text-gray-600 hover:text-orange-600 py-1.5 px-2 hover:bg-orange-50 rounded transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render calderas reacondicionadas
  const renderCalderasReacondicionadas = () => (
    <motion.div
      key="calderas-reacondicionadas"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-0.5">Calderas Reacondicionadas</h2>
      <a href="/calderas-reacondicionadas" className="text-orange-600 font-medium text-xs mb-3 inline-block hover:underline">
        Ver todas →
      </a>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Categorías</p>
      <div className="space-y-1.5">
        {calderasReacondicionadas.map((cat) => {
          const isExpanded = expandedAccordion === cat.name;
          return (
            <div key={cat.name} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(cat.name)}
                className="w-full flex items-center justify-between p-2.5 bg-orange-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-800 text-[13px]">{cat.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 bg-white border-t border-slate-100">
                      {cat.options.map((option) => (
                        <button
                          key={option}
                          className="w-full text-left text-[13px] text-gray-600 hover:text-orange-600 py-1.5 px-2 hover:bg-orange-50 rounded transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render servicios
  const renderServicios = () => (
    <motion.div
      key="servicios"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-3">Servicios</h2>

      <div className="space-y-2">
        {serviciosItems.map((servicio) => (
          <button
            key={servicio.name}
            className="w-full text-left p-3 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <span className="font-medium text-gray-800 text-[13px] block">{servicio.name}</span>
            <span className="text-xs text-gray-500">{servicio.desc}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Render FAQ
  const renderFAQ = () => (
    <motion.div
      key="faq"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-3">Preguntas Frecuentes</h2>

      <div className="space-y-1.5">
        {faqItems.map((faq, index) => {
          const isExpanded = expandedAccordion === `faq-${index}`;
          return (
            <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(`faq-${index}`)}
                className="w-full flex items-center justify-between p-2.5 bg-orange-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-medium text-gray-800 text-[13px] pr-2">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2.5 bg-white border-t border-slate-100">
                      <p className="text-[13px] text-gray-600">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render contacto
  const renderContacto = () => (
    <motion.div
      key="contacto"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="p-3"
    >
      <h2 className="text-base font-bold text-gray-900 mb-3">Contacto</h2>

      <div className="space-y-3">
        <div className="p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="text-base font-bold text-gray-800">91 117 77 77</span>
          </div>
          <p className="text-xs text-gray-600">Lunes a Viernes: 9:00 - 20:00</p>
          <p className="text-xs text-gray-600">Sábados: 10:00 - 14:00</p>
        </div>

        <div className="p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-orange-500" />
            <span className="text-[13px] font-medium text-gray-800">info@repuestosclima.es</span>
          </div>
          <p className="text-xs text-gray-600">Respuesta en menos de 24h</p>
        </div>

        <button className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-colors">
          Enviar mensaje
        </button>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (currentView) {
      case "main": return renderMain();
      case "repuestos-calderas": return renderRepuestosCalderas();
      case "repuestos-aire": return renderRepuestosAire();
      case "marca-caldera": return renderMarcaCaldera();
      case "marca-aire": return renderMarcaAire();
      case "calderas-nuevas": return renderCalderasNuevas();
      case "aires-nuevos": return renderAiresNuevos();
      case "marca-caldera-nueva": return renderMarcaCalderaNueva();
      case "marca-aire-nuevo": return renderMarcaAireNuevo();
      case "calderas-reacondicionadas": return renderCalderasReacondicionadas();
      case "servicios": return renderServicios();
      case "faq": return renderFAQ();
      case "contacto": return renderContacto();
      default: return renderMain();
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
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed left-0 top-0 h-full w-[85%] max-w-[340px] bg-white z-50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Premium */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              {currentView !== "main" ? (
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-white font-medium text-sm hover:bg-white/10 px-2 py-1 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Volver</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-orange-500 font-black text-lg">U</span>
                  </div>
                  <span className="font-bold text-lg">Uniclima</span>
                </div>
              )}
              
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="px-3 py-2 border-b border-slate-200 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-gray-100 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                />
              </div>
              
              {filteredProducts.length > 0 && (
                <div className="mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <a
                      key={product.id}
                      href="#"
                      className="flex items-center gap-2 p-2 hover:bg-orange-50 border-b border-slate-100 last:border-0"
                    >
                      <img 
                        src={product.imagen} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-xs truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.marca}</p>
                        <p className="text-xs font-bold text-orange-600">{product.precio.toFixed(2)}€</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Content con gestos */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y"
            >
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </motion.div>

            {/* Footer con contacto */}
            <div className="p-3 border-t border-slate-200 bg-orange-50 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-medium">91 117 77 77</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span>info@repuestosclima.es</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
