"use client";

/**
 * PÁGINA: Calderas Completas - Hub
 * Calderas nuevas y reacondicionadas
 * SEO optimizado para "comprar calderas", "calderas baratas"
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Flame, 
  Sparkles,
  RefreshCw,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Award,
  Leaf
} from "lucide-react";

export default function CalderasCompletasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calderas Completas - Nuevas y Reacondicionadas",
    "description": "Compra calderas de gas nuevas y reacondicionadas con garantía. Marcas líderes: Junkers, Vaillant, Saunier Duval, Baxi.",
    "url": "https://uniclima.es/tienda/calderas-completas",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Calderas Completas", "item": "https://uniclima.es/tienda/calderas-completas" }
      ]
    }
  };

  const marcas = [
    { name: "Junkers / Bosch", slug: "junkers-bosch", count: 24 },
    { name: "Vaillant", slug: "vaillant", count: 18 },
    { name: "Saunier Duval", slug: "saunier-duval", count: 16 },
    { name: "Baxi", slug: "baxi", count: 14 },
    { name: "Ferroli", slug: "ferroli", count: 12 },
    { name: "Ariston", slug: "ariston", count: 10 },
    { name: "Roca", slug: "roca", count: 8 },
    { name: "Cointra", slug: "cointra", count: 8 }
  ];

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
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Calderas Completas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Calderas Completas
                  </h1>
                </div>
                <p className="text-orange-100 text-lg max-w-2xl">
                  Calderas de gas nuevas y reacondicionadas con garantía de hasta 2 años. 
                  Las mejores marcas al mejor precio.
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">150+</div>
                <div className="text-orange-200 text-sm">Modelos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">8</div>
                <div className="text-orange-200 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">24-72h</div>
                <div className="text-orange-200 text-sm">Entrega</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">2 años</div>
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
                <span>Envío gratis península</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Entrega 24-72h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-orange-500" />
                <span>Garantía hasta 2 años</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span>Instalación disponible</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tipos de calderas */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">¿Qué tipo de caldera buscas?</h2>
            <p className="text-gray-500 mb-8 text-center">Elige entre calderas nuevas o reacondicionadas</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Calderas Nuevas */}
              <Link href="/tienda/calderas-completas/nuevas" className="group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Calderas Nuevas</h3>
                    <p className="text-green-100">Equipos de fábrica con garantía completa del fabricante</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Desde</span>
                      <span className="text-2xl font-bold text-gray-900">899€</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-green-500" />
                        Garantía fabricante 2 años
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        Alta eficiencia energética
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Últimas tecnologías
                      </li>
                    </ul>
                    <div className="text-center py-3 bg-green-50 rounded-xl text-green-700 font-semibold group-hover:bg-green-100 transition-colors">
                      Ver calderas nuevas →
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Calderas Reacondicionadas */}
              <Link href="/tienda/calderas-completas/reacondicionadas" className="group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Calderas Reacondicionadas</h3>
                    <p className="text-amber-100">Equipos revisados y certificados a precio reducido</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Desde</span>
                      <span className="text-2xl font-bold text-gray-900">399€</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-500" />
                        Garantía Uniclima 1 año
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        Revisión completa certificada
                      </li>
                      <li className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-500" />
                        Ahorro hasta 50%
                      </li>
                    </ul>
                    <div className="text-center py-3 bg-amber-50 rounded-xl text-amber-700 font-semibold group-hover:bg-amber-100 transition-colors">
                      Ver calderas reacondicionadas →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Marcas */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Marcas disponibles</h2>
            <div className="flex flex-wrap gap-2">
              {marcas.map((marca) => (
                <Link 
                  key={marca.slug}
                  href={`/tienda/calderas-completas/nuevas/${marca.slug}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-full text-sm font-medium transition-colors"
                >
                  {marca.name} ({marca.count})
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
