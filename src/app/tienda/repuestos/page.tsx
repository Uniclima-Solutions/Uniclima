"use client";

/**
 * PÁGINA: Hub de Repuestos
 * /tienda/repuestos
 * Selección entre Calderas y Aire Acondicionado
 */

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  Wind, 
  Wrench,
  Package,
  Truck,
  Shield,
  Clock,
  ChevronRight
} from "lucide-react";

export default function RepuestosHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Repuestos para Calderas y Aire Acondicionado",
    "description": "Repuestos originales y compatibles para calderas y aire acondicionado. Placas electrónicas, bombas, válvulas y más.",
    "url": "https://uniclima.es/tienda/repuestos",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Repuestos", "item": "https://uniclima.es/tienda/repuestos" }
      ]
    }
  };

  // Marcas de calderas
  const marcasCalderas = [
    { name: "Vaillant", logo: "/images/marcas/vaillant.webp" },
    { name: "Junkers", logo: "/images/marcas/junkers.webp" },
    { name: "Saunier Duval", logo: "/images/marcas/saunier-duval.webp" },
    { name: "Baxi", logo: "/images/marcas/baxi.webp" },
    { name: "Ferroli", logo: "/images/marcas/ferroli.webp" },
    { name: "Ariston", logo: "/images/marcas/ariston.webp" },
  ];

  // Marcas de aire
  const marcasAire = [
    { name: "Mitsubishi", logo: "/images/marcas/mitsubishi.webp" },
    { name: "Daikin", logo: "/images/marcas/daikin.webp" },
    { name: "Fujitsu", logo: "/images/marcas/fujitsu.webp" },
    { name: "LG", logo: "/images/marcas/lg.webp" },
    { name: "Samsung", logo: "/images/marcas/samsung.webp" },
    { name: "Panasonic", logo: "/images/marcas/panasonic.webp" },
  ];

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          
          {/* Hero */}
          <div className="text-center py-6 lg:py-8">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-3 lg:mb-4">
              <Wrench className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 lg:mb-3">
              Repuestos Técnicos
            </h1>
            <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto px-4">
              Repuestos originales y compatibles para calderas y sistemas de climatización. 
              Garantía de calidad y envío rápido.
            </p>
          </div>
          
          {/* Beneficios */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-xs lg:text-sm py-3 lg:py-4 border-y border-gray-200 mb-6 lg:mb-8">
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Package className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
              <span>+5.000 referencias</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
              <span>Envío 24-48h</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
              <span>Garantía incluida</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
              <span>Soporte técnico</span>
            </div>
          </div>
          
          {/* Selección de tipo de máquina */}
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 text-center">¿Qué tipo de repuesto buscas?</h2>
          
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 pb-8 lg:pb-12">
            {/* Repuestos Calderas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 lg:p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-white/20 rounded-xl flex items-center justify-center">
                    <Flame className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-1">Repuestos Calderas</h3>
                    <p className="text-orange-100 text-sm">Placas, bombas, válvulas, intercambiadores...</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Marcas disponibles</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {marcasCalderas.map((marca) => (
                    <Link
                      key={marca.name}
                      href={`/tienda/repuestos/calderas/${marca.name.toLowerCase().replace(' ', '-')}`}
                      className="bg-gray-50 rounded-lg p-2 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all flex items-center justify-center aspect-square"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={marca.logo}
                          alt={marca.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
                <Link 
                  href="/tienda/repuestos/calderas"
                  className="flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
                >
                  Ver todos los repuestos
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Repuestos Aire Acondicionado */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-white/20 rounded-xl flex items-center justify-center">
                    <Wind className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-1">Repuestos Aire</h3>
                    <p className="text-blue-100 text-sm">Placas, motores, sensores, mandos...</p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Marcas disponibles</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {marcasAire.map((marca) => (
                    <Link
                      key={marca.name}
                      href={`/tienda/repuestos/aire-acondicionado/${marca.name.toLowerCase()}`}
                      className="bg-gray-50 rounded-lg p-2 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all flex items-center justify-center aspect-square"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={marca.logo}
                          alt={marca.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
                <Link 
                  href="/tienda/repuestos/aire-acondicionado"
                  className="flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors"
                >
                  Ver todos los repuestos
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
