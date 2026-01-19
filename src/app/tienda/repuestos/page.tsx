"use client";

/**
 * PÁGINA: Hub de Repuestos
 * /tienda/repuestos
 * Selección entre Calderas y Aire Acondicionado
 */

import Link from "next/link";
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
  Clock
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
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              Repuestos Técnicos
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Repuestos originales y compatibles para calderas y sistemas de climatización. 
              Garantía de calidad y envío rápido.
            </p>
          </div>
          
          {/* Beneficios */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm py-4 border-y border-gray-200 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Package className="w-5 h-5 text-orange-500" />
              <span>+5.000 referencias</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-orange-500" />
              <span>Envío 24-48h</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-orange-500" />
              <span>Garantía incluida</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>Soporte técnico</span>
            </div>
          </div>
          
          {/* Selección de tipo de máquina */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué tipo de repuesto buscas?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 pb-12">
            {/* Repuestos Calderas */}
            <Link href="/tienda/repuestos/calderas" className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Flame className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Repuestos Calderas</h3>
                  <p className="text-orange-100">Placas, bombas, válvulas, intercambiadores...</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Vaillant</span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Junkers</span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Saunier Duval</span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">+9 marcas</span>
                  </div>
                  <div className="text-center py-3 bg-orange-50 rounded-xl text-orange-700 font-semibold group-hover:bg-orange-100 transition-colors">
                    Ver repuestos calderas →
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Repuestos Aire Acondicionado */}
            <Link href="/tienda/repuestos/aire-acondicionado" className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Wind className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Repuestos Aire Acondicionado</h3>
                  <p className="text-blue-100">Placas, motores, sensores, mandos...</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Mitsubishi</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Daikin</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Fujitsu</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">+5 marcas</span>
                  </div>
                  <div className="text-center py-3 bg-blue-50 rounded-xl text-blue-700 font-semibold group-hover:bg-blue-100 transition-colors">
                    Ver repuestos aire →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
