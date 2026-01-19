"use client";

/**
 * PÁGINA: Calderas por Marca
 * /tienda/calderas/[estado]/[marca]
 * Listado de modelos disponibles
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  ShoppingCart,
  Check,
  Package
} from "lucide-react";

// Modelos de ejemplo
const generarModelos = (marca: string, estado: string) => {
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const modelos = [
    { nombre: "ecoTEC Plus", potencia: "24kW", precio: estado === "nuevas" ? 1299 : 699 },
    { nombre: "ecoTEC Pro", potencia: "28kW", precio: estado === "nuevas" ? 1499 : 799 },
    { nombre: "ecoTEC Exclusive", potencia: "32kW", precio: estado === "nuevas" ? 1799 : 999 },
    { nombre: "TurboTEC Plus", potencia: "24kW", precio: estado === "nuevas" ? 1199 : 649 },
    { nombre: "TurboTEC Pro", potencia: "28kW", precio: estado === "nuevas" ? 1399 : 749 }
  ];
  
  return modelos.map((m, i) => ({
    id: `${marca}-${m.nombre.toLowerCase().replace(/\s+/g, "-")}-${m.potencia.replace("kW", "")}`,
    slug: `${m.nombre.toLowerCase().replace(/\s+/g, "-")}-${m.potencia.replace("kW", "kw")}`,
    nombre: `${marcaNombre} ${m.nombre}`,
    potencia: m.potencia,
    precio: m.precio,
    stock: Math.random() > 0.3
  }));
};

export default function CalderasMarcaPage() {
  const params = useParams();
  const estado = params.estado as string;
  const marca = params.marca as string;
  
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const estadoNombre = estado === "nuevas" ? "Nuevas" : "Segunda Mano";
  const modelos = generarModelos(marca, estado);
  
  const colorBtn = estado === "nuevas" ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600";
  const colorGradient = estado === "nuevas" ? "from-orange-400 to-orange-600" : "from-green-500 to-green-700";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Calderas ${marcaNombre} ${estadoNombre}`,
    "description": `Calderas de condensación ${marcaNombre} ${estadoNombre.toLowerCase()} con garantía.`,
    "url": `https://uniclima.es/tienda/calderas/${estado}/${marca}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Calderas", "item": "https://uniclima.es/tienda/calderas" },
        { "@type": "ListItem", "position": 4, "name": estadoNombre, "item": `https://uniclima.es/tienda/calderas/${estado}` },
        { "@type": "ListItem", "position": 5, "name": marcaNombre, "item": `https://uniclima.es/tienda/calderas/${estado}/${marca}` }
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
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Calderas {estadoNombre}</p>
                <h1 className="text-3xl lg:text-4xl font-black">{marcaNombre}</h1>
              </div>
            </div>
            <p className="text-white/90 max-w-2xl">
              {modelos.length} modelos de calderas de condensación {marcaNombre} {estadoNombre.toLowerCase()} disponibles
            </p>
          </div>
          
          {/* Listado de modelos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {modelos.map((modelo) => (
              <Link 
                key={modelo.id}
                href={`/tienda/calderas/${estado}/${marca}/${modelo.slug}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`h-40 bg-gradient-to-br ${colorGradient} opacity-10 flex items-center justify-center`}>
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
                
                <div className="p-4">
                  {modelo.stock ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit mb-2">
                      <Check className="w-3 h-3" /> En stock
                    </span>
                  ) : (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full mb-2 inline-block">
                      Bajo pedido
                    </span>
                  )}
                  
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
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
