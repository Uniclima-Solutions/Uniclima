'use client';

/**
 * PÁGINA PREMIUM: Repuestos de Calderas
 * Diseño UI/UX cuidado con experiencia de usuario optimizada
 * Incluye enlace a contratos de mantenimiento
 * 
 * SEO Optimizado:
 * - Title: "Repuestos de Calderas | +3.000 Referencias Originales | Uniclima"
 * - H1: "Repuestos de Calderas: Originales y Compatibles para Todas las Marcas"
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
  Flame,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  CheckCircle,
  Wrench,
  Sparkles,
  Package,
  BadgeCheck
} from "lucide-react";
import Image from "next/image";
import { CALDERAS_BRANDS } from "@/lib/brands";
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema, UNICLIMA_ORGANIZATION } from "@/components/JsonLd";

// Categorías de Repuestos de Calderas
const repuestosCalderas = [
  { id: 1, name: "Placas", fullName: "Placas Electrónicas", slug: "placas-electronicas", image: "/images/categorias/PlacasElectronicas.webp", count: 245, popular: true },
  { id: 2, name: "Intercambiadores", fullName: "Intercambiadores de Placas", slug: "intercambiadores-placas", image: "/images/categorias/IntercambiadorDePlacas.webp", count: 189, popular: true },
  { id: 3, name: "Bombas", fullName: "Bombas de Circulación", slug: "bombas-circulacion", image: "/images/categorias/Bombas.webp", count: 156, popular: true },
  { id: 4, name: "Válvulas Gas", fullName: "Válvulas de Gas", slug: "valvulas-gas", image: "/images/categorias/ValvulaGasCondensacion.webp", count: 312, popular: true },
  { id: 5, name: "Extractores", fullName: "Extractores", slug: "extractores", image: "/images/categorias/Extractores.webp", count: 178, popular: false },
  { id: 6, name: "Bitérmicos", fullName: "Intercambiadores Bitérmicos", slug: "intercambiadores-bitermicos", image: "/images/categorias/IntercambiadorBitermico.webp", count: 98, popular: false },
  { id: 7, name: "Combustión", fullName: "Cámaras de Combustión", slug: "camaras-combustion", image: "/images/categorias/CamarasDeCombustion.webp", count: 67, popular: false },
  { id: 8, name: "Válvulas 3 Vías", fullName: "Válvulas de 3 Vías", slug: "valvulas-3-vias", image: "/images/categorias/Valvulas3Vias.webp", count: 234, popular: true },
  { id: 9, name: "Hidráulicos", fullName: "Cuerpos Hidráulicos", slug: "cuerpos-hidraulicos", image: "/images/categorias/Hidraulicos.webp", count: 145, popular: false },
  { id: 10, name: "Modulantes", fullName: "Extractores Modulantes", slug: "extractores-modulantes", image: "/images/categorias/ExtractoresModulantes.webp", count: 89, popular: false },
  { id: 11, name: "Vasos Expansión", fullName: "Vasos de Expansión", slug: "vasos-expansion", image: "/images/categorias/VasoExpansion.webp", count: 167, popular: false },
  { id: 12, name: "V. Seguridad", fullName: "Válvulas de Seguridad", slug: "valvulas-seguridad", image: "/images/categorias/ValvulasSeguridad.webp", count: 198, popular: false },
  { id: 13, name: "Sensores", fullName: "Sensores", slug: "sensores", image: "/images/categorias/Sensores.webp", count: 276, popular: true },
  { id: 14, name: "Flujostatos", fullName: "Flujostatos", slug: "flujostatos", image: "/images/categorias/Flujostato.webp", count: 123, popular: false },
  { id: 15, name: "Presostatos", fullName: "Presostatos", slug: "presostatos", image: "/images/categorias/Presostatos.webp", count: 187, popular: false },
  { id: 16, name: "Captadores", fullName: "Captadores de Presión", slug: "captadores-presion", image: "/images/categorias/CaptadorPresion.webp", count: 156, popular: false },
  { id: 17, name: "Transformadores", fullName: "Transformadores", slug: "transformadores", image: "/images/categorias/Transformadores.webp", count: 134, popular: false },
  { id: 18, name: "V. Llenado", fullName: "Válvulas de Llenado", slug: "valvulas-llenado", image: "/images/categorias/ValvulaLLenado.webp", count: 112, popular: false },
  { id: 19, name: "Microacumuladores", fullName: "Microacumuladores", slug: "microacumuladores", image: "/images/categorias/Microacumuladores.webp", count: 78, popular: false }
];

// Marcas disponibles - usando constantes centralizadas
const marcas = CALDERAS_BRANDS;

// Formas de onda para las tarjetas
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
];

// Componente de tarjeta de categoría con animaciones mejoradas
function CategoryCard({ category, index }: { category: typeof repuestosCalderas[0]; index: number }) {
  const waveIndex = index % waveShapes.length;
  const wavePath = waveShapes[waveIndex];
  
  return (
    <Link href={`/c/calderas/${category.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out relative aspect-square border border-gray-100/80 hover:border-orange-200 transform hover:-translate-y-1">
        {/* Badge popular con animación */}
        {category.popular && (
          <div className="absolute top-2.5 right-2.5 z-30 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
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
              <linearGradient id={`gradient-cal-${category.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffab66" />
                <stop offset="50%" stopColor="#ff6900" />
                <stop offset="100%" stopColor="#cc5500" />
              </linearGradient>
            </defs>
            <path d={wavePath} fill={`url(#gradient-cal-${category.slug})`} className="transition-all duration-500" />
          </svg>
        </div>
        
        {/* Imagen con animación suave - optimizada para LCP */}
        <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
          <Image
            src={category.image}
            alt={category.fullName}
            width={200}
            height={200}
            priority={index < 6}
            className="w-full h-full object-contain drop-shadow-xl max-w-[85%] max-h-[75%] transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-2xl"
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
      <p className="text-[11px] text-gray-500 text-center mt-2 font-medium transition-colors duration-300 group-hover:text-orange-600">
        {category.count} productos
      </p>
    </Link>
  );
}

// Componente de tarjeta de marca con logo a color y animaciones mejoradas
function BrandCard({ marca }: { marca: typeof marcas[0] }) {
  return (
    <Link 
      href={`/c/calderas?marca=${marca.slug}`}
      className="group bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-400 ease-out flex items-center justify-center aspect-[4/3] transform hover:-translate-y-0.5"
    >
      <div className="w-full h-full relative flex items-center justify-center">
        <Image
          src={marca.logo}
          alt={marca.name}
          fill
          className="object-contain transition-all duration-400 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 30vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
        />
      </div>
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
          <div className="text-orange-200 text-sm font-medium">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function RepuestosCalderas() {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const totalProductos = repuestosCalderas.reduce((acc, cat) => acc + cat.count, 0);
  const categoriasPopulares = repuestosCalderas.filter(c => c.popular);
  const categoriasAMostrar = mostrarTodas ? repuestosCalderas : categoriasPopulares;

  // Schemas para SEO
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Inicio", url: "https://uniclima.es" },
    { name: "Repuestos de Calderas" }
  ]);

  const collectionSchema = createCollectionPageSchema(
    "Repuestos de Calderas",
    `Más de ${totalProductos.toLocaleString()} repuestos originales y compatibles para calderas de todas las marcas. Envío 24-48h y garantía 1 año.`,
    "https://uniclima.es/c/calderas",
    repuestosCalderas.map(cat => ({
      name: cat.fullName,
      url: `https://uniclima.es/c/calderas/${cat.slug}`
    }))
  );

  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <JsonLd data={[UNICLIMA_ORGANIZATION, breadcrumbSchema, collectionSchema]} />
      
      <Header />
      <main className="pt-20 lg:pt-28 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Hero Section con diseño mejorado */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
            {/* Breadcrumbs con animación */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4 animate-pulse" />
              <span className="text-white font-semibold">Repuestos Calderas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                    Repuestos de Calderas
                  </h1>
                </div>
                <p className="text-orange-100 text-lg lg:text-xl leading-relaxed">
                  Más de <span className="text-white font-bold">{totalProductos.toLocaleString()}</span> referencias de repuestos para calderas 
                  <span className="text-white font-semibold"> Junkers, Vaillant, Baxi, Ferroli</span> y más marcas.
                </p>
              </div>
              
              {/* Buscador mejorado */}
              <div className="w-full lg:w-[420px]">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'transform scale-105' : ''}`}>
                  <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${searchFocused ? 'text-orange-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Buscar por referencia, marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300/50 shadow-2xl transition-all duration-300 text-base"
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
                { icon: Truck, text: "Envío gratis +120€", color: "text-orange-500" },
                { icon: Clock, text: "Entrega 24-48h", color: "text-orange-500" },
                { icon: Shield, text: "Garantía 1 año", color: "text-orange-500" },
                { icon: CheckCircle, text: "Repuestos verificados", color: "text-orange-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-gray-600 hover:text-gray-900 transition-colors duration-300 group cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
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
                  {mostrarTodas ? "Categorías de Repuestos de Calderas" : "Repuestos de Calderas Más Buscados"}
                </h2>
                <p className="text-gray-500 mt-2">
                  {mostrarTodas ? `${repuestosCalderas.length} tipos de componentes disponibles` : `${categoriasPopulares.length} categorías con mayor demanda`}
                </p>
              </div>
              <button
                onClick={() => setMostrarTodas(!mostrarTodas)}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all duration-300"
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">¿Prefieres que lo hagamos nosotros?</h3>
                  <p className="text-gray-400 text-base">
                    Contrata nuestro servicio de mantenimiento y olvídate de problemas. <span className="text-orange-400 font-semibold">Desde 90€/año.</span>
                  </p>
                </div>
              </div>
              <Link 
                href="/contrato-mantenimiento"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 relative z-10"
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
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Repuestos de Calderas por Marca</h2>
              <p className="text-gray-500 text-lg">Componentes originales y compatibles para las principales marcas</p>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5">
              {marcas.map((marca) => (
                <BrandCard key={marca.slug} marca={marca} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Ayuda con diseño mejorado */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-8 lg:p-10 border border-orange-100">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="text-gray-600 text-lg max-w-xl">
                    Nuestro equipo técnico te ayudará a encontrar el repuesto exacto para tu caldera.
                    Envíanos la referencia o una foto del componente.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:+34912345678"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                  <a 
                    href="mailto:info@uniclima.es"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-600 font-bold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    Enviar consulta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEO Content con diseño mejorado */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Guía de Compra: Repuestos de Calderas
            </h2>
            
            <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
              <p>
                En Uniclima Solutions somos especialistas en <strong>repuestos de calderas</strong> para todas las marcas 
                y modelos del mercado. Disponemos de un amplio catálogo de componentes originales y compatibles, 
                desde placas electrónicas hasta válvulas de gas, intercambiadores y bombas de circulación.
              </p>
              
              <h3>Catálogo de Repuestos para Calderas</h3>
              <p>
                Nuestro catálogo incluye más de {totalProductos.toLocaleString()} referencias de repuestos para calderas:
              </p>
              <ul>
                <li><strong>Placas electrónicas:</strong> El cerebro de tu caldera. Disponemos de placas para Junkers, Vaillant, Saunier Duval y más.</li>
                <li><strong>Intercambiadores:</strong> Tanto de placas como bitérmicos, esenciales para la transferencia de calor.</li>
                <li><strong>Válvulas de gas:</strong> Componentes de seguridad críticos para el correcto funcionamiento.</li>
                <li><strong>Bombas de circulación:</strong> Para mantener el flujo de agua en el circuito de calefacción.</li>
                <li><strong>Sensores y termostatos:</strong> Para el control preciso de la temperatura.</li>
              </ul>
              
              <h3>Marcas de Calderas Disponibles</h3>
              <p>
                Trabajamos con las principales marcas del sector: Junkers/Bosch, Vaillant, Saunier Duval, Baxi, 
                Ferroli, Ariston, Roca, Cointra, Chaffoteaux, Beretta, Immergas y Hermann.
              </p>
              
              <h3>Envío 24-48h y Garantía de 1 Año</h3>
              <p>
                Todos nuestros repuestos incluyen <strong>1 año de garantía</strong> y envío en 24-48 horas. 
                Para pedidos superiores a 120€, el envío es gratuito en toda la península.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
