"use client";

/**
 * PÁGINA PREMIUM: Repuestos de Aire Acondicionado
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
  Snowflake,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  CheckCircle,
  Thermometer
} from "lucide-react";

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

// Marcas de aire acondicionado
const marcas = [
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 523 },
  { name: "Daikin", slug: "daikin", count: 467 },
  { name: "Fujitsu", slug: "fujitsu", count: 389 },
  { name: "LG", slug: "lg", count: 345 },
  { name: "Samsung", slug: "samsung", count: 312 },
  { name: "Panasonic", slug: "panasonic", count: 278 },
  { name: "Toshiba", slug: "toshiba", count: 234 },
  { name: "Hisense", slug: "hisense", count: 198 },
  { name: "Haier", slug: "haier", count: 167 },
  { name: "Carrier", slug: "carrier", count: 145 },
  { name: "Midea", slug: "midea", count: 123 },
  { name: "Gree", slug: "gree", count: 98 }
];

// Formas de onda para las tarjetas (azul)
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
];

// Componente de tarjeta de categoría
function CategoryCard({ category, index }: { category: typeof repuestosAire[0]; index: number }) {
  const waveIndex = index % waveShapes.length;
  const wavePath = waveShapes[waveIndex];
  
  return (
    <Link href={`/c/aire-acondicionado/${category.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative aspect-square border border-gray-100">
        {category.popular && (
          <div className="absolute top-2 right-2 z-30 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Popular
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-[42%]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-aire-${category.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path d={wavePath} fill={`url(#gradient-aire-${category.slug})`} />
          </svg>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-2 z-10">
          <img
            src={category.image}
            alt={category.fullName}
            className="w-full h-full object-contain drop-shadow-xl max-w-[88%] max-h-[78%] group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
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

function BrandCard({ marca }: { marca: typeof marcas[0] }) {
  return (
    <Link 
      href={`/c/aire-acondicionado?marca=${marca.slug}`}
      className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-2"
    >
      <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-center">
        {marca.name}
      </span>
      <span className="text-xs text-gray-400">{marca.count} productos</span>
    </Link>
  );
}

export default function RepuestosAireAcondicionado() {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarTodas, setMostrarTodas] = useState(false);
  
  const totalProductos = repuestosAire.reduce((acc, cat) => acc + cat.count, 0);
  const categoriasPopulares = repuestosAire.filter(c => c.popular);
  const categoriasAMostrar = mostrarTodas ? repuestosAire : categoriasPopulares;

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <nav className="flex items-center gap-2 text-blue-100 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Repuestos Aire Acondicionado</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Snowflake className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Repuestos de Aire Acondicionado
                  </h1>
                </div>
                <p className="text-blue-100 text-lg max-w-2xl">
                  Componentes originales y compatibles para splits, multisplits y sistemas de climatización. 
                  Más de {totalProductos.toLocaleString()} productos con envío en 24-48h.
                </p>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por referencia, marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{totalProductos.toLocaleString()}</div>
                <div className="text-blue-200 text-sm">Productos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{marcas.length}</div>
                <div className="text-blue-200 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">24-48h</div>
                <div className="text-blue-200 text-sm">Entrega</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">1 año</div>
                <div className="text-blue-200 text-sm">Garantía</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Envío gratis +120€</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Entrega 24-48h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Garantía 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-blue-500" />
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
                  {mostrarTodas ? `${repuestosAire.length} categorías` : `${categoriasPopulares.length} categorías más buscadas`}
                </p>
              </div>
              <button
                onClick={() => setMostrarTodas(!mostrarTodas)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
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
                <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Thermometer className="w-7 h-7 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">Mantén tu aire en perfecto estado</h3>
                  <p className="text-gray-400 text-sm">
                    Contrata nuestro servicio de mantenimiento preventivo. Desde 70€/año con técnicos certificados.
                  </p>
                </div>
              </div>
              <Link 
                href="/contrato-mantenimiento?tipo=aire"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
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
              <p className="text-gray-500">Repuestos para las principales marcas de climatización</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {marcas.map((marca) => (
                <BrandCard key={marca.slug} marca={marca} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Tipos de equipos */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Repuestos por tipo de equipo</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/c/aire-acondicionado?tipo=split" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <Snowflake className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Split</h3>
                <p className="text-sm text-gray-500">Unidades de pared domésticas</p>
              </Link>
              
              <Link href="/c/aire-acondicionado?tipo=multisplit" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <Snowflake className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Multisplit</h3>
                <p className="text-sm text-gray-500">Sistemas multi-unidad</p>
              </Link>
              
              <Link href="/c/aire-acondicionado?tipo=conductos" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <Snowflake className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Conductos</h3>
                <p className="text-sm text-gray-500">Sistemas canalizados</p>
              </Link>
              
              <Link href="/c/aire-acondicionado?tipo=cassette" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <Snowflake className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Cassette</h3>
                <p className="text-sm text-gray-500">Unidades de techo</p>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Ayuda */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="text-gray-600">
                    Nuestro equipo técnico te ayudará a encontrar el repuesto exacto para tu aire acondicionado.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:+34912345678"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                  <a 
                    href="mailto:info@uniclima.es"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Enviar consulta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* SEO Content */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Repuestos de aire acondicionado: Guía completa
            </h2>
            
            <div className="prose prose-gray max-w-none">
              <p>
                En Uniclima Solutions somos especialistas en <strong>repuestos de aire acondicionado</strong> para todas las marcas 
                y tipos de equipos. Disponemos de componentes originales y compatibles para splits, multisplits, 
                sistemas de conductos y cassettes.
              </p>
              
              <h3>¿Qué repuestos de aire acondicionado ofrecemos?</h3>
              <ul>
                <li><strong>Placas electrónicas:</strong> Tanto de unidad interior como exterior para todas las marcas.</li>
                <li><strong>Turbinas y motores:</strong> Componentes de ventilación para un flujo de aire óptimo.</li>
                <li><strong>Hélices y motores de compresor:</strong> Para la unidad exterior.</li>
                <li><strong>Bombas de condensados:</strong> Para conductos y cassettes.</li>
                <li><strong>Mandos a distancia:</strong> Originales y universales compatibles.</li>
              </ul>
              
              <h3>Servicio técnico especializado</h3>
              <p>
                Además de repuestos, ofrecemos <Link href="/contrato-mantenimiento?tipo=aire" className="text-blue-600 hover:underline">contratos de mantenimiento</Link> para 
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
