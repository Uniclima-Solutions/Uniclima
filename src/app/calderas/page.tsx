"use client";

/**
 * PÁGINA PREMIUM: Calderas Completas
 * Catálogo de calderas nuevas con diseño UI/UX premium
 * Incluye enlace a contratos de mantenimiento
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
  Zap,
  Droplets,
  ThermometerSun,
  Star,
  BadgeCheck
} from "lucide-react";

// Tipos de calderas
const tiposCalderas = [
  { 
    id: 1, 
    name: "Condensación", 
    slug: "condensacion", 
    image: "/images/calderas/condensacion.png",
    descripcion: "Máxima eficiencia energética A+",
    count: 45,
    destacado: true
  },
  { 
    id: 2, 
    name: "Estancas", 
    slug: "estancas", 
    image: "/images/calderas/estanca.png",
    descripcion: "Seguridad y rendimiento",
    count: 32,
    destacado: false
  },
  { 
    id: 3, 
    name: "Atmosféricas", 
    slug: "atmosfericas", 
    image: "/images/calderas/atmosferica.png",
    descripcion: "Solución económica",
    count: 18,
    destacado: false
  },
  { 
    id: 4, 
    name: "Biomasa", 
    slug: "biomasa", 
    image: "/images/calderas/biomasa.png",
    descripcion: "Energía renovable",
    count: 12,
    destacado: false
  }
];

// Marcas de calderas
const marcas = [
  { name: "Junkers / Bosch", slug: "junkers-bosch", count: 28, premium: true },
  { name: "Vaillant", slug: "vaillant", count: 24, premium: true },
  { name: "Saunier Duval", slug: "saunier-duval", count: 22, premium: true },
  { name: "Baxi", slug: "baxi", count: 18, premium: false },
  { name: "Ferroli", slug: "ferroli", count: 16, premium: false },
  { name: "Ariston", slug: "ariston", count: 14, premium: false },
  { name: "Roca", slug: "roca", count: 12, premium: false },
  { name: "Cointra", slug: "cointra", count: 10, premium: false },
  { name: "Beretta", slug: "beretta", count: 8, premium: false },
  { name: "Immergas", slug: "immergas", count: 6, premium: false }
];

// Calderas destacadas (ejemplo)
const calderasDestacadas = [
  {
    id: 1,
    nombre: "Junkers Cerapur Excellence",
    marca: "Junkers / Bosch",
    tipo: "Condensación",
    potencia: "24 kW",
    eficiencia: "A+",
    precio: 1890,
    precioAnterior: 2190,
    imagen: "/images/calderas/junkers-cerapur.png",
    caracteristicas: ["WiFi integrado", "Bajo NOx", "Modulación 1:10"]
  },
  {
    id: 2,
    nombre: "Vaillant ecoTEC Plus",
    marca: "Vaillant",
    tipo: "Condensación",
    potencia: "28 kW",
    eficiencia: "A+",
    precio: 2150,
    precioAnterior: 2450,
    imagen: "/images/calderas/vaillant-ecotec.png",
    caracteristicas: ["Acumulador integrado", "Silenciosa", "Alta modulación"]
  },
  {
    id: 3,
    nombre: "Saunier Duval ThemaFast",
    marca: "Saunier Duval",
    tipo: "Condensación",
    potencia: "25 kW",
    eficiencia: "A+",
    precio: 1650,
    precioAnterior: 1890,
    imagen: "/images/calderas/saunier-themafast.png",
    caracteristicas: ["Compacta", "Fácil instalación", "Bajo consumo"]
  }
];

export default function CalderasCompletas() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);
  
  const totalCalderas = tiposCalderas.reduce((acc, tipo) => acc + tipo.count, 0);

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 via-orange-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Calderas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Calderas
                  </h1>
                </div>
                <p className="text-orange-100 text-lg max-w-2xl">
                  Calderas de las mejores marcas con instalación profesional incluida. 
                  Eficiencia energética A+ y garantía de hasta 5 años.
                </p>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por marca, modelo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{totalCalderas}</div>
                <div className="text-orange-200 text-sm">Modelos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{marcas.length}</div>
                <div className="text-orange-200 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">5 años</div>
                <div className="text-orange-200 text-sm">Garantía</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">Incluida</div>
                <div className="text-orange-200 text-sm">Instalación</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Wrench className="w-5 h-5 text-orange-500" />
                <span>Instalación incluida</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-orange-500" />
                <span>Garantía 5 años</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>Eficiencia A+</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BadgeCheck className="w-5 h-5 text-orange-500" />
                <span>Técnicos certificados</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tipos de calderas */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de calderas</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tiposCalderas.map((tipo) => (
                <Link 
                  key={tipo.id}
                  href={`/calderas/${tipo.slug}`}
                  className={`group bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                    tipo.destacado 
                      ? 'border-orange-300 hover:border-orange-500' 
                      : 'border-gray-100 hover:border-orange-300'
                  }`}
                >
                  {tipo.destacado && (
                    <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-3">
                      Recomendado
                    </span>
                  )}
                  <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                    <Flame className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{tipo.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{tipo.descripcion}</p>
                  <span className="text-xs text-orange-600 font-medium">{tipo.count} modelos</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Calderas destacadas */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Calderas destacadas</h2>
                <p className="text-gray-500 text-sm mt-1">Las más vendidas este mes</p>
              </div>
              <Link href="/calderas/ofertas" className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                Ver todas las ofertas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {calderasDestacadas.map((caldera) => (
                <div key={caldera.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      -{Math.round((1 - caldera.precio / caldera.precioAnterior) * 100)}%
                    </span>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {caldera.eficiencia}
                    </span>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center mb-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                      <Flame className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-1">{caldera.nombre}</h3>
                  <p className="text-sm text-gray-500 mb-2">{caldera.marca} · {caldera.potencia}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {caldera.caracteristicas.map((car, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {car}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-gray-900">{caldera.precio}€</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{caldera.precioAnterior}€</span>
                    </div>
                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors text-sm">
                      Ver más
                    </button>
                  </div>
                </div>
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
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">Protege tu inversión</h3>
                  <p className="text-gray-400 text-sm">
                    Contrata el mantenimiento anual y extiende la garantía de tu caldera. Desde 90€/año.
                  </p>
                </div>
              </div>
              <Link 
                href="/contrato-mantenimiento?tipo=caldera"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Marcas disponibles</h2>
              <p className="text-gray-500">Trabajamos con los mejores fabricantes del mercado</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {marcas.map((marca) => (
                <Link 
                  key={marca.slug}
                  href={`/calderas?marca=${marca.slug}`}
                  className={`group bg-gray-50 rounded-xl p-4 border transition-all hover:shadow-lg flex flex-col items-center justify-center gap-2 ${
                    marca.premium ? 'border-orange-200 hover:border-orange-400' : 'border-gray-100 hover:border-orange-300'
                  }`}
                >
                  {marca.premium && (
                    <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors text-center">
                    {marca.name}
                  </span>
                  <span className="text-xs text-gray-400">{marca.count} modelos</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Servicios incluidos */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Qué incluye la compra?</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Instalación completa</h3>
                <p className="text-sm text-gray-500">Por técnicos certificados con más de 10 años de experiencia</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Puesta en marcha</h3>
                <p className="text-sm text-gray-500">Configuración óptima y pruebas de funcionamiento</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <ThermometerSun className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Retirada antigua</h3>
                <p className="text-sm text-gray-500">Desmontaje y gestión de residuos de tu caldera vieja</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Garantía extendida</h3>
                <p className="text-sm text-gray-500">Hasta 5 años de garantía con mantenimiento contratado</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Ayuda */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-orange-50 rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ¿Necesitas asesoramiento?
                  </h3>
                  <p className="text-gray-600">
                    Te ayudamos a elegir la caldera perfecta para tu hogar. Estudio gratuito y sin compromiso.
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
                    Solicitar presupuesto
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
              Calderas: Guía de compra
            </h2>
            
            <div className="prose prose-gray max-w-none">
              <p>
                En Uniclima Solutions te ofrecemos las mejores <strong>calderas del mercado</strong> con instalación 
                profesional incluida. Trabajamos con las marcas líderes: Junkers/Bosch, Vaillant, Saunier Duval, 
                Baxi, Ferroli y más.
              </p>
              
              <h3>¿Qué tipo de caldera necesito?</h3>
              <ul>
                <li><strong>Calderas de condensación:</strong> La opción más eficiente (A+). Recuperan el calor de los gases de combustión, ahorrando hasta un 30% en tu factura.</li>
                <li><strong>Calderas estancas:</strong> Seguras y fiables. Toman el aire del exterior, ideales para cualquier ubicación.</li>
                <li><strong>Calderas de biomasa:</strong> Energía renovable con pellets o leña. Subvenciones disponibles.</li>
              </ul>
              
              <h3>¿Por qué comprar en Uniclima?</h3>
              <p>
                Todas nuestras calderas incluyen instalación por técnicos certificados, puesta en marcha, 
                retirada de la caldera antigua y hasta 5 años de garantía con <Link href="/contrato-mantenimiento?tipo=caldera" className="text-orange-600 hover:underline">contrato de mantenimiento</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
