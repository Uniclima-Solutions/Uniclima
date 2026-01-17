'use client';

/**
 * Página de Categoría: Repuestos de Calderas
 * Muestra todas las subcategorías de repuestos de calderas
 * Sigue las directrices SEO/GEO de Uniclima Solutions
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb, CollectionSchema, FAQSchema } from '@/components/seo';
import { ChevronRight } from 'lucide-react';

// Categorías de Repuestos de Calderas (mismo array que en Home)
const repuestosCalderas = [
  { id: 1, name: "Placas electrónicas", slug: "placas-electronicas", image: "/images/categorias/PlacasElectronicas.png", count: 245 },
  { id: 2, name: "Intercambiadores de placas", slug: "intercambiadores-placas", image: "/images/categorias/IntercambiadorDePlacas.png", count: 189 },
  { id: 3, name: "Bombas de circulación", slug: "bombas-circulacion", image: "/images/categorias/Bombas.png", count: 156 },
  { id: 4, name: "Válvulas de gas", slug: "valvulas-gas", image: "/images/categorias/ValvulaGasCondensacion.png", count: 312 },
  { id: 5, name: "Extractores", slug: "extractores", image: "/images/categorias/Extractores.png", count: 178 },
  { id: 6, name: "Intercambiadores bitérmicos", slug: "intercambiadores-bitermicos", image: "/images/categorias/IntercambiadorBitermico.png", count: 98 },
  { id: 7, name: "Cámaras de combustión", slug: "camaras-combustion", image: "/images/categorias/CamarasDeCombustion.png", count: 67 },
  { id: 8, name: "Válvulas de 3 vías", slug: "valvulas-3-vias", image: "/images/categorias/Valvulas3Vias.png", count: 234 },
  { id: 9, name: "Cuerpos hidráulicos", slug: "cuerpos-hidraulicos", image: "/images/categorias/Hidraulicos.png", count: 145 },
  { id: 10, name: "Extractores modulantes", slug: "extractores-modulantes", image: "/images/categorias/ExtractoresModulantes.png", count: 89 },
  { id: 11, name: "Vasos de expansión", slug: "vasos-expansion", image: "/images/categorias/VasoExpansion.png", count: 167 },
  { id: 12, name: "Válvulas de seguridad", slug: "valvulas-seguridad", image: "/images/categorias/ValvulasSeguridad.png", count: 198 },
  { id: 13, name: "Sensores", slug: "sensores", image: "/images/categorias/Sensores.png", count: 276 },
  { id: 14, name: "Flujostatos", slug: "flujostatos", image: "/images/categorias/Flujostato.png", count: 123 },
  { id: 15, name: "Presostatos", slug: "presostatos", image: "/images/categorias/Presostatos.png", count: 187 },
  { id: 16, name: "Captadores de presión", slug: "captadores-presion", image: "/images/categorias/CaptadorPresion.png", count: 156 },
  { id: 17, name: "Transformadores", slug: "transformadores", image: "/images/categorias/Transformadores.png", count: 134 },
  { id: 18, name: "Válvulas de llenado", slug: "valvulas-llenado", image: "/images/categorias/ValvulaLLenado.png", count: 112 },
  { id: 19, name: "Microacumuladores", slug: "microacumuladores", image: "/images/categorias/Microacumuladores.png", count: 78 }
];

// Marcas disponibles
const marcas = [
  { name: "Junkers / Bosch", slug: "junkers-bosch", count: 456 },
  { name: "Vaillant", slug: "vaillant", count: 389 },
  { name: "Saunier Duval", slug: "saunier-duval", count: 312 },
  { name: "Baxi", slug: "baxi", count: 278 },
  { name: "Ferroli", slug: "ferroli", count: 234 },
  { name: "Ariston", slug: "ariston", count: 198 },
  { name: "Roca", slug: "roca", count: 167 },
  { name: "Cointra", slug: "cointra", count: 145 },
  { name: "Chaffoteaux", slug: "chaffoteaux", count: 123 },
  { name: "Beretta", slug: "beretta", count: 98 },
  { name: "Immergas", slug: "immergas", count: 87 },
  { name: "Hermann", slug: "hermann", count: 76 }
];

// FAQs para SEO
const faqs = [
  {
    question: "¿Qué tipos de repuestos de calderas tenéis disponibles?",
    answer: "Disponemos de una amplia gama de repuestos para calderas: placas electrónicas, intercambiadores de placas y bitérmicos, bombas de circulación, válvulas de gas, extractores, cámaras de combustión, válvulas de 3 vías, cuerpos hidráulicos, vasos de expansión, sensores, flujostatos, presostatos y mucho más."
  },
  {
    question: "¿Los repuestos son originales o compatibles?",
    answer: "Trabajamos tanto con repuestos originales de fabricante como con repuestos compatibles de alta calidad. Todos nuestros productos están probados y verificados antes del envío, garantizando su correcto funcionamiento."
  },
  {
    question: "¿Qué marcas de calderas cubrís?",
    answer: "Cubrimos las principales marcas del mercado: Junkers/Bosch, Vaillant, Saunier Duval, Baxi, Ferroli, Ariston, Roca, Cointra, Chaffoteaux, Beretta, Immergas y Hermann, entre otras."
  },
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer: "Los pedidos realizados antes de las 14:00h se envían el mismo día. El tiempo de entrega es de 24-48 horas en península. Envío gratis en pedidos superiores a 120€."
  }
];

// Formas de onda para las tarjetas (mismo estilo que Home)
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
];

export default function RepuestosCalderas() {
  const totalProductos = repuestosCalderas.reduce((acc, cat) => acc + cat.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Repuestos Calderas' }
            ]} 
            className="mb-4" 
          />
          
          {/* Schema JSON-LD */}
          <CollectionSchema 
            collection={{
              name: 'Repuestos de Calderas',
              description: 'Encuentra repuestos originales y compatibles para calderas de todas las marcas. Placas electrónicas, válvulas de gas, intercambiadores y más.',
              url: '/c/calderas',
              itemCount: totalProductos
            }}
            items={repuestosCalderas.map((cat, index) => ({
              name: cat.name,
              url: `/c/calderas/${cat.slug}`,
              position: index + 1,
              image: cat.image
            }))}
          />
          
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 sm:p-8 mb-6 text-white">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Repuestos de Calderas
            </h1>
            <p className="text-orange-100 text-sm sm:text-base max-w-2xl">
              Encuentra repuestos originales y compatibles para calderas de todas las marcas. 
              Placas electrónicas, válvulas de gas, intercambiadores, bombas y mucho más.
            </p>
            <p className="mt-4 text-sm font-medium">
              {totalProductos.toLocaleString()} productos disponibles
            </p>
          </div>
          
          {/* Grid de categorías */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Categorías de repuestos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {repuestosCalderas.map((category, index) => {
                const waveIndex = index % waveShapes.length;
                const wavePath = waveShapes[waveIndex];
                
                return (
                  <Link 
                    key={category.id}
                    href={`/c/calderas/${category.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative aspect-square">
                      {/* Banner con forma de onda */}
                      <div className="absolute bottom-0 left-0 right-0 h-[45%]">
                        <svg 
                          className="absolute inset-0 w-full h-full" 
                          viewBox="0 0 400 100" 
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id={`gradient-${category.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ffab66" />
                              <stop offset="50%" stopColor="#ff6900" />
                              <stop offset="100%" stopColor="#cc5500" />
                            </linearGradient>
                          </defs>
                          <path d={wavePath} fill={`url(#gradient-${category.slug})`} />
                        </svg>
                      </div>
                      
                      {/* Imagen */}
                      <div className="absolute inset-0 flex items-center justify-center p-2 z-10">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain drop-shadow-lg max-w-[85%] max-h-[80%] group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Texto */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 pb-3 px-2">
                        <h3 className="text-white font-bold text-xs sm:text-sm leading-tight text-center drop-shadow-lg uppercase tracking-wide">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {category.count} productos
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
          
          {/* Marcas */}
          <section className="mb-12 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Buscar por marca
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {marcas.map((marca) => (
                <Link
                  key={marca.slug}
                  href={`/c/calderas?marca=${marca.slug}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-gray-200 transition-colors group"
                >
                  <span className="font-medium text-sm text-gray-700 group-hover:text-orange-600">
                    {marca.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {marca.count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Contenido SEO */}
          <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Repuestos de Calderas – Originales y Compatibles
            </h2>
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en repuestos para calderas de gas, 
                tanto murales como de pie. Disponemos de un amplio catálogo de componentes para las principales 
                marcas del mercado: Junkers, Vaillant, Saunier Duval, Baxi, Ferroli, Ariston y muchas más.
              </p>
              <p>
                Todos nuestros repuestos están probados y verificados antes del envío, garantizando su correcto 
                funcionamiento. Trabajamos con repuestos originales de fabricante y con alternativas compatibles 
                de alta calidad que ofrecen el mismo rendimiento a un precio más económico.
              </p>
              <p>
                Si no encuentras el repuesto que necesitas o tienes dudas sobre la compatibilidad con tu equipo, 
                nuestro equipo técnico está disponible para ayudarte. Contáctanos indicando la marca, modelo y 
                referencia de tu caldera y te asesoraremos sin compromiso.
              </p>
            </div>
          </section>
          
          {/* FAQs */}
          <FAQSchema 
            faqs={faqs}
            showHTML={true}
            title="Preguntas frecuentes sobre repuestos de calderas"
          />
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
