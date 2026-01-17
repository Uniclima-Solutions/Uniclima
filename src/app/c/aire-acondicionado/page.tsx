'use client';

/**
 * Página de Categoría: Repuestos de Aire Acondicionado
 * Muestra todas las subcategorías de repuestos de aire acondicionado
 * Sigue las directrices SEO/GEO de Uniclima Solutions
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb, CollectionSchema, FAQSchema } from '@/components/seo';
import { ChevronRight } from 'lucide-react';

// Categorías de Repuestos de Aire Acondicionado (mismo array que en Home)
const repuestosAire = [
  { id: 1, name: "Placas interior", slug: "placas-interior", image: "/images/categorias/PlacasInterior.png", count: 312 },
  { id: 2, name: "Placas compresor", slug: "placas-compresor", image: "/images/categorias/PlacasCompresor.png", count: 234 },
  { id: 3, name: "Turbinas", slug: "turbinas", image: "/images/categorias/Turbinas.png", count: 187 },
  { id: 4, name: "Motor turbinas", slug: "motor-turbinas", image: "/images/categorias/MotorTurbinas.png", count: 156 },
  { id: 5, name: "Hélice compresor", slug: "helice-compresor", image: "/images/categorias/HeliceCompresor.png", count: 198 },
  { id: 6, name: "Motor hélice compresor", slug: "motor-helice-compresor", image: "/images/categorias/MotorHeliceCompresor.png", count: 276 },
  { id: 7, name: "Bomba condensado conductos", slug: "bomba-condensado-conductos", image: "/images/categorias/BombaCondensadoConductos.png", count: 145 },
  { id: 8, name: "Bomba condensados cassette", slug: "bomba-condensados-cassette", image: "/images/categorias/BombaCondensadosCassette.png", count: 89 },
  { id: 9, name: "Mandos a distancia", slug: "mandos-distancia", image: "/images/categorias/MandosDistanciaSplit.png", count: 167 }
];

// Marcas disponibles
const marcas = [
  { name: "Daikin", slug: "daikin", count: 389 },
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", count: 356 },
  { name: "Fujitsu", slug: "fujitsu", count: 312 },
  { name: "LG", slug: "lg", count: 278 },
  { name: "Samsung", slug: "samsung", count: 245 },
  { name: "Panasonic", slug: "panasonic", count: 198 },
  { name: "Toshiba", slug: "toshiba", count: 167 },
  { name: "Hisense", slug: "hisense", count: 145 },
  { name: "Haier", slug: "haier", count: 123 },
  { name: "Carrier", slug: "carrier", count: 98 },
  { name: "Hitachi", slug: "hitachi", count: 87 },
  { name: "General", slug: "general", count: 76 }
];

// FAQs para SEO
const faqs = [
  {
    question: "¿Qué tipos de repuestos de aire acondicionado tenéis disponibles?",
    answer: "Disponemos de repuestos para unidades interiores y exteriores: placas electrónicas, turbinas, motores de turbina, hélices de compresor, motores de hélice, bombas de condensados para conductos y cassette, mandos a distancia y mucho más."
  },
  {
    question: "¿Los repuestos son compatibles con mi equipo?",
    answer: "Trabajamos con repuestos originales y compatibles para las principales marcas: Daikin, Mitsubishi Electric, Fujitsu, LG, Samsung, Panasonic, Toshiba y más. Si tienes dudas sobre la compatibilidad, contacta con nuestro equipo técnico indicando marca, modelo y referencia de tu equipo."
  },
  {
    question: "¿Tenéis repuestos para splits, multisplits y conductos?",
    answer: "Sí, disponemos de repuestos para todo tipo de sistemas de climatización: splits, multisplits, conductos, cassettes y sistemas VRV/VRF. Nuestro catálogo cubre equipos domésticos y comerciales."
  },
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer: "Los pedidos realizados antes de las 14:00h se envían el mismo día. El tiempo de entrega es de 24-48 horas en península. Envío gratis en pedidos superiores a 120€."
  }
];

// Formas de onda para las tarjetas (estilo azul para aire)
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
];

export default function RepuestosAireAcondicionado() {
  const totalProductos = repuestosAire.reduce((acc, cat) => acc + cat.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Repuestos Aire Acondicionado' }
            ]} 
            className="mb-4" 
          />
          
          {/* Schema JSON-LD */}
          <CollectionSchema 
            collection={{
              name: 'Repuestos de Aire Acondicionado',
              description: 'Encuentra repuestos originales y compatibles para aire acondicionado de todas las marcas. Placas electrónicas, turbinas, motores y más.',
              url: '/c/aire-acondicionado',
              itemCount: totalProductos
            }}
            items={repuestosAire.map((cat, index) => ({
              name: cat.name,
              url: `/c/aire-acondicionado/${cat.slug}`,
              position: index + 1,
              image: cat.image
            }))}
          />
          
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 sm:p-8 mb-6 text-white">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Repuestos de Aire Acondicionado
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
              Encuentra repuestos originales y compatibles para sistemas de climatización. 
              Placas electrónicas, turbinas, motores, bombas de condensados y mucho más.
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {repuestosAire.map((category, index) => {
                const waveIndex = index % waveShapes.length;
                const wavePath = waveShapes[waveIndex];
                
                return (
                  <Link 
                    key={category.id}
                    href={`/c/aire-acondicionado/${category.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative aspect-square">
                      {/* Banner con forma de onda azul */}
                      <div className="absolute bottom-0 left-0 right-0 h-[45%]">
                        <svg 
                          className="absolute inset-0 w-full h-full" 
                          viewBox="0 0 400 100" 
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id={`gradient-aire-${category.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#818cf8" />
                              <stop offset="50%" stopColor="#6366f1" />
                              <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                          </defs>
                          <path d={wavePath} fill={`url(#gradient-aire-${category.slug})`} />
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
                  href={`/c/aire-acondicionado?marca=${marca.slug}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors group"
                >
                  <span className="font-medium text-sm text-gray-700 group-hover:text-blue-600">
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
              Repuestos de Aire Acondicionado – Originales y Compatibles
            </h2>
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> somos especialistas en repuestos para sistemas de 
                aire acondicionado y climatización. Disponemos de un amplio catálogo de componentes para 
                las principales marcas del mercado: Daikin, Mitsubishi Electric, Fujitsu, LG, Samsung, 
                Panasonic y muchas más.
              </p>
              <p>
                Cubrimos todo tipo de sistemas: splits, multisplits, conductos, cassettes y sistemas 
                VRV/VRF tanto para instalaciones domésticas como comerciales. Todos nuestros repuestos 
                están probados y verificados antes del envío.
              </p>
              <p>
                Si no encuentras el repuesto que necesitas o tienes dudas sobre la compatibilidad con tu equipo, 
                nuestro equipo técnico está disponible para ayudarte. Contáctanos indicando la marca, modelo y 
                referencia de tu equipo y te asesoraremos sin compromiso.
              </p>
            </div>
          </section>
          
          {/* FAQs */}
          <FAQSchema 
            faqs={faqs}
            showHTML={true}
            title="Preguntas frecuentes sobre repuestos de aire acondicionado"
          />
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
