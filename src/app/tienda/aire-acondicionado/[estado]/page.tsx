"use client";

/**
 * PÁGINA: Aires Acondicionados por Estado
 * /tienda/aire-acondicionado/[estado]
 * Listado de marcas disponibles
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Wind, 
  Sparkles,
  RefreshCw,
  Search,
  Truck,
  Shield
} from "lucide-react";
import { useState } from "react";

const datosEstado: Record<string, {
  nombre: string;
  descripcion: string;
  color: string;
  icono: typeof Sparkles;
  marcas: { name: string; slug: string; count: number }[];
}> = {
  nuevos: {
    nombre: "Aires Nuevos",
    descripcion: "Aires acondicionados nuevos de fábrica con garantía del fabricante",
    color: "from-cyan-500 to-blue-600",
    icono: Sparkles,
    marcas: [
      { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 18 },
      { name: "Daikin", slug: "daikin", count: 15 },
      { name: "Fujitsu", slug: "fujitsu", count: 12 },
      { name: "LG", slug: "lg", count: 10 },
      { name: "Samsung", slug: "samsung", count: 9 },
      { name: "Panasonic", slug: "panasonic", count: 8 }
    ]
  },
  reacondicionados: {
    nombre: "Aires Segunda Mano",
    descripcion: "Aires acondicionados revisados y certificados con garantía Uniclima",
    color: "from-indigo-500 to-purple-600",
    icono: RefreshCw,
    marcas: [
      { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 10 },
      { name: "Daikin", slug: "daikin", count: 8 },
      { name: "Fujitsu", slug: "fujitsu", count: 6 },
      { name: "LG", slug: "lg", count: 5 },
      { name: "Samsung", slug: "samsung", count: 4 },
      { name: "Panasonic", slug: "panasonic", count: 3 }
    ]
  }
};

export default function AireEstadoPage() {
  const params = useParams();
  const estado = params.estado as string;
  const [busqueda, setBusqueda] = useState("");
  
  const datos = datosEstado[estado];
  
  if (!datos) {
    return (
      <>
        <Header />
        <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
            <Link href="/tienda/aire-acondicionado" className="text-blue-600 hover:underline">
              Volver a aires acondicionados
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const Icono = datos.icono;
  const marcasFiltradas = datos.marcas.filter(m => 
    m.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": datos.nombre,
    "description": datos.descripcion,
    "url": `https://uniclima.es/tienda/aire-acondicionado/${estado}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Aire Acondicionado", "item": "https://uniclima.es/tienda/aire-acondicionado" },
        { "@type": "ListItem", "position": 4, "name": estado === "nuevos" ? "Nuevos" : "Segunda Mano", "item": `https://uniclima.es/tienda/aire-acondicionado/${estado}` }
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
          <div className={`bg-gradient-to-br ${datos.color} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icono className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    {datos.nombre}
                  </h1>
                </div>
                <p className="text-white/90 text-lg max-w-2xl">
                  {datos.descripcion}
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
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Beneficios */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm py-4 border-y border-gray-200 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-blue-500" />
              <span>Envío e instalación</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>{estado === "nuevos" ? "Garantía fabricante" : "Garantía Uniclima 1 año"}</span>
            </div>
          </div>
          
          {/* Marcas */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Selecciona una marca</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-12">
            {marcasFiltradas.map((marca) => (
              <Link 
                key={marca.slug}
                href={`/tienda/aire-acondicionado/${estado}/${marca.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                  <Wind className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{marca.name}</h3>
                <p className="text-sm text-gray-500">{marca.count} modelos</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
