"use client";

/**
 * PÁGINA: Aires Acondicionados Completos - Hub
 * Equipos nuevos y reacondicionados
 * SEO optimizado para "comprar aire acondicionado", "split barato"
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Wind, 
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

export default function AiresCompletosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Aires Acondicionados Completos - Nuevos y Reacondicionados",
    "description": "Compra aires acondicionados nuevos y reacondicionados con garantía. Splits, multisplits y sistemas de climatización.",
    "url": "https://uniclima.es/tienda/aires-completos",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Aires Completos", "item": "https://uniclima.es/tienda/aires-completos" }
      ]
    }
  };

  const marcas = [
    { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 32 },
    { name: "Daikin", slug: "daikin", count: 28 },
    { name: "Fujitsu", slug: "fujitsu", count: 24 },
    { name: "LG", slug: "lg", count: 22 },
    { name: "Samsung", slug: "samsung", count: 20 },
    { name: "Panasonic", slug: "panasonic", count: 18 },
    { name: "Haier", slug: "haier", count: 16 },
    { name: "Hisense", slug: "hisense", count: 14 }
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
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-blue-100 text-sm mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Aires Completos</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Wind className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Aires Acondicionados
                  </h1>
                </div>
                <p className="text-blue-100 text-lg max-w-2xl">
                  Equipos de climatización nuevos y reacondicionados con garantía. 
                  Splits, multisplits y sistemas completos de las mejores marcas.
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">200+</div>
                <div className="text-blue-200 text-sm">Modelos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">15</div>
                <div className="text-blue-200 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">24-72h</div>
                <div className="text-blue-200 text-sm">Entrega</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">2 años</div>
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
                <span>Envío gratis península</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Entrega 24-72h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Garantía hasta 2 años</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Instalación disponible</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tipos */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">¿Qué tipo de equipo buscas?</h2>
            <p className="text-gray-500 mb-8 text-center">Elige entre equipos nuevos o reacondicionados</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Aires Nuevos */}
              <Link href="/tienda/aires-completos/nuevos" className="group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Aires Nuevos</h3>
                    <p className="text-cyan-100">Equipos de fábrica con garantía completa del fabricante</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Desde</span>
                      <span className="text-2xl font-bold text-gray-900">399€</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        Garantía fabricante 2 años
                      </li>
                      <li className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-blue-500" />
                        Alta eficiencia A+++
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        Última tecnología Inverter
                      </li>
                    </ul>
                    <div className="text-center py-3 bg-blue-50 rounded-xl text-blue-700 font-semibold group-hover:bg-blue-100 transition-colors">
                      Ver aires nuevos →
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Aires Reacondicionados */}
              <Link href="/tienda/aires-completos/reacondicionados" className="group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Aires Reacondicionados</h3>
                    <p className="text-indigo-100">Equipos revisados y certificados a precio reducido</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Desde</span>
                      <span className="text-2xl font-bold text-gray-900">199€</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-indigo-500" />
                        Garantía Uniclima 1 año
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-indigo-500" />
                        Revisión completa certificada
                      </li>
                      <li className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-indigo-500" />
                        Ahorro hasta 50%
                      </li>
                    </ul>
                    <div className="text-center py-3 bg-indigo-50 rounded-xl text-indigo-700 font-semibold group-hover:bg-indigo-100 transition-colors">
                      Ver aires reacondicionados →
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
                  href={`/tienda/aires-completos/nuevos/${marca.slug}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors"
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
