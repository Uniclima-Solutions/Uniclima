"use client";

/**
 * PÁGINA: Hub de Calderas Completas
 * /tienda/calderas
 * Selección entre Nuevas y Reacondicionadas
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  Sparkles,
  RefreshCw,
  Truck,
  Shield,
  Award,
  Leaf
} from "lucide-react";

export default function CalderasHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calderas de Condensación - Nuevas y Reacondicionadas",
    "description": "Compra calderas de condensación nuevas y reacondicionadas con garantía. Las mejores marcas con instalación disponible.",
    "url": "https://uniclima.es/tienda/calderas",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Calderas", "item": "https://uniclima.es/tienda/calderas" }
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
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              Calderas de Condensación
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Calderas de condensación nuevas y reacondicionadas con garantía. 
              Alta eficiencia energética y las mejores marcas del mercado.
            </p>
          </div>
          
          {/* Selección */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué tipo de caldera buscas?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 pb-12">
            {/* Calderas Nuevas */}
            <Link href="/tienda/calderas/nuevas" className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-8 text-white text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Calderas Nuevas</h3>
                  <p className="text-orange-100">Equipos de fábrica con garantía completa del fabricante</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Desde</span>
                    <span className="text-2xl font-bold text-gray-900">899€</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" />
                      Garantía fabricante 2-5 años
                    </li>
                    <li className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-orange-500" />
                      Alta eficiencia A+++
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-500" />
                      Instalación disponible
                    </li>
                  </ul>
                  <div className="text-center py-3 bg-orange-50 rounded-xl text-orange-700 font-semibold group-hover:bg-orange-100 transition-colors">
                    Ver calderas nuevas →
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Calderas Reacondicionadas */}
            <Link href="/tienda/calderas/reacondicionadas" className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-green-200 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 text-white text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Calderas Segunda Mano</h3>
                  <p className="text-green-100">Equipos revisados y certificados a precio reducido</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Desde</span>
                    <span className="text-2xl font-bold text-gray-900">399€</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      Garantía Uniclima 1 año
                    </li>
                    <li className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-green-500" />
                      Revisión completa certificada
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-green-500" />
                      Ahorro hasta 50%
                    </li>
                  </ul>
                  <div className="text-center py-3 bg-green-50 rounded-xl text-green-700 font-semibold group-hover:bg-green-100 transition-colors">
                    Ver calderas segunda mano →
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
