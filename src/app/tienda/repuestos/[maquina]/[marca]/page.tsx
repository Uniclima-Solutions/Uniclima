"use client";

/**
 * PÁGINA: Repuestos por Marca (Authority Hub)
 * /tienda/repuestos/[maquina]/[marca]
 * Listado de familias de piezas disponibles
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
  ChevronRight
} from "lucide-react";
import { useState } from "react";

// Familias de piezas de calderas con imágenes de /images/boiler-parts/
const familiasCalderas = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", image: "/images/boiler-parts/placa-electronica.png", count: 45 },
  { name: "Bombas de Circulación", slug: "bombas-circulacion", image: "/images/boiler-parts/bomba-circulacion.png", count: 23 },
  { name: "Intercambiadores", slug: "intercambiadores", image: "/images/boiler-parts/intercambiador-placas.png", count: 18 },
  { name: "Válvulas de Gas", slug: "valvulas-gas", image: "/images/boiler-parts/valvula-gas.png", count: 21 },
  { name: "Ventiladores", slug: "ventiladores", image: "/images/boiler-parts/ventilador.png", count: 15 },
  { name: "Presostatos", slug: "presostatos", image: "/images/boiler-parts/presostato.png", count: 12 },
  { name: "Válvulas 3 Vías", slug: "valvulas-3-vias", image: "/images/boiler-parts/valvula-3-vias.png", count: 18 },
  { name: "Quemadores", slug: "quemadores", image: "/images/boiler-parts/quemador.png", count: 14 },
  { name: "Cuerpos Hidráulicos", slug: "cuerpos-hidraulicos", image: "/images/boiler-parts/cuerpo-hidraulico.png", count: 10 },
  { name: "Sensores de Presión", slug: "sensores-presion", image: "/images/boiler-parts/sensor-presion.png", count: 22 },
  { name: "Displays y Paneles", slug: "displays-paneles", image: "/images/boiler-parts/display-panel.png", count: 16 },
  { name: "Vasos de Expansión", slug: "vasos-expansion", image: "/images/boiler-parts/vaso-expansion.png", count: 8 }
];

// Familias de piezas de aire acondicionado con imágenes de /images/ac-parts/
const familiasAire = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", image: "/images/ac-parts/placa-electronica.png", count: 38 },
  { name: "Motores Ventilador", slug: "motores-ventilador", image: "/images/ac-parts/motor-ventilador.png", count: 25 },
  { name: "Compresores", slug: "compresores", image: "/images/ac-parts/compresor.png", count: 14 },
  { name: "Mandos a Distancia", slug: "mandos-distancia", image: "/images/ac-parts/mando-distancia.png", count: 22 },
  { name: "Sensores y Sondas", slug: "sensores-sondas", image: "/images/ac-parts/placa-electronica.png", count: 19 },
  { name: "Tarjetas de Control", slug: "tarjetas-control", image: "/images/ac-parts/placa-electronica.png", count: 16 }
];

const coloresMaquina: Record<string, { gradient: string; claro: string; hover: string; text: string; bg: string }> = {
  calderas: { 
    gradient: "from-orange-500 to-orange-600", 
    claro: "orange",
    hover: "hover:border-orange-300 hover:shadow-orange-100",
    text: "text-orange-600",
    bg: "bg-orange-50"
  },
  "aire-acondicionado": { 
    gradient: "from-blue-500 to-blue-600", 
    claro: "blue",
    hover: "hover:border-blue-300 hover:shadow-blue-100",
    text: "text-blue-600",
    bg: "bg-blue-50"
  }
};

export default function RepuestosMarcaPage() {
  const params = useParams();
  const maquina = params.maquina as string;
  const marca = params.marca as string;
  const [busqueda, setBusqueda] = useState("");
  
  const colores = coloresMaquina[maquina] || coloresMaquina.calderas;
  const familias = maquina === "aire-acondicionado" ? familiasAire : familiasCalderas;
  const Icono = maquina === "aire-acondicionado" ? Wind : Flame;
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
  const familiasFiltradas = familias.filter(f => 
    f.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Repuestos ${marcaNombre} - ${maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas"}`,
    "description": `Repuestos originales y compatibles para ${marcaNombre}. Placas electrónicas, bombas, válvulas y más.`,
    "url": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Repuestos", "item": "https://uniclima.es/tienda/repuestos" },
        { "@type": "ListItem", "position": 4, "name": maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas", "item": `https://uniclima.es/tienda/repuestos/${maquina}` },
        { "@type": "ListItem", "position": 5, "name": marcaNombre, "item": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}` }
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
          <div className={`bg-gradient-to-br ${colores.gradient} rounded-2xl p-4 lg:p-8 text-white mb-6 lg:mb-8`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icono className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs lg:text-sm">Repuestos {maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas"}</p>
                    <h1 className="text-xl lg:text-3xl font-black">
                      {marcaNombre}
                    </h1>
                  </div>
                </div>
                <p className="text-white/90 text-sm lg:text-lg max-w-2xl">
                  Repuestos originales y compatibles para {marcaNombre}. 
                  Todas las familias de piezas disponibles con garantía.
                </p>
              </div>
              
              <div className="w-full lg:w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar familia de piezas..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Familias de piezas */}
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Familias de piezas</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 pb-8 lg:pb-12">
            {familiasFiltradas.map((familia) => (
              <Link 
                key={familia.slug}
                href={`/tienda/repuestos/${maquina}/${marca}/${familia.slug}`}
                className={`bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-sm border border-gray-100 ${colores.hover} hover:shadow-lg transition-all duration-300 group`}
              >
                {/* Imagen del producto */}
                <div className="relative w-full aspect-square mb-2 lg:mb-3 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={familia.image}
                    alt={familia.name}
                    fill
                    className="object-contain p-2 lg:p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-0.5 lg:mb-1 text-xs lg:text-sm line-clamp-2">{familia.name}</h3>
                  <p className="text-xs text-gray-500">{familia.count} productos</p>
                </div>
                
                <div className={`mt-2 flex items-center justify-center gap-1 text-xs ${colores.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span>Ver productos</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Interlinking Silo - Solo productos de la misma marca */}
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 mb-6 lg:mb-8">
            <h3 className="font-bold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">Más repuestos {marcaNombre}</h3>
            <div className="flex flex-wrap gap-2">
              {familias.slice(0, 6).map((familia) => (
                <Link 
                  key={familia.slug}
                  href={`/tienda/repuestos/${maquina}/${marca}/${familia.slug}`}
                  className={`px-3 lg:px-4 py-1.5 lg:py-2 ${colores.bg} hover:opacity-80 ${colores.text} rounded-full text-xs lg:text-sm font-medium transition-colors`}
                >
                  {familia.name} {marcaNombre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
