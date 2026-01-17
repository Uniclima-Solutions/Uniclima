import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ChevronRight, Cpu, Flame, RefreshCw, Gauge, Wind, Thermometer, Droplets, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Repuestos de Calderas | Placas, Quemadores, Intercambiadores | Uniclima',
  description: 'Repuestos originales y compatibles para calderas. Placas electrónicas, quemadores, intercambiadores, bombas de circulación. Todas las marcas: Vaillant, Saunier Duval, Junkers, Baxi.',
  keywords: 'repuestos calderas, placas electrónicas calderas, quemadores calderas, intercambiadores calderas, bombas circulación',
  openGraph: {
    title: 'Repuestos de Calderas | Uniclima',
    description: 'Repuestos originales y compatibles para calderas de todas las marcas.',
    type: 'website',
  },
};

// Tipos de repuestos de calderas
const tiposRepuestos = [
  {
    slug: 'placas-electronicas',
    nombre: 'Placas Electrónicas',
    descripcion: 'Placas de control, potencia y comunicación para calderas',
    icon: Cpu,
    color: 'bg-blue-500',
    productos: 245,
  },
  {
    slug: 'quemadores',
    nombre: 'Quemadores',
    descripcion: 'Quemadores de gas y gasóleo para calderas domésticas e industriales',
    icon: Flame,
    color: 'bg-orange-500',
    productos: 128,
  },
  {
    slug: 'intercambiadores',
    nombre: 'Intercambiadores',
    descripcion: 'Intercambiadores de placas y bitérmicos',
    icon: RefreshCw,
    color: 'bg-green-500',
    productos: 186,
  },
  {
    slug: 'bombas-circulacion',
    nombre: 'Bombas de Circulación',
    descripcion: 'Bombas para circuitos de calefacción y ACS',
    icon: Droplets,
    color: 'bg-cyan-500',
    productos: 94,
  },
  {
    slug: 'valvulas-gas',
    nombre: 'Válvulas de Gas',
    descripcion: 'Válvulas de seguridad y regulación de gas',
    icon: Gauge,
    color: 'bg-red-500',
    productos: 112,
  },
  {
    slug: 'extractores',
    nombre: 'Extractores',
    descripcion: 'Ventiladores y extractores de humos',
    icon: Wind,
    color: 'bg-purple-500',
    productos: 78,
  },
  {
    slug: 'sensores',
    nombre: 'Sensores y Sondas',
    descripcion: 'Sensores de temperatura, presión y flujo',
    icon: Thermometer,
    color: 'bg-yellow-500',
    productos: 156,
  },
  {
    slug: 'valvulas-3-vias',
    nombre: 'Válvulas de 3 Vías',
    descripcion: 'Válvulas desviadoras y mezcladoras',
    icon: Settings,
    color: 'bg-indigo-500',
    productos: 89,
  },
];

// Marcas disponibles
const marcas = [
  { slug: 'vaillant', nombre: 'Vaillant', productos: 342 },
  { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 298 },
  { slug: 'junkers', nombre: 'Junkers', productos: 276 },
  { slug: 'baxi', nombre: 'Baxi', productos: 234 },
  { slug: 'ferroli', nombre: 'Ferroli', productos: 198 },
  { slug: 'viessmann', nombre: 'Viessmann', productos: 187 },
  { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 156 },
  { slug: 'ariston', nombre: 'Ariston', productos: 145 },
  { slug: 'roca', nombre: 'Roca', productos: 134 },
  { slug: 'chaffoteaux', nombre: 'Chaffoteaux', productos: 123 },
  { slug: 'hermann', nombre: 'Hermann', productos: 98 },
  { slug: 'beretta', nombre: 'Beretta', productos: 87 },
];

// Schema JSON-LD
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Repuestos de Calderas',
  description: 'Catálogo de repuestos originales y compatibles para calderas',
  url: 'https://uniclima.es/repuestos/calderas',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: tiposRepuestos.map((tipo, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tipo.nombre,
      url: `https://uniclima.es/repuestos/calderas/${tipo.slug}`,
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Calderas',
      item: 'https://uniclima.es/repuestos/calderas',
    },
  ],
};

export default function CalderasPage() {
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
              <li>
                <Link href="/repuestos" className="text-gray-500 hover:text-primary">
                  Repuestos
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 font-medium">
                Calderas
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Repuestos de Calderas
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl">
              Encuentra repuestos originales y compatibles para todas las marcas de calderas. 
              Más de 2.000 referencias disponibles con envío en 24-48h.
            </p>
          </div>
        </section>

        {/* Tipos de repuestos */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Tipos de Repuestos</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiposRepuestos.map((tipo) => {
                const Icon = tipo.icon;
                return (
                  <Link
                    key={tipo.slug}
                    href={`/repuestos/calderas/${tipo.slug}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 group"
                  >
                    <div className={`${tipo.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {tipo.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{tipo.descripcion}</p>
                    <p className="text-xs text-orange-500 font-medium mt-3">{tipo.productos} productos</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marcas */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Repuestos por Marca</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {marcas.map((marca) => (
                <Link
                  key={marca.slug}
                  href={`/repuestos/calderas/todos/${marca.slug}`}
                  className="bg-gray-50 hover:bg-orange-50 rounded-lg p-4 text-center transition-colors group"
                >
                  <p className="font-medium text-gray-900 group-hover:text-orange-500">{marca.nombre}</p>
                  <p className="text-xs text-gray-500 mt-1">{marca.productos} repuestos</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Repuestos de Calderas: Guía Completa
              </h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  En Uniclima disponemos del catálogo más completo de <strong>repuestos para calderas</strong> de España. 
                  Trabajamos con todas las marcas principales del mercado: Vaillant, Saunier Duval, Junkers, Baxi, Ferroli, 
                  Viessmann, De Dietrich, Ariston, Roca, Chaffoteaux, Hermann y Beretta.
                </p>
                <p>
                  Nuestros repuestos incluyen <strong>placas electrónicas</strong>, <strong>quemadores</strong>, 
                  <strong>intercambiadores de calor</strong>, <strong>bombas de circulación</strong>, 
                  <strong>válvulas de gas</strong>, <strong>extractores</strong>, <strong>sensores</strong> y 
                  <strong>válvulas de 3 vías</strong>. Todos los componentes son originales o compatibles de alta calidad, 
                  probados y verificados antes del envío.
                </p>
                <p>
                  Ofrecemos <strong>garantía de 1 año</strong> en todos nuestros repuestos y envío en <strong>24-48 horas</strong> 
                  a toda la península. Nuestro equipo de soporte técnico está disponible para ayudarte a encontrar el 
                  repuesto exacto que necesitas para tu caldera.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
