"use client";

/**
 * PÁGINA: Repuestos de Calderas por Marca
 * Authority Hub de marca - Lista de familias de piezas
 * SEO optimizado para "repuestos calderas [marca]"
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Flame,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home,
  Search
} from "lucide-react";
import { useState } from "react";

// Datos de marcas
const marcasData: Record<string, { name: string; description: string }> = {
  "junkers-bosch": { name: "Junkers / Bosch", description: "Repuestos originales y compatibles para calderas Junkers y Bosch" },
  "vaillant": { name: "Vaillant", description: "Repuestos originales y compatibles para calderas Vaillant" },
  "saunier-duval": { name: "Saunier Duval", description: "Repuestos originales y compatibles para calderas Saunier Duval" },
  "baxi": { name: "Baxi", description: "Repuestos originales y compatibles para calderas Baxi" },
  "ferroli": { name: "Ferroli", description: "Repuestos originales y compatibles para calderas Ferroli" },
  "ariston": { name: "Ariston", description: "Repuestos originales y compatibles para calderas Ariston" },
  "roca": { name: "Roca", description: "Repuestos originales y compatibles para calderas Roca" },
  "cointra": { name: "Cointra", description: "Repuestos originales y compatibles para calderas Cointra" },
  "chaffoteaux": { name: "Chaffoteaux", description: "Repuestos originales y compatibles para calderas Chaffoteaux" },
  "beretta": { name: "Beretta", description: "Repuestos originales y compatibles para calderas Beretta" },
  "immergas": { name: "Immergas", description: "Repuestos originales y compatibles para calderas Immergas" },
  "hermann": { name: "Hermann", description: "Repuestos originales y compatibles para calderas Hermann" }
};

// Familias de piezas con conteo por marca (simulado)
const familiasPiezas = [
  { name: "Placas Electrónicas", slug: "placas-electronicas", count: 45, image: "/images/categorias/PlacasElectronicas.png" },
  { name: "Intercambiadores", slug: "intercambiadores", count: 32, image: "/images/categorias/Intercambiadores.png" },
  { name: "Bombas de Circulación", slug: "bombas-circulacion", count: 28, image: "/images/categorias/Bombas.png" },
  { name: "Válvulas de Gas", slug: "valvulas-gas", count: 56, image: "/images/categorias/ValvulasGas.png" },
  { name: "Válvulas 3 Vías", slug: "valvulas-3-vias", count: 34, image: "/images/categorias/Valvulas3Vias.png" },
  { name: "Sensores", slug: "sensores", count: 48, image: "/images/categorias/Sensores.png" },
  { name: "Ventiladores", slug: "ventiladores", count: 23, image: "/images/categorias/Ventiladores.png" },
  { name: "Electrodos", slug: "electrodos", count: 15, image: "/images/categorias/Electrodos.png" },
  { name: "Presostatos", slug: "presostatos", count: 12, image: "/images/categorias/Presostatos.png" },
  { name: "Termostatos", slug: "termostatos", count: 21, image: "/images/categorias/Termostatos.png" },
  { name: "Juntas", slug: "juntas", count: 18, image: "/images/categorias/Juntas.png" },
  { name: "Membranas", slug: "membranas", count: 14, image: "/images/categorias/Membranas.png" }
];

// Formas de onda para las tarjetas
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
];

export default function RepuestosCaldераsMarca() {
  const params = useParams();
  const marca = params.marca as string;
  const [busqueda, setBusqueda] = useState("");
  
  const marcaInfo = marcasData[marca] || { name: marca, description: "" };
  const totalProductos = familiasPiezas.reduce((acc, f) => acc + f.count, 0);
  
  const familiasFiltradas = familiasPiezas.filter(f => 
    f.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  // JSON-LD dinámico
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Repuestos ${marcaInfo.name} para Calderas`,
    "description": marcaInfo.description,
    "url": `https://uniclima.es/tienda/repuestos/calderas/${marca}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" }, { "@type": "ListItem", "position": 3, "name": "Repuestos", "item": "https://uniclima.es/tienda/repuestos" },
        { "@type": "ListItem", "position": 3, "name": "Calderas", "item": "https://uniclima.es/tienda/repuestos/calderas" },
        { "@type": "ListItem", "position": 4, "name": marcaInfo.name, "item": `https://uniclima.es/tienda/repuestos/calderas/${marca}` }
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tienda/repuestos" className="hover:text-white transition-colors">Repuestos</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tienda/repuestos/calderas" className="hover:text-white transition-colors">Calderas</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{marcaInfo.name}</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black">
                    Repuestos {marcaInfo.name}
                  </h1>
                </div>
                <p className="text-orange-100 text-lg max-w-2xl">
                  {marcaInfo.description}. Más de {totalProductos} productos con envío en 24-48h.
                </p>
              </div>
              
              <div className="w-full lg:w-96">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar tipo de pieza..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{totalProductos}</div>
                <div className="text-orange-200 text-sm">Productos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">{familiasPiezas.length}</div>
                <div className="text-orange-200 text-sm">Familias</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">24-48h</div>
                <div className="text-orange-200 text-sm">Entrega</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black">1 año</div>
                <div className="text-orange-200 text-sm">Garantía</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-5 h-5 text-orange-500" />
                <span>Envío gratis +120€</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Entrega 24-48h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-orange-500" />
                <span>Garantía 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span>Repuestos verificados</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Familias de piezas */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecciona el tipo de pieza</h2>
            <p className="text-gray-500 mb-6">Repuestos {marcaInfo.name} organizados por familia de componentes</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {familiasFiltradas.map((familia, index) => {
                const waveIndex = index % waveShapes.length;
                const wavePath = waveShapes[waveIndex];
                
                return (
                  <Link 
                    key={familia.slug}
                    href={`/tienda/repuestos/calderas/${marca}/${familia.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative aspect-square border border-gray-100">
                      {/* Wave background */}
                      <div className="absolute bottom-0 left-0 right-0 h-[42%]">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id={`gradient-${familia.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fb923c" />
                              <stop offset="50%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                          </defs>
                          <path d={wavePath} fill={`url(#gradient-${familia.slug})`} />
                        </svg>
                      </div>
                      
                      {/* Image */}
                      <div className="absolute inset-0 flex items-center justify-center p-2 z-10">
                        <img
                          src={familia.image}
                          alt={familia.name}
                          className="w-full h-full object-contain drop-shadow-xl max-w-[88%] max-h-[78%] group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Name */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 pb-3 px-2">
                        <h3 className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center drop-shadow-lg uppercase tracking-wide">
                          {familia.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 text-center mt-1.5 font-medium">
                      {familia.count} productos
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Interlinking Silo - Otras marcas de calderas */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Otras marcas de calderas</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(marcasData)
                .filter(([slug]) => slug !== marca)
                .map(([slug, info]) => (
                  <Link 
                    key={slug}
                    href={`/tienda/repuestos/calderas/${slug}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {info.name}
                  </Link>
                ))
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
