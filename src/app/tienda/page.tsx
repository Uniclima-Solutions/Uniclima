"use client";

/**
 * PÁGINA: Tienda - Hub Principal
 * Centro de comercio electrónico de Uniclima
 * SEO optimizado para "tienda climatización", "comprar calderas", "repuestos HVAC"
 */

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  ChevronRight, 
  Flame, 
  Wind, 
  Package,
  Wrench,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Sparkles,
  RefreshCw
} from "lucide-react";

export default function TiendaPage() {
  // JSON-LD para la tienda
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Uniclima Solutions - Tienda Online",
    "description": "Tienda online de calderas, aire acondicionado y repuestos. Productos nuevos y reacondicionados con garantía.",
    "url": "https://uniclima.es/tienda",
    "image": "https://uniclima.es/images/tienda-og.jpg",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C/ Grafito 12, Nave 14 A",
      "addressLocality": "Torrejón de Ardoz",
      "addressRegion": "Madrid",
      "postalCode": "28850",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4567,
      "longitude": -3.4789
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const categorias = [
    {
      title: "Repuestos",
      description: "Componentes y piezas de recambio para calderas y aire acondicionado",
      href: "/tienda/repuestos",
      image: "/images/productos/placa-electronica.png",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-100",
      stats: { productos: "5.000+", marcas: "24+" },
      subcategorias: [
        { name: "Calderas", href: "/tienda/repuestos/calderas", icon: Flame, color: "text-orange-500", bgColor: "bg-orange-50" },
        { name: "Aire Acondicionado", href: "/tienda/repuestos/aire-acondicionado", icon: Wind, color: "text-blue-500", bgColor: "bg-blue-50" }
      ]
    },
    {
      title: "Calderas",
      description: "Calderas de condensación nuevas y reacondicionadas con garantía",
      href: "/tienda/calderas",
      image: "/images/productos/caldera-condensacion.png",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      stats: { productos: "150+", marcas: "12" },
      subcategorias: [
        { name: "Nuevas", href: "/tienda/calderas/nuevas", icon: Sparkles, color: "text-green-500", bgColor: "bg-green-50" },
        { name: "Segunda Mano", href: "/tienda/calderas/reacondicionadas", icon: RefreshCw, color: "text-amber-500", bgColor: "bg-amber-50" }
      ]
    },
    {
      title: "Aire Acondicionado",
      description: "Equipos de climatización nuevos y reacondicionados",
      href: "/tienda/aire-acondicionado",
      image: "/images/productos/aire-split.png",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      stats: { productos: "200+", marcas: "15" },
      subcategorias: [
        { name: "Nuevos", href: "/tienda/aire-acondicionado/nuevos", icon: Sparkles, color: "text-green-500", bgColor: "bg-green-50" },
        { name: "Segunda Mano", href: "/tienda/aire-acondicionado/reacondicionados", icon: RefreshCw, color: "text-amber-500", bgColor: "bg-amber-50" }
      ]
    }
  ];

  // Marcas destacadas
  const marcasDestacadas = [
    { name: "Vaillant", logo: "/images/marcas/vaillant.png" },
    { name: "Junkers", logo: "/images/marcas/junkers.png" },
    { name: "Daikin", logo: "/images/marcas/daikin.png" },
    { name: "Mitsubishi", logo: "/images/marcas/mitsubishi.png" },
    { name: "Baxi", logo: "/images/marcas/baxi.png" },
    { name: "Ferroli", logo: "/images/marcas/ferroli.png" },
    { name: "Saunier Duval", logo: "/images/marcas/saunier-duval.png" },
    { name: "Fujitsu", logo: "/images/marcas/fujitsu.png" },
  ];

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs />
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
                <Package className="w-4 h-4" />
                <span>Más de 5.000 productos disponibles</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6">
                Tienda Online de <span className="text-orange-400">Climatización</span>
              </h1>
              
              <p className="text-gray-300 text-base lg:text-lg mb-6 lg:mb-8 px-4">
                Calderas, aire acondicionado y repuestos. Productos nuevos y reacondicionados 
                con garantía de 1 año y envío en 24-48 horas.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mt-6 lg:mt-8">
                <div className="bg-white/10 rounded-xl p-3 lg:p-4 backdrop-blur-sm">
                  <div className="text-xl lg:text-2xl font-black">5.000+</div>
                  <div className="text-gray-400 text-xs lg:text-sm">Productos</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 lg:p-4 backdrop-blur-sm">
                  <div className="text-xl lg:text-2xl font-black">24+</div>
                  <div className="text-gray-400 text-xs lg:text-sm">Marcas</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 lg:p-4 backdrop-blur-sm">
                  <div className="text-xl lg:text-2xl font-black">24-48h</div>
                  <div className="text-gray-400 text-xs lg:text-sm">Entrega</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 lg:p-4 backdrop-blur-sm">
                  <div className="text-xl lg:text-2xl font-black">1 año</div>
                  <div className="text-gray-400 text-xs lg:text-sm">Garantía</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-xs lg:text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                <span>Envío gratis +120€</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                <span>Entrega 24-48h</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                <span>Garantía 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                <span>Productos verificados</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categorías principales */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-center">¿Qué estás buscando?</h2>
            <p className="text-gray-500 mb-6 lg:mb-8 text-center text-sm lg:text-base">Selecciona una categoría para explorar nuestro catálogo</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {categorias.map((cat) => (
                <div key={cat.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Header con imagen */}
                  <div className={`relative ${cat.bgColor} p-4 lg:p-6`}>
                    <div className="flex items-center gap-4">
                      {/* Imagen del producto */}
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900">{cat.title}</h3>
                        <p className="text-gray-600 text-xs lg:text-sm mt-1">{cat.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-white/80 px-2 py-1 rounded-full text-gray-700 font-medium">
                            {cat.stats.productos} productos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subcategorías */}
                  <div className="p-3 lg:p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 lg:mb-3">Subcategorías</p>
                    <div className="space-y-2">
                      {cat.subcategorias.map((sub) => (
                        <Link 
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center justify-between p-2.5 lg:p-3 ${sub.bgColor} rounded-xl hover:opacity-80 transition-opacity group`}
                        >
                          <div className="flex items-center gap-2 lg:gap-3">
                            <sub.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${sub.color}`} />
                            <span className="font-medium text-gray-700 text-sm lg:text-base">{sub.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </Link>
                      ))}
                    </div>
                    
                    <Link 
                      href={cat.href}
                      className={`mt-3 lg:mt-4 block w-full text-center py-2.5 lg:py-3 rounded-xl bg-gradient-to-r ${cat.color} text-white font-semibold hover:opacity-90 transition-opacity text-sm lg:text-base`}
                    >
                      Ver todo {cat.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marcas destacadas */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-center">Marcas que trabajamos</h2>
            <p className="text-gray-500 mb-6 lg:mb-8 text-center text-sm lg:text-base">Repuestos originales y compatibles de las mejores marcas</p>
            
            <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
              {marcasDestacadas.map((marca) => (
                <Link 
                  key={marca.name}
                  href={`/tienda/repuestos/calderas/${marca.name.toLowerCase().replace(' ', '-')}`}
                  className="bg-white border border-gray-100 rounded-xl p-3 lg:p-4 hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex items-center justify-center aspect-square"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={marca.logo}
                      alt={`Logo ${marca.name}`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contenido SEO */}
        <section className="py-8 lg:py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Tu tienda de climatización de confianza</h2>
            <div className="prose prose-gray max-w-none text-sm lg:text-base">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en <strong>climatización</strong> con más de 10 años 
                de experiencia en el sector. Nuestra tienda online ofrece un catálogo completo de productos para profesionales 
                y particulares.
              </p>
              
              <h3 className="text-lg lg:text-xl">¿Qué encontrarás en nuestra tienda?</h3>
              <ul>
                <li><strong>Repuestos de calderas:</strong> Placas electrónicas, intercambiadores, bombas de circulación, válvulas y más.</li>
                <li><strong>Repuestos de aire acondicionado:</strong> Placas, compresores, motores, turbinas, sensores y mandos.</li>
                <li><strong>Calderas completas:</strong> Equipos nuevos y reacondicionados de las mejores marcas.</li>
                <li><strong>Aires acondicionados:</strong> Splits, multisplits y sistemas de climatización nuevos y reacondicionados.</li>
              </ul>
              
              <h3 className="text-lg lg:text-xl">¿Por qué comprar en Uniclima?</h3>
              <p>
                Todos nuestros productos incluyen <strong>1 año de garantía</strong> y envío en <strong>24-48 horas</strong>. 
                Para pedidos superiores a 120€, el envío es gratuito en toda la península. Además, contamos con un equipo 
                de soporte técnico especializado para ayudarte a encontrar el repuesto que necesitas.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
