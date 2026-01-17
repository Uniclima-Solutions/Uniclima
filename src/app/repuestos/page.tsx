import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ChevronRight, Flame, Wind, Wrench, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Repuestos para Calderas y Aire Acondicionado | Uniclima',
  description: 'Encuentra repuestos originales y compatibles para calderas y aire acondicionado. Placas electrónicas, quemadores, intercambiadores y más. Envío 24-48h.',
  keywords: 'repuestos calderas, repuestos aire acondicionado, placas electrónicas, quemadores, intercambiadores, bombas circulación',
  openGraph: {
    title: 'Repuestos para Calderas y Aire Acondicionado | Uniclima',
    description: 'Encuentra repuestos originales y compatibles para calderas y aire acondicionado.',
    type: 'website',
  },
};

// Categorías principales de repuestos
const categorias = [
  {
    id: 'calderas',
    nombre: 'Repuestos de Calderas',
    descripcion: 'Componentes originales y compatibles para calderas de gas, gasóleo y eléctricas',
    icon: Flame,
    color: 'bg-orange-500',
    href: '/repuestos/calderas',
    subcategorias: ['Placas Electrónicas', 'Quemadores', 'Intercambiadores', 'Bombas de Circulación', 'Válvulas de Gas'],
    marcas: ['Vaillant', 'Saunier Duval', 'Junkers', 'Baxi', 'Ferroli', 'Viessmann'],
  },
  {
    id: 'aire-acondicionado',
    nombre: 'Repuestos de Aire Acondicionado',
    descripcion: 'Componentes para splits, multisplits, conductos y sistemas de climatización',
    icon: Wind,
    color: 'bg-blue-500',
    href: '/repuestos/aire-acondicionado',
    subcategorias: ['Placas Interior', 'Placas Compresor', 'Turbinas', 'Motores', 'Mandos a Distancia'],
    marcas: ['Mitsubishi', 'Daikin', 'Fujitsu', 'LG', 'Samsung', 'Panasonic'],
  },
];

// Schema JSON-LD para la página
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Repuestos para Calderas y Aire Acondicionado',
  description: 'Catálogo de repuestos originales y compatibles para sistemas de climatización',
  url: 'https://uniclima.es/repuestos',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: categorias.map((cat, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: cat.nombre,
      url: `https://uniclima.es${cat.href}`,
    })),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://uniclima.es',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Repuestos',
      item: 'https://uniclima.es/repuestos',
    },
  ],
};

export default function RepuestosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <nav className="bg-white border-b" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary flex items-center">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 font-medium">
                Repuestos
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Repuestos para Calderas y Aire Acondicionado
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl">
              Encuentra el repuesto que necesitas entre más de 10.000 referencias. 
              Componentes originales y compatibles con garantía de 1 año.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Wrench className="w-5 h-5" />
                <span>+10.000 referencias</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Settings className="w-5 h-5" />
                <span>Garantía 1 año</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías principales */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Categorías de Repuestos</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {categorias.map((categoria) => {
                const Icon = categoria.icon;
                return (
                  <Link
                    key={categoria.id}
                    href={categoria.href}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${categoria.color} p-4 rounded-xl text-white`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                          {categoria.nombre}
                        </h3>
                        <p className="text-gray-600 mt-1">{categoria.descripcion}</p>
                        
                        {/* Subcategorías */}
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Tipos de repuestos:</p>
                          <div className="flex flex-wrap gap-2">
                            {categoria.subcategorias.map((sub) => (
                              <span
                                key={sub}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Marcas */}
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Marcas disponibles:</p>
                          <div className="flex flex-wrap gap-2">
                            {categoria.marcas.map((marca) => (
                              <span
                                key={marca}
                                className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded font-medium"
                              >
                                {marca}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center text-orange-500 font-medium">
                      Ver todos los repuestos
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">¿Por qué comprar en Uniclima?</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Repuestos Verificados</h3>
                <p className="text-gray-600 text-sm mt-2">Todos los componentes son probados antes del envío</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Envío 24-48h</h3>
                <p className="text-gray-600 text-sm mt-2">Entrega rápida en toda la península</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Garantía 1 Año</h3>
                <p className="text-gray-600 text-sm mt-2">Todos los repuestos con garantía incluida</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Soporte Técnico</h3>
                <p className="text-gray-600 text-sm mt-2">Expertos HVAC a tu disposición</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
