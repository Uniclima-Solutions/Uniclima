"use client";

/**
 * PÁGINA: Tienda - Hub Principal
 * Centro de comercio electrónico de Uniclima
 * SEO optimizado para "tienda climatización", "comprar calderas", "repuestos HVAC"
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Home,
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
      icon: Wrench,
      color: "from-gray-600 to-gray-800",
      stats: { productos: "5.000+", marcas: "24+" },
      subcategorias: [
        { name: "Calderas", href: "/tienda/repuestos/calderas", icon: Flame, color: "text-orange-500" },
        { name: "Aire Acondicionado", href: "/tienda/repuestos/aire-acondicionado", icon: Wind, color: "text-blue-500" }
      ]
    },
    {
      title: "Calderas Completas",
      description: "Calderas de gas nuevas y reacondicionadas con garantía",
      href: "/tienda/calderas-completas",
      icon: Flame,
      color: "from-orange-500 to-red-600",
      stats: { productos: "150+", marcas: "12" },
      subcategorias: [
        { name: "Nuevas", href: "/tienda/calderas-completas/nuevas", icon: Sparkles, color: "text-green-500" },
        { name: "Reacondicionadas", href: "/tienda/calderas-completas/reacondicionadas", icon: RefreshCw, color: "text-amber-500" }
      ]
    },
    {
      title: "Aires Acondicionados",
      description: "Equipos de climatización nuevos y reacondicionados",
      href: "/tienda/aires-completos",
      icon: Wind,
      color: "from-blue-500 to-indigo-600",
      stats: { productos: "200+", marcas: "15" },
      subcategorias: [
        { name: "Nuevos", href: "/tienda/aires-completos/nuevos", icon: Sparkles, color: "text-green-500" },
        { name: "Reacondicionados", href: "/tienda/aires-completos/reacondicionados", icon: RefreshCw, color: "text-amber-500" }
      ]
    }
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-gray-400 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Tienda</span>
            </nav>
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
                <Package className="w-4 h-4" />
                <span>Más de 5.000 productos disponibles</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black mb-6">
                Tienda Online de <span className="text-orange-400">Climatización</span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8">
                Calderas, aire acondicionado y repuestos. Productos nuevos y reacondicionados 
                con garantía de 1 año y envío en 24-48 horas.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black">5.000+</div>
                  <div className="text-gray-400 text-sm">Productos</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black">24+</div>
                  <div className="text-gray-400 text-sm">Marcas</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black">24-48h</div>
                  <div className="text-gray-400 text-sm">Entrega</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black">1 año</div>
                  <div className="text-gray-400 text-sm">Garantía</div>
                </div>
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
                <span>Productos verificados</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categorías principales */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">¿Qué estás buscando?</h2>
            <p className="text-gray-500 mb-8 text-center">Selecciona una categoría para explorar nuestro catálogo</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {categorias.map((cat) => (
                <div key={cat.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Header con gradiente */}
                  <div className={`bg-gradient-to-br ${cat.color} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <cat.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{cat.title}</h3>
                        <p className="text-white/80 text-sm">{cat.stats.productos} productos</p>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">{cat.description}</p>
                  </div>
                  
                  {/* Subcategorías */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Subcategorías</p>
                    <div className="space-y-2">
                      {cat.subcategorias.map((sub) => (
                        <Link 
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <sub.icon className={`w-5 h-5 ${sub.color}`} />
                            <span className="font-medium text-gray-700">{sub.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </Link>
                      ))}
                    </div>
                    
                    <Link 
                      href={cat.href}
                      className={`mt-4 block w-full text-center py-3 rounded-xl bg-gradient-to-r ${cat.color} text-white font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Ver todo {cat.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contenido SEO */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu tienda de climatización de confianza</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en <strong>climatización</strong> con más de 10 años 
                de experiencia en el sector. Nuestra tienda online ofrece un catálogo completo de productos para profesionales 
                y particulares.
              </p>
              
              <h3>¿Qué encontrarás en nuestra tienda?</h3>
              <ul>
                <li><strong>Repuestos de calderas:</strong> Placas electrónicas, intercambiadores, bombas de circulación, válvulas y más.</li>
                <li><strong>Repuestos de aire acondicionado:</strong> Placas, compresores, motores, turbinas, sensores y mandos.</li>
                <li><strong>Calderas completas:</strong> Equipos nuevos y reacondicionados de las mejores marcas.</li>
                <li><strong>Aires acondicionados:</strong> Splits, multisplits y sistemas de climatización nuevos y reacondicionados.</li>
              </ul>
              
              <h3>¿Por qué comprar en Uniclima?</h3>
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
