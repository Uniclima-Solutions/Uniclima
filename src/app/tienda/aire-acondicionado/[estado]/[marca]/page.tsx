"use client";

/**
 * PÁGINA: Aires por Marca
 * /tienda/aire-acondicionado/[estado]/[marca]
 * Listado de modelos disponibles
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Wind, 
  ShoppingCart,
  Check,
  Package
} from "lucide-react";

const generarModelos = (marca: string, estado: string) => {
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const modelos = [
    { nombre: "MSZ-AP25", potencia: "2.5kW", tipo: "Split" },
    { nombre: "MSZ-AP35", potencia: "3.5kW", tipo: "Split" },
    { nombre: "MSZ-AP50", potencia: "5.0kW", tipo: "Split" },
    { nombre: "MXZ-2F42", potencia: "4.2kW", tipo: "Multisplit" },
    { nombre: "MXZ-3F68", potencia: "6.8kW", tipo: "Multisplit" }
  ];
  
  return modelos.map((m, i) => ({
    id: `${marca}-${m.nombre.toLowerCase()}-${m.tipo.toLowerCase()}`,
    slug: `${m.nombre.toLowerCase()}-${m.tipo.toLowerCase()}`,
    nombre: `${marcaNombre} ${m.nombre}`,
    potencia: m.potencia,
    tipo: m.tipo,
    precio: estado === "nuevos" ? 599 + i * 150 : 299 + i * 100,
    stock: Math.random() > 0.3
  }));
};

export default function AireMarcaPage() {
  const params = useParams();
  const estado = params.estado as string;
  const marca = params.marca as string;
  
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const estadoNombre = estado === "nuevos" ? "Nuevos" : "Segunda Mano";
  const modelos = generarModelos(marca, estado);
  
  const colorBtn = estado === "nuevos" ? "bg-blue-500 hover:bg-blue-600" : "bg-indigo-500 hover:bg-indigo-600";
  const colorGradient = estado === "nuevos" ? "from-cyan-500 to-blue-600" : "from-indigo-500 to-purple-600";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Aires ${marcaNombre} ${estadoNombre}`,
    "description": `Aires acondicionados ${marcaNombre} ${estadoNombre.toLowerCase()} con garantía.`,
    "url": `https://uniclima.es/tienda/aire-acondicionado/${estado}/${marca}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Aire Acondicionado", "item": "https://uniclima.es/tienda/aire-acondicionado" },
        { "@type": "ListItem", "position": 4, "name": estadoNombre, "item": `https://uniclima.es/tienda/aire-acondicionado/${estado}` },
        { "@type": "ListItem", "position": 5, "name": marcaNombre, "item": `https://uniclima.es/tienda/aire-acondicionado/${estado}/${marca}` }
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
          <div className={`bg-gradient-to-br ${colorGradient} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Wind className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Aires {estadoNombre}</p>
                <h1 className="text-3xl lg:text-4xl font-black">{marcaNombre}</h1>
              </div>
            </div>
            <p className="text-white/90 max-w-2xl">
              {modelos.length} modelos de aires acondicionados {marcaNombre} {estadoNombre.toLowerCase()} disponibles
            </p>
          </div>
          
          {/* Listado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {modelos.map((modelo) => (
              <Link 
                key={modelo.id}
                href={`/tienda/aire-acondicionado/${estado}/${marca}/${modelo.slug}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`h-40 bg-gradient-to-br ${colorGradient} opacity-10 flex items-center justify-center`}>
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {modelo.stock ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Check className="w-3 h-3" /> En stock
                      </span>
                    ) : (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        Bajo pedido
                      </span>
                    )}
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {modelo.tipo}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {modelo.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{modelo.potencia}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-gray-900">€{modelo.precio}</span>
                      <span className="text-xs text-gray-500 ml-1">+ IVA</span>
                    </div>
                    <button className={`p-2 rounded-xl ${colorBtn} text-white transition-colors`}>
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
