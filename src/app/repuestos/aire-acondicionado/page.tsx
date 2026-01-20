"use client";

/**
 * PÁGINA: Repuestos de Aire Acondicionado
 * Lista de marcas disponibles - Authority Hub
 * SEO optimizado para "repuestos aire acondicionado"
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Wind,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Search
} from "lucide-react";
import { useState } from "react";

// Marcas de aire acondicionado con sus datos
const marcasAire = [
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 412, logo: "/images/marcas/mitsubishi.webp" },
  { name: "Daikin", slug: "daikin", count: 378, logo: "/images/marcas/daikin.webp" },
  { name: "Fujitsu", slug: "fujitsu", count: 289, logo: "/images/marcas/fujitsu.webp" },
  { name: "LG", slug: "lg", count: 256, logo: "/images/marcas/lg.webp" },
  { name: "Samsung", slug: "samsung", count: 234, logo: "/images/marcas/samsung.webp" },
  { name: "Panasonic", slug: "panasonic", count: 198, logo: "/images/marcas/panasonic.webp" },
  { name: "Haier", slug: "haier", count: 167, logo: "/images/marcas/haier.webp" },
  { name: "Hisense", slug: "hisense", count: 145, logo: "/images/marcas/hisense.webp" },
  { name: "Toshiba", slug: "toshiba", count: 132, logo: "/images/marcas/toshiba.webp" },
  { name: "Carrier", slug: "carrier", count: 98, logo: "/images/marcas/carrier.webp" },
  { name: "Johnson Controls", slug: "johnson-controls", count: 87, logo: "/images/marcas/johnson.webp" },
  { name: "Gree", slug: "gree", count: 76, logo: "/images/marcas/gree.webp" }
];

// Familias de piezas
const familiasPiezas = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", count: 198 },
  { name: "Compresores", slug: "compresores", count: 156 },
  { name: "Motores Ventilador", slug: "motores-ventilador", count: 234 },
  { name: "Turbinas", slug: "turbinas", count: 145 },
  { name: "Sensores", slug: "sensores", count: 276 },
  { name: "Válvulas Expansión", slug: "valvulas-expansion", count: 89 },
  { name: "Condensadores", slug: "condensadores", count: 123 },
  { name: "Evaporadores", slug: "evaporadores", count: 98 },
  { name: "Mandos a Distancia", slug: "mandos-distancia", count: 312 },
  { name: "Filtros", slug: "filtros", count: 187 },
  { name: "Aspas y Deflectores", slug: "aspas-deflectores", count: 134 },
  { name: "Tarjetas Display", slug: "tarjetas-display", count: 76 }
];

// JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Repuestos de Aire Acondicionado",
  "description": "Catálogo completo de repuestos para aire acondicionado de todas las marcas. Más de 2.800 productos con envío en 24-48h.",
  "url": "https://uniclima.es/repuestos/aire-acondicionado",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
      { "@type": "ListItem", "position": 2, "name": "Repuestos", "item": "https://uniclima.es/repuestos" },
      { "@type": "ListItem", "position": 3, "name": "Aire Acondicionado", "item": "https://uniclima.es/repuestos/aire-acondicionado" }
    ]
  }
};

export default function RepuestosAireAcondicionado() {
  const [busqueda, setBusqueda] = useState("");
  
  const totalProductos = marcasAire.reduce((acc, m) => acc + m.count, 0);
  
  const marcasFiltradas = marcasAire.filter(m => 
    m.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-blue-100 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/repuestos" className="hover:text-white transition-colors">Repuestos</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Aire Acondicionado</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Wind className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Repuestos de Aire Acondicionado
                  </h1>
                </div>
                <p className="text-blue-100 text-lg max-w-2xl">
                  Encuentra repuestos originales y compatibles para aire acondicionado de todas las marcas. 
                  Más de {totalProductos.toLocaleString()} productos con envío en 24-48h.
                </p>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{totalProductos.toLocaleString()}</div>
                <div className="text-blue-200 text-sm">Productos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{marcasAire.length}</div>
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
        
        {/* Marcas */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecciona una marca</h2>
            <p className="text-gray-500 mb-6">Elige la marca de tu aire acondicionado para ver los repuestos disponibles</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {marcasFiltradas.map((marca) => (
                <Link 
                  key={marca.slug}
                  href={`/repuestos/aire-acondicionado/${marca.slug}`}
                  className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Wind className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                    {marca.name}
                  </span>
                  <span className="text-xs text-gray-400">{marca.count} productos</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Familias de piezas */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Buscar por tipo de pieza</h2>
            <p className="text-gray-500 mb-6">También puedes buscar directamente por el tipo de componente</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {familiasPiezas.map((familia) => (
                <Link 
                  key={familia.slug}
                  href={`/repuestos/aire-acondicionado/todas-marcas/${familia.slug}`}
                  className="group bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {familia.name}
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">{familia.count} productos</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* SEO Content */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Repuestos de aire acondicionado: Todo lo que necesitas saber
            </h2>
            
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en <strong>repuestos de aire acondicionado</strong> para 
                todas las marcas y modelos del mercado. Disponemos de un amplio catálogo de componentes originales 
                y compatibles, desde placas electrónicas hasta compresores, motores de ventilador y turbinas.
              </p>
              
              <h3>¿Qué repuestos de aire acondicionado ofrecemos?</h3>
              <p>Nuestro catálogo incluye más de {totalProductos.toLocaleString()} referencias de repuestos para aire acondicionado:</p>
              <ul>
                <li><strong>Placas electrónicas:</strong> El cerebro de tu equipo. Disponemos de placas para Mitsubishi, Daikin, Fujitsu y más.</li>
                <li><strong>Compresores:</strong> El corazón del sistema de refrigeración.</li>
                <li><strong>Motores de ventilador:</strong> Para unidades interiores y exteriores.</li>
                <li><strong>Turbinas:</strong> Componentes esenciales para la circulación del aire.</li>
                <li><strong>Sensores:</strong> Para el control preciso de la temperatura y funcionamiento.</li>
              </ul>
              
              <h3>Marcas compatibles</h3>
              <p>
                Trabajamos con las principales marcas del sector: {marcasAire.map(m => m.name).join(", ")}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
