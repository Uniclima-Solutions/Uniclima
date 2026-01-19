"use client";

/**
 * PÁGINA: Calderas Reacondicionadas
 * Listado de calderas reacondicionadas por marca
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Flame, 
  RefreshCw,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Search
} from "lucide-react";
import { useState } from "react";

const marcas = [
  { name: "Junkers / Bosch", slug: "junkers-bosch", count: 18, logo: "/images/marcas/junkers.png" },
  { name: "Vaillant", slug: "vaillant", count: 14, logo: "/images/marcas/vaillant.png" },
  { name: "Saunier Duval", slug: "saunier-duval", count: 12, logo: "/images/marcas/saunier-duval.png" },
  { name: "Baxi", slug: "baxi", count: 10, logo: "/images/marcas/baxi.png" },
  { name: "Ferroli", slug: "ferroli", count: 8, logo: "/images/marcas/ferroli.png" },
  { name: "Ariston", slug: "ariston", count: 6, logo: "/images/marcas/ariston.png" },
  { name: "Roca", slug: "roca", count: 5, logo: "/images/marcas/roca.png" },
  { name: "Cointra", slug: "cointra", count: 4, logo: "/images/marcas/cointra.png" }
];

export default function CalderasReacondicionadasPage() {
  const [busqueda, setBusqueda] = useState("");
  
  const marcasFiltradas = marcas.filter(m => 
    m.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calderas Reacondicionadas",
    "description": "Compra calderas de gas reacondicionadas con garantía Uniclima. Ahorra hasta un 50% respecto a una caldera nueva.",
    "url": "https://uniclima.es/tienda/calderas-completas/reacondicionadas",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Calderas Completas", "item": "https://uniclima.es/tienda/calderas-completas" },
        { "@type": "ListItem", "position": 4, "name": "Reacondicionadas", "item": "https://uniclima.es/tienda/calderas-completas/reacondicionadas" }
      ]
    }
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-amber-100 text-sm mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tienda/calderas-completas" className="hover:text-white transition-colors">Calderas Completas</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Reacondicionadas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <RefreshCw className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Calderas Reacondicionadas
                  </h1>
                </div>
                <p className="text-amber-100 text-lg max-w-2xl">
                  Calderas revisadas y certificadas por nuestros técnicos. 
                  Ahorra hasta un 50% con garantía Uniclima de 1 año.
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
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">77</div>
                <div className="text-amber-200 text-sm">Modelos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">8</div>
                <div className="text-amber-200 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">-50%</div>
                <div className="text-amber-200 text-sm">Ahorro</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">1 año</div>
                <div className="text-amber-200 text-sm">Garantía</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-5 h-5 text-amber-500" />
                <span>Envío gratis península</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-amber-500" />
                <span>Entrega 24-72h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-amber-500" />
                <span>Garantía Uniclima 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-amber-500" />
                <span>Revisión certificada</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Marcas */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecciona una marca</h2>
            <p className="text-gray-500 mb-6">Elige la marca de caldera que buscas</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {marcasFiltradas.map((marca) => (
                <Link 
                  key={marca.slug}
                  href={`/tienda/calderas-completas/reacondicionadas/${marca.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                    <Flame className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{marca.name}</h3>
                  <p className="text-sm text-gray-500">{marca.count} modelos</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Info sobre reacondicionados */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es una caldera reacondicionada?</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                Una <strong>caldera reacondicionada</strong> es un equipo que ha sido revisado, reparado y certificado 
                por nuestros técnicos especializados. Cada caldera pasa por un proceso exhaustivo de:
              </p>
              <ul>
                <li><strong>Limpieza completa</strong> de todos los componentes</li>
                <li><strong>Sustitución de piezas</strong> desgastadas (juntas, membranas, electrodos)</li>
                <li><strong>Verificación de seguridad</strong> según normativa vigente</li>
                <li><strong>Pruebas de funcionamiento</strong> en condiciones reales</li>
                <li><strong>Certificación</strong> con garantía Uniclima de 1 año</li>
              </ul>
              <p>
                Con una caldera reacondicionada puedes <strong>ahorrar hasta un 50%</strong> respecto al precio 
                de una caldera nueva, con la tranquilidad de contar con garantía y soporte técnico.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
