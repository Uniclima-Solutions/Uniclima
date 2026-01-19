"use client";

/**
 * PÁGINA: Repuestos por Familia de Piezas
 * /tienda/repuestos/[maquina]/[marca]/[familia]
 * Listado de productos disponibles
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
  ShoppingCart,
  Check,
  Package
} from "lucide-react";
import { useState } from "react";

// Productos de ejemplo (en producción vendrían de una API/DB)
const generarProductos = (maquina: string, marca: string, familia: string) => {
  const baseRef = maquina === "calderas" ? "CAL" : "AIR";
  const marcaCode = marca.substring(0, 3).toUpperCase();
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${baseRef}-${marcaCode}-${familia.substring(0, 3).toUpperCase()}-${10001 + i}`,
    nombre: `${familia.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} ${marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`,
    referencia: `REF-${marcaCode}-${100000 + i}`,
    precio: Math.floor(Math.random() * 200) + 50,
    stock: Math.random() > 0.2,
    compatibilidad: [`Modelo ${String.fromCharCode(65 + i % 5)}`, `Serie ${2020 + i % 4}`]
  }));
};

const coloresMaquina: Record<string, { gradient: string; claro: string; btn: string }> = {
  calderas: { gradient: "from-orange-500 to-orange-600", claro: "orange", btn: "bg-orange-500 hover:bg-orange-600" },
  "aire-acondicionado": { gradient: "from-blue-500 to-blue-600", claro: "blue", btn: "bg-blue-500 hover:bg-blue-600" }
};

export default function RepuestosFamiliaPage() {
  const params = useParams();
  const maquina = params.maquina as string;
  const marca = params.marca as string;
  const familia = params.familia as string;
  const [busqueda, setBusqueda] = useState("");
  
  const colores = coloresMaquina[maquina] || coloresMaquina.calderas;
  const Icono = maquina === "aire-acondicionado" ? Wind : Flame;
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const familiaNombre = familia.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
  const productos = generarProductos(maquina, marca, familia);
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.referencia.toLowerCase().includes(busqueda.toLowerCase())
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${familiaNombre} ${marcaNombre}`,
    "description": `${familiaNombre} para ${marcaNombre}. Repuestos originales y compatibles con garantía.`,
    "url": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}/${familia}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Repuestos", "item": "https://uniclima.es/tienda/repuestos" },
        { "@type": "ListItem", "position": 4, "name": maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas", "item": `https://uniclima.es/tienda/repuestos/${maquina}` },
        { "@type": "ListItem", "position": 5, "name": marcaNombre, "item": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}` },
        { "@type": "ListItem", "position": 6, "name": familiaNombre, "item": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}/${familia}` }
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
                    <p className="text-white/80 text-sm">{marcaNombre}</p>
                    <h1 className="text-2xl lg:text-3xl font-black">
                      {familiaNombre}
                    </h1>
                  </div>
                </div>
                <p className="text-white/90 max-w-2xl">
                  {productos.length} productos disponibles con garantía y envío 24-48h
                </p>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o referencia..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Listado de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
            {productosFiltrados.map((producto) => (
              <Link 
                key={producto.id}
                href={`/tienda/repuestos/${maquina}/${marca}/${familia}/${producto.id.toLowerCase()}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Imagen placeholder */}
                <div className={`h-40 bg-gradient-to-br ${colores.gradient} opacity-10 flex items-center justify-center`}>
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
                
                <div className="p-4">
                  {/* Stock badge */}
                  <div className="flex items-center gap-2 mb-2">
                    {producto.stock ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Check className="w-3 h-3" /> En stock
                      </span>
                    ) : (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        Bajo pedido
                      </span>
                    )}
                  </div>
                  
                  {/* Nombre y referencia */}
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {producto.nombre}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{producto.referencia}</p>
                  
                  {/* Compatibilidad */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {producto.compatibilidad.map((comp, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {comp}
                      </span>
                    ))}
                  </div>
                  
                  {/* Precio y botón */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-gray-900">€{producto.precio}</span>
                      <span className="text-xs text-gray-500 ml-1">+ IVA</span>
                    </div>
                    <button className={`p-2 rounded-xl ${colores.btn} text-white transition-colors`}>
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
