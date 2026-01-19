"use client";

/**
 * PÁGINA: Repuestos por Tipo de Máquina
 * /tienda/repuestos/[maquina]
 * Listado de marcas disponibles
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  Wind, 
  Search,
  Package,
  Truck,
  Shield,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const datosMaquinas: Record<string, {
  nombre: string;
  descripcion: string;
  color: string;
  colorClaro: string;
  colorBg: string;
  colorHover: string;
  colorText: string;
  icono: typeof Flame;
  imagen: string;
  marcas: { name: string; slug: string; count: number; logo: string }[];
}> = {
  calderas: {
    nombre: "Calderas",
    descripcion: "Repuestos para calderas de gas, atmosféricas y de condensación",
    color: "from-orange-500 to-orange-600",
    colorClaro: "orange",
    colorBg: "bg-orange-50",
    colorHover: "hover:border-orange-300 hover:bg-orange-50",
    colorText: "text-orange-600",
    icono: Flame,
    imagen: "/images/productos/caldera-condensacion.png",
    marcas: [
      { name: "Vaillant", slug: "vaillant", count: 245, logo: "/images/marcas/vaillant.png" },
      { name: "Junkers", slug: "junkers", count: 198, logo: "/images/marcas/junkers.png" },
      { name: "Saunier Duval", slug: "saunier-duval", count: 176, logo: "/images/marcas/saunier-duval.png" },
      { name: "Ferroli", slug: "ferroli", count: 154, logo: "/images/marcas/ferroli.png" },
      { name: "Baxi", slug: "baxi", count: 132, logo: "/images/marcas/baxi.png" },
      { name: "Ariston", slug: "ariston", count: 121, logo: "/images/marcas/ariston.png" },
      { name: "Beretta", slug: "beretta", count: 98, logo: "/images/marcas/beretta.png" },
      { name: "Cointra", slug: "cointra", count: 87, logo: "/images/marcas/cointra.png" },
      { name: "Roca", slug: "roca", count: 76, logo: "/images/marcas/roca.png" },
      { name: "Hermann", slug: "hermann", count: 65, logo: "/images/marcas/hermann.png" },
      { name: "Chaffoteaux", slug: "chaffoteaux", count: 54, logo: "/images/marcas/chaffoteaux.png" },
      { name: "Immergas", slug: "immergas", count: 43, logo: "/images/marcas/immergas.png" }
    ]
  },
  "aire-acondicionado": {
    nombre: "Aire Acondicionado",
    descripcion: "Repuestos para splits, multisplits y sistemas de climatización",
    color: "from-blue-500 to-blue-600",
    colorClaro: "blue",
    colorBg: "bg-blue-50",
    colorHover: "hover:border-blue-300 hover:bg-blue-50",
    colorText: "text-blue-600",
    icono: Wind,
    imagen: "/images/productos/aire-split.png",
    marcas: [
      { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 156, logo: "/images/marcas/mitsubishi.png" },
      { name: "Daikin", slug: "daikin", count: 143, logo: "/images/marcas/daikin.png" },
      { name: "Fujitsu", slug: "fujitsu", count: 121, logo: "/images/marcas/fujitsu.png" },
      { name: "LG", slug: "lg", count: 98, logo: "/images/marcas/lg.png" },
      { name: "Samsung", slug: "samsung", count: 87, logo: "/images/marcas/samsung.png" },
      { name: "Panasonic", slug: "panasonic", count: 76, logo: "/images/marcas/panasonic.png" },
      { name: "Haier", slug: "haier", count: 54, logo: "/images/marcas/haier.png" },
      { name: "Hisense", slug: "hisense", count: 43, logo: "/images/marcas/hisense.png" }
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
          <div className={`bg-gradient-to-br ${datos.color} rounded-2xl p-4 lg:p-8 text-white mb-6 lg:mb-8`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 bg-white/20 rounded-xl p-2">
                  <Image
                    src={datos.imagen}
                    alt={datos.nombre}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black">
                    Repuestos {datos.nombre}
                  </h1>
                  <p className="text-white/90 text-sm lg:text-base mt-1">
                    {datos.descripcion}
                  </p>
                </div>
              </div>
              
              <div className="w-full lg:w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-4 lg:mt-8">
              <div className="bg-white/10 rounded-xl p-2 lg:p-4 backdrop-blur-sm text-center">
                <div className="text-lg lg:text-2xl font-black">{datos.marcas.reduce((acc, m) => acc + m.count, 0)}+</div>
                <div className="text-white/80 text-xs lg:text-sm">Repuestos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-2 lg:p-4 backdrop-blur-sm text-center">
                <div className="text-lg lg:text-2xl font-black">{datos.marcas.length}</div>
                <div className="text-white/80 text-xs lg:text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-2 lg:p-4 backdrop-blur-sm text-center">
                <div className="text-lg lg:text-2xl font-black">24-48h</div>
                <div className="text-white/80 text-xs lg:text-sm">Envío</div>
              </div>
            </div>
          </div>
          
          {/* Beneficios */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-xs lg:text-sm py-3 lg:py-4 border-y border-gray-200 mb-6 lg:mb-8">
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Package className={`w-4 h-4 lg:w-5 lg:h-5 ${datos.colorText}`} />
              <span>Stock disponible</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Truck className={`w-4 h-4 lg:w-5 lg:h-5 ${datos.colorText}`} />
              <span>Envío 24-48h</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2 text-gray-600">
              <Shield className={`w-4 h-4 lg:w-5 lg:h-5 ${datos.colorText}`} />
              <span>Garantía incluida</span>
            </div>
          </div>
          
          {/* Marcas */}
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Selecciona una marca</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 pb-8 lg:pb-12">
            {marcasFiltradas.map((marca) => (
              <Link 
                key={marca.slug}
                href={`/tienda/repuestos/${maquina}/${marca.slug}`}
                className={`bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 ${datos.colorHover} transition-all duration-300 group`}
              >
                <div className="relative w-full aspect-square mb-2 lg:mb-3">
                  <Image
                    src={marca.logo}
                    alt={marca.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-xs lg:text-sm truncate">{marca.name}</h3>
                  <p className="text-xs text-gray-500">{marca.count} repuestos</p>
                </div>
                <div className={`mt-2 flex items-center justify-center gap-1 text-xs ${datos.colorText} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span>Ver repuestos</span>
                  <ChevronRight className="w-3 h-3" />
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
