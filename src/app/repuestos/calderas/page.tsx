"use client";

/**
 * PÁGINA: Repuestos de Calderas
 * Lista de marcas disponibles - Authority Hub
 * SEO optimizado para "repuestos calderas"
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Flame,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Search
} from "lucide-react";
import { useState } from "react";

// Marcas de calderas con sus datos
const marcasCalderas = [
  { name: "Junkers / Bosch", slug: "junkers-bosch", count: 456, logo: "/images/marcas/junkers.webp" },
  { name: "Vaillant", slug: "vaillant", count: 389, logo: "/images/marcas/vaillant.webp" },
  { name: "Saunier Duval", slug: "saunier-duval", count: 312, logo: "/images/marcas/saunier-duval.webp" },
  { name: "Baxi", slug: "baxi", count: 278, logo: "/images/marcas/baxi.webp" },
  { name: "Ferroli", slug: "ferroli", count: 234, logo: "/images/marcas/ferroli.webp" },
  { name: "Ariston", slug: "ariston", count: 198, logo: "/images/marcas/ariston.webp" },
  { name: "Roca", slug: "roca", count: 167, logo: "/images/marcas/roca.webp" },
  { name: "Cointra", slug: "cointra", count: 145, logo: "/images/marcas/cointra.webp" },
  { name: "Chaffoteaux", slug: "chaffoteaux", count: 123, logo: "/images/marcas/chaffoteaux.webp" },
  { name: "Beretta", slug: "beretta", count: 98, logo: "/images/marcas/beretta.webp" },
  { name: "Immergas", slug: "immergas", count: 87, logo: "/images/marcas/immergas.webp" },
  { name: "Hermann", slug: "hermann", count: 76, logo: "/images/marcas/hermann.webp" }
];

// Familias de piezas
const familiasPiezas = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", count: 245 },
  { name: "Intercambiadores", slug: "intercambiadores", count: 189 },
  { name: "Bombas de Circulación", slug: "bombas-circulacion", count: 156 },
  { name: "Válvulas de Gas", slug: "valvulas-gas", count: 312 },
  { name: "Válvulas 3 Vías", slug: "valvulas-3-vias", count: 234 },
  { name: "Sensores", slug: "sensores", count: 276 },
  { name: "Ventiladores", slug: "ventiladores", count: 145 },
  { name: "Electrodos", slug: "electrodos", count: 89 },
  { name: "Presostatos", slug: "presostatos", count: 67 },
  { name: "Termostatos", slug: "termostatos", count: 123 },
  { name: "Juntas", slug: "juntas", count: 98 },
  { name: "Membranas", slug: "membranas", count: 76 }
];

// JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Repuestos de Calderas",
  "description": "Catálogo completo de repuestos para calderas de todas las marcas. Más de 3.144 productos con envío en 24-48h.",
  "url": "https://uniclima.es/repuestos/calderas",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
      { "@type": "ListItem", "position": 2, "name": "Repuestos", "item": "https://uniclima.es/repuestos" },
      { "@type": "ListItem", "position": 3, "name": "Calderas", "item": "https://uniclima.es/repuestos/calderas" }
    ]
  }
};

export default function RepuestosCalderas() {
  const [busqueda, setBusqueda] = useState("");
  
  const totalProductos = marcasCalderas.reduce((acc, m) => acc + m.count, 0);
  
  const marcasFiltradas = marcasCalderas.filter(m => 
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
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/repuestos" className="hover:text-white transition-colors">Repuestos</Link>
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
                    Repuestos de Calderas
                  </h1>
                </div>
                <p className="text-orange-100 text-lg max-w-2xl">
                  Encuentra repuestos originales y compatibles para calderas de todas las marcas. 
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
                <div className="text-2xl font-black">{marcasCalderas.length}</div>
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
        
        {/* Marcas */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecciona una marca</h2>
            <p className="text-gray-500 mb-6">Elige la marca de tu caldera para ver los repuestos disponibles</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {marcasFiltradas.map((marca) => (
                <Link 
                  key={marca.slug}
                  href={`/repuestos/calderas/${marca.slug}`}
                  className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <Flame className="w-8 h-8 text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors text-center">
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
                  href={`/repuestos/calderas/todas-marcas/${familia.slug}`}
                  className="group bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
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
              Repuestos de calderas: Todo lo que necesitas saber
            </h2>
            
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en <strong>repuestos de calderas</strong> para 
                todas las marcas y modelos del mercado. Disponemos de un amplio catálogo de componentes originales 
                y compatibles, desde placas electrónicas hasta válvulas de gas, intercambiadores y bombas de circulación.
              </p>
              
              <h3>¿Qué repuestos de caldera ofrecemos?</h3>
              <p>Nuestro catálogo incluye más de {totalProductos.toLocaleString()} referencias de repuestos para calderas:</p>
              <ul>
                <li><strong>Placas electrónicas:</strong> El cerebro de tu caldera. Disponemos de placas para Junkers, Vaillant, Saunier Duval y más.</li>
                <li><strong>Intercambiadores:</strong> Tanto de placas como bitérmicos, esenciales para la transferencia de calor.</li>
                <li><strong>Válvulas de gas:</strong> Componentes de seguridad críticos para el correcto funcionamiento.</li>
                <li><strong>Bombas de circulación:</strong> Para mantener el flujo de agua en el circuito de calefacción.</li>
                <li><strong>Sensores y termostatos:</strong> Para el control preciso de la temperatura.</li>
              </ul>
              
              <h3>Marcas compatibles</h3>
              <p>
                Trabajamos con las principales marcas del sector: {marcasCalderas.map(m => m.name).join(", ")}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
