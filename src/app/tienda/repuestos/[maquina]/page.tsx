"use client";

/**
 * PÁGINA: Repuestos por Tipo de Máquina
 * /tienda/repuestos/[maquina]
 * Listado de marcas disponibles
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  Wind, 
  Search,
  Package,
  Truck,
  Shield
} from "lucide-react";
import { useState } from "react";

const datosMaquinas: Record<string, {
  nombre: string;
  descripcion: string;
  color: string;
  colorClaro: string;
  icono: typeof Flame;
  marcas: { name: string; slug: string; count: number }[];
}> = {
  calderas: {
    nombre: "Calderas",
    descripcion: "Repuestos para calderas de gas, atmosféricas y de condensación",
    color: "from-orange-500 to-orange-600",
    colorClaro: "orange",
    icono: Flame,
    marcas: [
      { name: "Vaillant", slug: "vaillant", count: 245 },
      { name: "Junkers", slug: "junkers", count: 198 },
      { name: "Saunier Duval", slug: "saunier-duval", count: 176 },
      { name: "Ferroli", slug: "ferroli", count: 154 },
      { name: "Baxi", slug: "baxi", count: 132 },
      { name: "Ariston", slug: "ariston", count: 121 },
      { name: "Beretta", slug: "beretta", count: 98 },
      { name: "Cointra", slug: "cointra", count: 87 },
      { name: "Roca", slug: "roca", count: 76 },
      { name: "Hermann", slug: "hermann", count: 65 },
      { name: "Chaffoteaux", slug: "chaffoteaux", count: 54 },
      { name: "Immergas", slug: "immergas", count: 43 }
    ]
  },
  "aire-acondicionado": {
    nombre: "Aire Acondicionado",
    descripcion: "Repuestos para splits, multisplits y sistemas de climatización",
    color: "from-blue-500 to-blue-600",
    colorClaro: "blue",
    icono: Wind,
    marcas: [
      { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 156 },
      { name: "Daikin", slug: "daikin", count: 143 },
      { name: "Fujitsu", slug: "fujitsu", count: 121 },
      { name: "LG", slug: "lg", count: 98 },
      { name: "Samsung", slug: "samsung", count: 87 },
      { name: "Panasonic", slug: "panasonic", count: 76 },
      { name: "Haier", slug: "haier", count: 54 },
      { name: "Hisense", slug: "hisense", count: 43 }
    ]
  }
};

export default function RepuestosMaquinaPage() {
  const params = useParams();
  const maquina = params.maquina as string;
  const [busqueda, setBusqueda] = useState("");
  
  const datos = datosMaquinas[maquina];
  
  if (!datos) {
    return (
      <>
        <Header />
        <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
            <Link href="/tienda/repuestos" className="text-orange-600 hover:underline">
              Volver a repuestos
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
    "name": `Repuestos ${datos.nombre}`,
    "description": datos.descripcion,
    "url": `https://uniclima.es/tienda/repuestos/${maquina}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Repuestos", "item": "https://uniclima.es/tienda/repuestos" },
        { "@type": "ListItem", "position": 4, "name": datos.nombre, "item": `https://uniclima.es/tienda/repuestos/${maquina}` }
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
                    Repuestos {datos.nombre}
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
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-2xl font-black">{datos.marcas.reduce((acc, m) => acc + m.count, 0)}+</div>
                <div className="text-white/80 text-sm">Repuestos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-2xl font-black">{datos.marcas.length}</div>
                <div className="text-white/80 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-2xl font-black">24-48h</div>
                <div className="text-white/80 text-sm">Envío</div>
              </div>
            </div>
          </div>
          
          {/* Beneficios */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm py-4 border-y border-gray-200 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Package className={`w-5 h-5 text-${datos.colorClaro}-500`} />
              <span>Stock disponible</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className={`w-5 h-5 text-${datos.colorClaro}-500`} />
              <span>Envío 24-48h</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className={`w-5 h-5 text-${datos.colorClaro}-500`} />
              <span>Garantía incluida</span>
            </div>
          </div>
          
          {/* Marcas */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Selecciona una marca</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-12">
            {marcasFiltradas.map((marca) => (
              <Link 
                key={marca.slug}
                href={`/tienda/repuestos/${maquina}/${marca.slug}`}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-${datos.colorClaro}-200 transition-all duration-300 text-center group`}
              >
                <div className={`w-16 h-16 rounded-full bg-${datos.colorClaro}-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-${datos.colorClaro}-100 transition-colors`}>
                  <Icono className={`w-8 h-8 text-${datos.colorClaro}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{marca.name}</h3>
                <p className="text-sm text-gray-500">{marca.count} repuestos</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
