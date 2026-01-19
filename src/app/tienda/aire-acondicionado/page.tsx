"use client";

/**
 * PÁGINA: Hub de Aires Acondicionados Completos
 * /tienda/aire-acondicionado
 * Selección entre Nuevos y Reacondicionados
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Wind, 
  Sparkles,
  RefreshCw,
  Truck,
  Shield,
  Award,
  Leaf
} from "lucide-react";

export default function AireAcondicionadoHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Aires Acondicionados - Nuevos y Reacondicionados",
    "description": "Compra aires acondicionados nuevos y reacondicionados con garantía. Splits, multisplits y sistemas de climatización.",
    "url": "https://uniclima.es/tienda/aire-acondicionado",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Aire Acondicionado", "item": "https://uniclima.es/tienda/aire-acondicionado" }
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              Aires Acondicionados
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Equipos de climatización nuevos y reacondicionados con garantía. 
              Splits, multisplits y sistemas completos de las mejores marcas.
            </p>
          </div>
          
          {/* Selección */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué tipo de equipo buscas?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 pb-12">
            {/* Aires Nuevos */}
            <Link href="/tienda/aire-acondicionado/nuevos" className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
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
                      <Truck className="w-4 h-4 text-blue-500" />
                      Instalación disponible
                    </li>
                  </ul>
                  <div className="text-center py-3 bg-blue-50 rounded-xl text-blue-700 font-semibold group-hover:bg-blue-100 transition-colors">
                    Ver aires nuevos →
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Aires Reacondicionados */}
            <Link href="/tienda/aire-acondicionado/reacondicionados" className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Aires Segunda Mano</h3>
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
                      <RefreshCw className="w-4 h-4 text-indigo-500" />
                      Revisión completa certificada
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-indigo-500" />
                      Ahorro hasta 50%
                    </li>
                  </ul>
                  <div className="text-center py-3 bg-indigo-50 rounded-xl text-indigo-700 font-semibold group-hover:bg-indigo-100 transition-colors">
                    Ver aires segunda mano →
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
