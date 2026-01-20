'use client';

/**
 * PÁGINA PREMIUM: Repuestos de Aire Acondicionado
 * Diseño UI/UX cuidado con experiencia de usuario optimizada
 * Incluye enlace a contratos de mantenimiento
 * 
 * SEO Optimizado:
 * - Title: "Repuestos Aire Acondicionado | Splits y Climatización | Uniclima"
 * - H1: "Repuestos de Aire Acondicionado: Splits, Multisplits y Climatización"
 * - Intención: Transaccional + Comercial
 * 
 * UI/UX Mejorado:
 * - Animaciones suaves y microinteracciones
 * - Bordes redondeados consistentes
 * - Transiciones fluidas
 * - Efectos hover refinados
 */

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Search, 
  Snowflake,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  CheckCircle,
  Thermometer,
  Sparkles,
  Package,
  BadgeCheck,
  Wind
} from "lucide-react";
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema, UNICLIMA_ORGANIZATION } from "@/components/JsonLd";

// Categorías de Repuestos de Aire Acondicionado
const repuestosAire = [
  { id: 1, name: "Placas Interior", fullName: "Placas Electrónicas Interior", slug: "placas-interior", image: "/images/categorias/PlacasInterior.png", count: 312, popular: true },
  { id: 2, name: "Placas Exterior", fullName: "Placas Electrónicas Exterior", slug: "placas-compresor", image: "/images/categorias/PlacasCompresor.png", count: 234, popular: true },
  { id: 3, name: "Turbinas", fullName: "Turbinas de Ventilación", slug: "turbinas", image: "/images/categorias/Turbinas.png", count: 187, popular: true },
  { id: 4, name: "Motores", fullName: "Motores de Turbina", slug: "motor-turbinas", image: "/images/categorias/MotorTurbinas.png", count: 156, popular: true },
  { id: 5, name: "Hélices", fullName: "Hélices de Compresor", slug: "helice-compresor", image: "/images/categorias/HeliceCompresor.png", count: 198, popular: false },
  { id: 6, name: "Motor Hélice", fullName: "Motor de Hélice Compresor", slug: "motor-helice-compresor", image: "/images/categorias/MotorHeliceCompresor.png", count: 276, popular: true },
  { id: 7, name: "B. Conductos", fullName: "Bomba Condensados Conductos", slug: "bomba-condensado-conductos", image: "/images/categorias/BombaCondensadoConductos.png", count: 145, popular: false },
  { id: 8, name: "B. Cassette", fullName: "Bomba Condensados Cassette", slug: "bomba-condensados-cassette", image: "/images/categorias/BombaCondensadosCassette.png", count: 89, popular: false },
  { id: 9, name: "Mandos", fullName: "Mandos a Distancia", slug: "mandos-distancia", image: "/images/categorias/MandosDistanciaSplit.png", count: 167, popular: true }
];

// Marcas de aire acondicionado con logos
const marcas = [
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 523, logo: "/images/marcas/mitsubishi.png" },
  { name: "Daikin", slug: "daikin", count: 467, logo: "/images/marcas/daikin.png" },
  { name: "Fujitsu", slug: "fujitsu", count: 389, logo: "/images/marcas/fujitsu.png" },
  { name: "LG", slug: "lg", count: 345, logo: "/images/marcas/lg.png" },
  { name: "Samsung", slug: "samsung", count: 312, logo: "/images/marcas/samsung.png" },
  { name: "Panasonic", slug: "panasonic", count: 278, logo: "/images/marcas/panasonic.png" },
  { name: "Toshiba", slug: "toshiba", count: 234, logo: "/images/marcas/toshiba.png" },
  { name: "Hisense", slug: "hisense", count: 198, logo: "/images/marcas/hisense.png" },
  { name: "Haier", slug: "haier", count: 167, logo: "/images/marcas/haier.png" },
  { name: "Carrier", slug: "carrier", count: 145, logo: "/images/marcas/carrier.png" },
  { name: "Midea", slug: "midea", count: 123, logo: "/images/marcas/midea.png" },
  { name: "Gree", slug: "gree", count: 98, logo: "/images/marcas/gree.png" }
];

// Formas de onda para las tarjetas (azul)
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
];

// Componente de tarjeta de categoría con animaciones mejoradas
function CategoryCard({ category, index }: { category: typeof repuestosAire[0]; index: number }) {
  const waveIndex = index % waveShapes.length;
  const wavePath = waveShapes[waveIndex];
  
  return (
    <Link href={`/c/aire-acondicionado/${category.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out relative aspect-square border border-gray-100/80 hover:border-blue-200 transform hover:-translate-y-1">
        {/* Badge popular con animación */}
        {category.popular && (
          <div className="absolute top-2.5 right-2.5 z-30 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          </div>
        )}
        
        {/* Banner con forma de onda */}
        <div className="absolute bottom-0 left-0 right-0 h-[42%]">
          <svg 
            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105" 
            viewBox="0 0 400 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-aire-${category.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path d={wavePath} fill={`url(#gradient-aire-${category.slug})`} className="transition-all duration-500" />
          </svg>
        </div>
        
        {/* Imagen con animación suave */}
        <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
          <img
            src={category.image}
            alt={category.fullName}
            className="w-full h-full object-contain drop-shadow-xl max-w-[85%] max-h-[75%] transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-2xl"
            loading="lazy"
          />
        </div>
        
        {/* Texto con mejor tipografía */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-3.5 px-2">
          <h3 className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center drop-shadow-lg uppercase tracking-wider">
            {category.name}
          </h3>
        </div>
      </div>
      {/* Contador con animación */}
      <p className="text-[11px] text-gray-500 text-center mt-2 font-medium transition-colors duration-300 group-hover:text-blue-600">
        {category.count} productos
      </p>
    </Link>
  );
}

// Componente de tarjeta de marca con animaciones mejoradas
function BrandCard({ marca }: { marca: typeof marcas[0] }) {
  return (
    <Link 
      href={`/c/aire-acondicionado?marca=${marca.slug}`}
      className="group bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-400 ease-out flex items-center justify-center aspect-[4/3] transform hover:-translate-y-0.5"
    >
      <img 
        src={marca.logo} 
        alt={marca.name}
        className="w-full h-full object-contain transition-all duration-400 ease-out group-hover:scale-110"
        loading="lazy"
      />
    </Link>
  );
}

// Componente de stat card con animación
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon?: any }) {
  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <div className="text-2xl font-black text-white">{value}</div>
          <div className="text-blue-200 text-sm font-medium">{label}</div>
        </div>
      </div>
    </div>
  );
}

// Componente de tipo de equipo
function EquipmentTypeCard({ href, icon: Icon, title, subtitle }: { href: string; icon: any; title: string; subtitle: string }) {
  return (
    <Link href={href} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-400 transform hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-400">
        <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-400" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1 text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </Link>
  );
}

export default function RepuestosAireAcondicionado() {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const totalProductos = repuestosAire.reduce((acc, cat) => acc + cat.count, 0);
  const categoriasPopulares = repuestosAire.filter(c => c.popular);
  const categoriasAMostrar = mostrarTodas ? repuestosAire : categoriasPopulares;

  // Schemas para SEO
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Inicio", url: "https://uniclima.es" },
    { name: "Repuestos de Aire Acondicionado" }
  ]);

  const collectionSchema = createCollectionPageSchema(
    "Repuestos de Aire Acondicionado",
    `Más de ${totalProductos.toLocaleString()} repuestos originales y compatibles para splits, multisplits y sistemas de climatización. Envío 24-48h.`,
    "https://uniclima.es/c/aire-acondicionado",
    repuestosAire.map(cat => ({
      name: cat.fullName,
      url: `https://uniclima.es/c/aire-acondicionado/${cat.slug}`
    }))
  );

  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <JsonLd data={[UNICLIMA_ORGANIZATION, breadcrumbSchema, collectionSchema]} />
      
      <Header />
      <main className="pt-20 lg:pt-28 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Hero Section con diseño mejorado */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
            {/* Breadcrumbs con animación */}
            <nav className="flex items-center gap-2 text-blue-100 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4 animate-pulse" />
              <span className="text-white font-semibold">Repuestos Aire Acondicionado</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Snowflake className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                    Repuestos de Aire Acondicionado
                  </h1>
                </div>
                <p className="text-blue-100 text-lg lg:text-xl leading-relaxed">
                  Más de <span className="text-white font-bold">{totalProductos.toLocaleString()}</span> referencias de repuestos para 
                  <span className="text-white font-semibold"> Daikin, Mitsubishi, Fujitsu, LG</span> y más marcas.
                </p>
              </div>
              
              {/* Buscador mejorado */}
              <div className="w-full lg:w-[420px]">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'transform scale-105' : ''}`}>
                  <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${searchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Buscar por referencia, marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300/50 shadow-2xl transition-all duration-300 text-base"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats con iconos y animaciones */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              <StatCard value={totalProductos.toLocaleString()} label="Productos" icon={Package} />
              <StatCard value={marcas.length.toString()} label="Marcas" icon={BadgeCheck} />
              <StatCard value="24-48h" label="Entrega" icon={Truck} />
              <StatCard value="1 año" label="Garantía" icon={Shield} />
            </div>
          </div>
        </section>
        
        {/* Beneficios con diseño mejorado */}
        <section className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              {[
                { icon: Truck, text: "Envío gratis +120€", color: "text-blue-500" },
                { icon: Clock, text: "Entrega 24-48h", color: "text-blue-500" },
                { icon: Shield, text: "Garantía 1 año", color: "text-blue-500" },
                { icon: CheckCircle, text: "Repuestos verificados", color: "text-blue-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-gray-600 hover:text-gray-900 transition-colors duration-300 group cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Categorías con diseño mejorado */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {mostrarTodas ? "Categorías de Repuestos de Aire Acondicionado" : "Repuestos de Aire Acondicionado Más Buscados"}
                </h2>
                <p className="text-gray-500 mt-2">
                  {mostrarTodas ? `${repuestosAire.length} tipos de componentes disponibles` : `${categoriasPopulares.length} categorías con mayor demanda`}
                </p>
              </div>
              <button
                onClick={() => setMostrarTodas(!mostrarTodas)}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                {mostrarTodas ? "Ver menos" : "Ver todas"}
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${mostrarTodas ? "rotate-90" : ""}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5">
              {categoriasAMostrar.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Banner Mantenimiento con diseño premium */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Thermometer className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">¿Prefieres que lo hagamos nosotros?</h3>
                  <p className="text-gray-400 text-base">
                    Contrata nuestro servicio de mantenimiento y olvídate de problemas. <span className="text-blue-400 font-semibold">Desde 70€/año.</span>
                  </p>
                </div>
              </div>
              <Link 
                href="/contrato-mantenimiento"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 relative z-10"
              >
                Contratar mantenimiento
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Marcas con diseño mejorado */}
        <section className="py-14 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Repuestos de Aire Acondicionado por Marca</h2>
              <p className="text-gray-500 text-lg">Componentes originales y compatibles para las principales marcas</p>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-5">
              {marcas.map((marca) => (
                <BrandCard key={marca.slug} marca={marca} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Tipos de equipos con diseño mejorado */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">Repuestos según Tipo de Aire Acondicionado</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <EquipmentTypeCard 
                href="/c/aire-acondicionado?tipo=split" 
                icon={Snowflake} 
                title="Split" 
                subtitle="Unidades de pared" 
              />
              <EquipmentTypeCard 
                href="/c/aire-acondicionado?tipo=multisplit" 
                icon={Snowflake} 
                title="Multisplit" 
                subtitle="Sistemas multi-unidad" 
              />
              <EquipmentTypeCard 
                href="/c/aire-acondicionado?tipo=conductos" 
                icon={Wind} 
                title="Conductos" 
                subtitle="Sistemas canalizados" 
              />
              <EquipmentTypeCard 
                href="/c/aire-acondicionado?tipo=cassette" 
                icon={Snowflake} 
                title="Cassette" 
                subtitle="Unidades de techo" 
              />
            </div>
          </div>
        </section>
        
        {/* Ayuda con diseño mejorado */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-8 lg:p-10 border border-blue-100">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="text-gray-600 text-lg max-w-xl">
                    Nuestro equipo técnico te ayudará a encontrar el repuesto exacto para tu aire acondicionado.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:+34912345678"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                  <a 
                    href="mailto:info@uniclima.es"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 hover:border-blue-400 text-gray-700 hover:text-blue-600 font-bold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    Enviar consulta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEO Content con diseño mejorado */}
        <section className="py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Guía de Compra: Repuestos de Aire Acondicionado
            </h2>
            
            <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
              <p>
                En Uniclima Solutions somos especialistas en <strong>repuestos de aire acondicionado</strong> para todas las marcas 
                y tipos de equipos. Disponemos de componentes originales y compatibles para splits, multisplits, 
                sistemas de conductos y cassettes.
              </p>
              
              <h3>Catálogo de Repuestos para Aire Acondicionado</h3>
              <ul>
                <li><strong>Placas electrónicas:</strong> Tanto de unidad interior como exterior para todas las marcas.</li>
                <li><strong>Turbinas y motores:</strong> Componentes de ventilación para un flujo de aire óptimo.</li>
                <li><strong>Hélices y motores de compresor:</strong> Para la unidad exterior.</li>
                <li><strong>Bombas de condensados:</strong> Para conductos y cassettes.</li>
                <li><strong>Mandos a distancia:</strong> Originales y universales compatibles.</li>
              </ul>
              
              <h3>Mantenimiento de Aire Acondicionado</h3>
              <p>
                Además de repuestos, ofrecemos <Link href="/contrato-mantenimiento" className="text-blue-600 hover:underline font-semibold">contratos de mantenimiento</Link> para 
                mantener tu aire acondicionado en perfecto estado todo el año.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
