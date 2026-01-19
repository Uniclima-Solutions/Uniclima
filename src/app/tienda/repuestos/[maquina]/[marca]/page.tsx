"use client";

/**
 * PÁGINA: Repuestos por Marca (Authority Hub)
 * /tienda/repuestos/[maquina]/[marca]
 * Listado de familias de piezas disponibles
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
  Cpu,
  Droplets,
  Thermometer,
  Fan,
  Gauge,
  Zap,
  Settings,
  CircuitBoard
} from "lucide-react";
import { useState } from "react";

const familiasCalderas = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", icon: Cpu, count: 45 },
  { name: "Bombas de Circulación", slug: "bombas-circulacion", icon: Droplets, count: 23 },
  { name: "Intercambiadores", slug: "intercambiadores", icon: Thermometer, count: 18 },
  { name: "Ventiladores", slug: "ventiladores", icon: Fan, count: 15 },
  { name: "Válvulas de Gas", slug: "valvulas-gas", icon: Gauge, count: 21 },
  { name: "Electrodos y Sondas", slug: "electrodos-sondas", icon: Zap, count: 32 },
  { name: "Presostatos", slug: "presostatos", icon: Settings, count: 12 },
  { name: "Motores", slug: "motores", icon: CircuitBoard, count: 8 }
];

const familiasAire = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", icon: Cpu, count: 38 },
  { name: "Motores Ventilador", slug: "motores-ventilador", icon: Fan, count: 25 },
  { name: "Sensores y Sondas", slug: "sensores-sondas", icon: Thermometer, count: 19 },
  { name: "Mandos a Distancia", slug: "mandos-distancia", icon: Settings, count: 22 },
  { name: "Compresores", slug: "compresores", icon: Gauge, count: 14 },
  { name: "Tarjetas de Control", slug: "tarjetas-control", icon: CircuitBoard, count: 16 }
];

const coloresMaquina: Record<string, { gradient: string; claro: string }> = {
  calderas: { gradient: "from-orange-500 to-orange-600", claro: "orange" },
  "aire-acondicionado": { gradient: "from-blue-500 to-blue-600", claro: "blue" }
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
          <div className={`bg-gradient-to-br ${colores.gradient} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icono className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Repuestos {maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas"}</p>
                    <h1 className="text-3xl lg:text-4xl font-black">
                      {marcaNombre}
                    </h1>
                  </div>
                </div>
                <p className="text-white/90 text-lg max-w-2xl">
                  Repuestos originales y compatibles para {marcaNombre}. 
                  Todas las familias de piezas disponibles con garantía.
                </p>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar familia de piezas..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Familias de piezas */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Familias de piezas</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-12">
            {familiasFiltradas.map((familia) => {
              const FamiliaIcono = familia.icon;
              return (
                <Link 
                  key={familia.slug}
                  href={`/tienda/repuestos/${maquina}/${marca}/${familia.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className={`w-14 h-14 rounded-full bg-${colores.claro}-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-${colores.claro}-100 transition-colors`}>
                    <FamiliaIcono className={`w-7 h-7 text-${colores.claro}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{familia.name}</h3>
                  <p className="text-xs text-gray-500">{familia.count} productos</p>
                </Link>
              );
            })}
          </div>
          
          {/* Interlinking Silo - Solo productos de la misma marca */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Más repuestos {marcaNombre}</h3>
            <div className="flex flex-wrap gap-2">
              {familias.slice(0, 6).map((familia) => (
                <Link 
                  key={familia.slug}
                  href={`/tienda/repuestos/${maquina}/${marca}/${familia.slug}`}
                  className={`px-4 py-2 bg-${colores.claro}-50 hover:bg-${colores.claro}-100 text-${colores.claro}-700 rounded-full text-sm font-medium transition-colors`}
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
