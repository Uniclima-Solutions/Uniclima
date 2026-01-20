"use client";

/**
 * PÁGINA PREMIUM: Repuestos de Calderas
 * Diseño UI/UX cuidado con experiencia de usuario optimizada
 * Incluye enlace a contratos de mantenimiento
 */

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Flame,
  Truck,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Phone,
  CheckCircle,
  Wrench,
  BadgePercent
} from "lucide-react";
import Image from "next/image";
import { CALDERAS_BRANDS } from "@/lib/brands";

// Categorías de Repuestos de Calderas
const repuestosCalderas = [
  { id: 1, name: "Placas", fullName: "Placas Electrónicas", slug: "placas-electronicas", image: "/images/categorias/PlacasElectronicas.png", count: 245, popular: true },
  { id: 2, name: "Intercambiadores", fullName: "Intercambiadores de Placas", slug: "intercambiadores-placas", image: "/images/categorias/IntercambiadorDePlacas.png", count: 189, popular: true },
  { id: 3, name: "Bombas", fullName: "Bombas de Circulación", slug: "bombas-circulacion", image: "/images/categorias/Bombas.png", count: 156, popular: true },
  { id: 4, name: "Válvulas Gas", fullName: "Válvulas de Gas", slug: "valvulas-gas", image: "/images/categorias/ValvulaGasCondensacion.png", count: 312, popular: true },
  { id: 5, name: "Extractores", fullName: "Extractores", slug: "extractores", image: "/images/categorias/Extractores.png", count: 178, popular: false },
  { id: 6, name: "Bitérmicos", fullName: "Intercambiadores Bitérmicos", slug: "intercambiadores-bitermicos", image: "/images/categorias/IntercambiadorBitermico.png", count: 98, popular: false },
  { id: 7, name: "Combustión", fullName: "Cámaras de Combustión", slug: "camaras-combustion", image: "/images/categorias/CamarasDeCombustion.png", count: 67, popular: false },
  { id: 8, name: "Válvulas 3 Vías", fullName: "Válvulas de 3 Vías", slug: "valvulas-3-vias", image: "/images/categorias/Valvulas3Vias.png", count: 234, popular: true },
  { id: 9, name: "Hidráulicos", fullName: "Cuerpos Hidráulicos", slug: "cuerpos-hidraulicos", image: "/images/categorias/Hidraulicos.png", count: 145, popular: false },
  { id: 10, name: "Modulantes", fullName: "Extractores Modulantes", slug: "extractores-modulantes", image: "/images/categorias/ExtractoresModulantes.png", count: 89, popular: false },
  { id: 11, name: "Vasos Expansión", fullName: "Vasos de Expansión", slug: "vasos-expansion", image: "/images/categorias/VasoExpansion.png", count: 167, popular: false },
  { id: 12, name: "V. Seguridad", fullName: "Válvulas de Seguridad", slug: "valvulas-seguridad", image: "/images/categorias/ValvulasSeguridad.png", count: 198, popular: false },
  { id: 13, name: "Sensores", fullName: "Sensores", slug: "sensores", image: "/images/categorias/Sensores.png", count: 276, popular: true },
  { id: 14, name: "Flujostatos", fullName: "Flujostatos", slug: "flujostatos", image: "/images/categorias/Flujostato.png", count: 123, popular: false },
  { id: 15, name: "Presostatos", fullName: "Presostatos", slug: "presostatos", image: "/images/categorias/Presostatos.png", count: 187, popular: false },
  { id: 16, name: "Captadores", fullName: "Captadores de Presión", slug: "captadores-presion", image: "/images/categorias/CaptadorPresion.png", count: 156, popular: false },
  { id: 17, name: "Transformadores", fullName: "Transformadores", slug: "transformadores", image: "/images/categorias/Transformadores.png", count: 134, popular: false },
  { id: 18, name: "V. Llenado", fullName: "Válvulas de Llenado", slug: "valvulas-llenado", image: "/images/categorias/ValvulaLLenado.png", count: 112, popular: false },
  { id: 19, name: "Microacumuladores", fullName: "Microacumuladores", slug: "microacumuladores", image: "/images/categorias/Microacumuladores.png", count: 78, popular: false }
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

// Componente de tarjeta de categoría
function CategoryCard({ category, index }: { category: typeof repuestosCalderas[0]; index: number }) {
  const waveIndex = index % waveShapes.length;
  const wavePath = waveShapes[waveIndex];
  
  return (
    <Link href={`/c/calderas/${category.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative aspect-square border border-gray-100">
        {/* Badge popular */}
        {category.popular && (
          <div className="absolute top-2 right-2 z-30 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Popular
          </div>
        )}
        
        {/* Banner con forma de onda */}
        <div className="absolute bottom-0 left-0 right-0 h-[42%]">
          <svg 
            className="absolute inset-0 w-full h-full" 
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
            <path d={wavePath} fill={`url(#gradient-cal-${category.slug})`} />
          </svg>
        </div>
        
        {/* Imagen */}
        <div className="absolute inset-0 flex items-center justify-center p-2 z-10">
          <img
            src={category.image}
            alt={category.fullName}
            className="w-full h-full object-contain drop-shadow-xl max-w-[88%] max-h-[78%] group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        {/* Texto */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-3 px-2">
          <h3 className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center drop-shadow-lg uppercase tracking-wide">
            {category.name}
          </h3>
        </div>
      </div>
      <p className="text-[11px] text-gray-500 text-center mt-1.5 font-medium">
        {category.count} productos
      </p>
    </Link>
  );
}

// Componente de tarjeta de marca con logo a color
function BrandCard({ marca }: { marca: typeof marcas[0] }) {
  return (
    <Link 
      href={`/c/calderas?marca=${marca.slug}`}
      className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
    >
      <div className="w-full h-16 relative flex items-center justify-center">
        <Image
          src={marca.logo}
          alt={marca.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, 15vw"
        />
      </div>
    </Link>
  );
}

export default function RepuestosCalderas() {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarTodas, setMostrarTodas] = useState(false);
  
  const totalProductos = repuestosCalderas.reduce((acc, cat) => acc + cat.count, 0);
  const categoriasPopulares = repuestosCalderas.filter(c => c.popular);
  const categoriasAMostrar = mostrarTodas ? repuestosCalderas : categoriasPopulares;

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Repuestos Calderas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Repuestos de Calderas
                  </h1>
                </div>
                <p className="text-orange-100 text-lg max-w-2xl">
                  Encuentra repuestos originales y compatibles para calderas de todas las marcas. 
                  Más de {totalProductos.toLocaleString()} productos disponibles con envío en 24-48h.
                </p>
              </div>
              
              {/* Buscador */}
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por referencia, marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{totalProductos.toLocaleString()}</div>
                <div className="text-orange-200 text-sm">Productos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{marcas.length}</div>
                <div className="text-orange-200 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">24-48h</div>
                <div className="text-orange-200 text-sm">Entrega</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">1 año</div>
                <div className="text-orange-200 text-sm">Garantía</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-5 h-5 text-orange-500" />
                <span>Envío gratis +120€</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Entrega 24-48h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-orange-500" />
                <span>Garantía 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span>Repuestos verificados</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categorías */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {mostrarTodas ? "Todas las categorías" : "Categorías populares"}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {mostrarTodas ? `${repuestosCalderas.length} categorías` : `${categoriasPopulares.length} categorías más buscadas`}
                </p>
              </div>
              <button
                onClick={() => setMostrarTodas(!mostrarTodas)}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1"
              >
                {mostrarTodas ? "Ver menos" : "Ver todas"}
                <ChevronRight className={`w-4 h-4 transition-transform ${mostrarTodas ? "rotate-90" : ""}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
              {categoriasAMostrar.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Banner Mantenimiento */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">¿Prefieres que lo hagamos nosotros?</h3>
                  <p className="text-gray-400 text-sm">
                    Contrata nuestro servicio de mantenimiento y olvídate de problemas. Desde 90€/año.
                  </p>
                </div>
              </div>
              <Link 
                href="/contrato-mantenimiento"
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Contratar mantenimiento
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Marcas */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Buscar por marca</h2>
              <p className="text-gray-500">Repuestos para las principales marcas del mercado</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {marcas.map((marca) => (
                <BrandCard key={marca.slug} marca={marca} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Ayuda */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-orange-50 rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="text-gray-600">
                    Nuestro equipo técnico te ayudará a encontrar el repuesto exacto para tu caldera.
                    Envíanos la referencia o una foto del componente.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:+34912345678"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                  <a 
                    href="mailto:info@uniclima.es"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-orange-500 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Enviar consulta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEO Content */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Repuestos de calderas: Todo lo que necesitas saber
            </h2>
            
            <div className="prose prose-gray max-w-none">
              <p>
                En Uniclima Solutions somos especialistas en <strong>repuestos de calderas</strong> para todas las marcas 
                y modelos del mercado. Disponemos de un amplio catálogo de componentes originales y compatibles, 
                desde placas electrónicas hasta válvulas de gas, intercambiadores y bombas de circulación.
              </p>
              
              <h3>¿Qué repuestos de caldera ofrecemos?</h3>
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
              
              <h3>Marcas compatibles</h3>
              <p>
                Trabajamos con las principales marcas del sector: Junkers/Bosch, Vaillant, Saunier Duval, Baxi, 
                Ferroli, Ariston, Roca, Cointra, Chaffoteaux, Beretta, Immergas y Hermann.
              </p>
              
              <h3>Envío rápido y garantía</h3>
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
