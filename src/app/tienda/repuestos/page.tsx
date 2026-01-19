"use client";

/**
 * HUB PRINCIPAL: Repuestos
 * Página de intención de búsqueda "Repuestos"
 * SEO optimizado como entidad de búsqueda
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Flame,
  Snowflake,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home
} from "lucide-react";

// Datos estructurados JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Repuestos de Climatización",
  "description": "Catálogo completo de repuestos para calderas y aire acondicionado. Más de 5.000 referencias con envío en 24-48h.",
  "url": "https://uniclima.es/tienda/repuestos",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://uniclima.es/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Repuestos",
        "item": "https://uniclima.es/tienda/repuestos"
      }
    ]
  }
};

// Categorías principales
const categorias = [
  {
    id: "calderas",
    name: "Calderas",
    description: "Repuestos para calderas de gas, atmosféricas y de condensación",
    icon: Flame,
    color: "orange",
    href: "/tienda/repuestos/calderas",
    stats: {
      productos: 3144,
      marcas: 12,
      familias: 12
    },
    marcasDestacadas: ["Junkers/Bosch", "Vaillant", "Saunier Duval", "Baxi"]
  },
  {
    id: "aire-acondicionado",
    name: "Aire Acondicionado",
    description: "Repuestos para splits, multisplits y sistemas de climatización",
    icon: Snowflake,
    color: "blue",
    href: "/tienda/repuestos/aire-acondicionado",
    stats: {
      productos: 1764,
      marcas: 12,
      familias: 10
    },
    marcasDestacadas: ["Mitsubishi Electric", "Daikin", "Fujitsu", "LG"]
  }
];

export default function RepuestosHub() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-gray-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Repuestos</span>
            </nav>
            
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-black mb-4">
                Repuestos de Climatización
              </h1>
              <p className="text-gray-300 text-lg">
                Catálogo completo de repuestos originales y compatibles para calderas y aire acondicionado. 
                Más de 5.000 referencias con envío en 24-48 horas.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-3xl font-black">5.000+</div>
                <div className="text-gray-400 text-sm">Productos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-3xl font-black">24+</div>
                <div className="text-gray-400 text-sm">Marcas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-3xl font-black">24-48h</div>
                <div className="text-gray-400 text-sm">Entrega</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-3xl font-black">1 año</div>
                <div className="text-gray-400 text-sm">Garantía</div>
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
        
        {/* Categorías principales */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Selecciona el tipo de equipo
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {categorias.map((cat) => {
                const Icon = cat.icon;
                const isOrange = cat.color === "orange";
                
                return (
                  <Link 
                    key={cat.id}
                    href={cat.href}
                    className="group"
                  >
                    <div className={`
                      bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                      transition-all duration-300 border-2 
                      ${isOrange ? 'border-orange-200 hover:border-orange-400' : 'border-blue-200 hover:border-blue-400'}
                    `}>
                      {/* Header */}
                      <div className={`
                        p-6 text-white
                        ${isOrange 
                          ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600' 
                          : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'}
                      `}>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{cat.name}</h3>
                            <p className="text-white/80 text-sm">{cat.description}</p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-xl font-bold">{cat.stats.productos.toLocaleString()}</div>
                            <div className="text-xs text-white/70">Productos</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-xl font-bold">{cat.stats.marcas}</div>
                            <div className="text-xs text-white/70">Marcas</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-xl font-bold">{cat.stats.familias}</div>
                            <div className="text-xs text-white/70">Familias</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Marcas destacadas */}
                      <div className="p-6">
                        <p className="text-sm text-gray-500 mb-3">Marcas destacadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {cat.marcasDestacadas.map((marca) => (
                            <span 
                              key={marca}
                              className={`
                                px-3 py-1 rounded-full text-sm font-medium
                                ${isOrange 
                                  ? 'bg-orange-100 text-orange-700' 
                                  : 'bg-blue-100 text-blue-700'}
                              `}
                            >
                              {marca}
                            </span>
                          ))}
                        </div>
                        
                        <div className={`
                          mt-6 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold
                          transition-all duration-300
                          ${isOrange 
                            ? 'bg-orange-500 text-white group-hover:bg-orange-600' 
                            : 'bg-blue-500 text-white group-hover:bg-blue-600'}
                        `}>
                          Ver repuestos de {cat.name}
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Repuestos de climatización: Tu tienda especializada
            </h2>
            
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en <strong>repuestos de climatización</strong> para 
                calderas y aire acondicionado. Nuestro catálogo incluye más de 5.000 referencias de componentes 
                originales y compatibles para las principales marcas del mercado.
              </p>
              
              <h3>¿Qué repuestos ofrecemos?</h3>
              <p>
                Disponemos de un amplio catálogo organizado por tipo de equipo, marca y familia de piezas:
              </p>
              <ul>
                <li><strong>Repuestos de calderas:</strong> Placas electrónicas, intercambiadores, bombas de circulación, 
                válvulas de gas, sensores, ventiladores y más.</li>
                <li><strong>Repuestos de aire acondicionado:</strong> Placas interiores y exteriores, turbinas, motores, 
                hélices, bombas de condensados y mandos a distancia.</li>
              </ul>
              
              <h3>Marcas compatibles</h3>
              <p>
                Trabajamos con las principales marcas del sector: Junkers/Bosch, Vaillant, Saunier Duval, Baxi, 
                Ferroli, Ariston, Mitsubishi Electric, Daikin, Fujitsu, LG, Samsung y muchas más.
              </p>
              
              <h3>Envío rápido y garantía</h3>
              <p>
                Todos nuestros repuestos incluyen <strong>1 año de garantía</strong> y envío en 24-48 horas. 
                Para pedidos superiores a 120€, el envío es gratuito en toda la península.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
