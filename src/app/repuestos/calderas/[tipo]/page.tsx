import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ChevronRight } from 'lucide-react';

// Datos de tipos de repuestos
const tiposRepuestos: Record<string, {
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  marcas: { slug: string; nombre: string; productos: number }[];
}> = {
  'placas-electronicas': {
    nombre: 'Placas Electrónicas',
    descripcion: 'Placas de control, potencia y comunicación para calderas',
    descripcionLarga: 'Las placas electrónicas son el cerebro de tu caldera. Controlan todas las funciones del equipo, desde el encendido hasta la regulación de temperatura. En Uniclima disponemos de placas originales y compatibles para todas las marcas.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 45 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 42 },
      { slug: 'junkers', nombre: 'Junkers', productos: 38 },
      { slug: 'baxi', nombre: 'Baxi', productos: 35 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 28 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 24 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 18 },
      { slug: 'ariston', nombre: 'Ariston', productos: 15 },
    ],
  },
  'quemadores': {
    nombre: 'Quemadores',
    descripcion: 'Quemadores de gas y gasóleo para calderas domésticas e industriales',
    descripcionLarga: 'Los quemadores son responsables de la combustión en tu caldera. Un quemador en mal estado puede causar problemas de encendido, consumo excesivo o emisiones incorrectas. Disponemos de quemadores para calderas de gas natural, GLP y gasóleo.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 22 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 20 },
      { slug: 'junkers', nombre: 'Junkers', productos: 18 },
      { slug: 'baxi', nombre: 'Baxi', productos: 16 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 14 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 12 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 14 },
      { slug: 'ariston', nombre: 'Ariston', productos: 12 },
    ],
  },
  'intercambiadores': {
    nombre: 'Intercambiadores',
    descripcion: 'Intercambiadores de placas y bitérmicos para calderas',
    descripcionLarga: 'Los intercambiadores de calor transfieren la energía térmica del circuito primario al agua caliente sanitaria. Disponemos de intercambiadores de placas e intercambiadores bitérmicos para todas las marcas de calderas.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 32 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 28 },
      { slug: 'junkers', nombre: 'Junkers', productos: 26 },
      { slug: 'baxi', nombre: 'Baxi', productos: 24 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 22 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 18 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 20 },
      { slug: 'ariston', nombre: 'Ariston', productos: 16 },
    ],
  },
  'bombas-circulacion': {
    nombre: 'Bombas de Circulación',
    descripcion: 'Bombas para circuitos de calefacción y ACS',
    descripcionLarga: 'Las bombas de circulación impulsan el agua a través del circuito de calefacción. Una bomba defectuosa puede causar falta de calefacción o ruidos en la instalación. Disponemos de bombas originales y compatibles de alta eficiencia.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 18 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 16 },
      { slug: 'junkers', nombre: 'Junkers', productos: 14 },
      { slug: 'baxi', nombre: 'Baxi', productos: 12 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 10 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 8 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 8 },
      { slug: 'grundfos', nombre: 'Grundfos', productos: 8 },
    ],
  },
  'valvulas-gas': {
    nombre: 'Válvulas de Gas',
    descripcion: 'Válvulas de seguridad y regulación de gas',
    descripcionLarga: 'Las válvulas de gas controlan el flujo de combustible hacia el quemador. Son componentes de seguridad críticos que deben funcionar correctamente. Disponemos de válvulas originales Honeywell, SIT y compatibles.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 20 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 18 },
      { slug: 'junkers', nombre: 'Junkers', productos: 16 },
      { slug: 'baxi', nombre: 'Baxi', productos: 14 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 12 },
      { slug: 'honeywell', nombre: 'Honeywell', productos: 16 },
      { slug: 'sit', nombre: 'SIT', productos: 16 },
    ],
  },
  'extractores': {
    nombre: 'Extractores',
    descripcion: 'Ventiladores y extractores de humos para calderas',
    descripcionLarga: 'Los extractores evacuan los gases de combustión de forma segura. Un extractor defectuoso puede provocar bloqueos de seguridad o acumulación de gases. Disponemos de extractores y ventiladores para calderas estancas y atmosféricas.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 14 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 12 },
      { slug: 'junkers', nombre: 'Junkers', productos: 12 },
      { slug: 'baxi', nombre: 'Baxi', productos: 10 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 10 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 8 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 6 },
      { slug: 'ebm', nombre: 'EBM', productos: 6 },
    ],
  },
  'sensores': {
    nombre: 'Sensores y Sondas',
    descripcion: 'Sensores de temperatura, presión y flujo para calderas',
    descripcionLarga: 'Los sensores monitorizan las condiciones de funcionamiento de la caldera. Incluyen sondas de temperatura NTC, sensores de presión, flujostatos y presostatos. Un sensor defectuoso puede causar lecturas incorrectas y mal funcionamiento.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 28 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 24 },
      { slug: 'junkers', nombre: 'Junkers', productos: 22 },
      { slug: 'baxi', nombre: 'Baxi', productos: 20 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 18 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 16 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 14 },
      { slug: 'ariston', nombre: 'Ariston', productos: 14 },
    ],
  },
  'valvulas-3-vias': {
    nombre: 'Válvulas de 3 Vías',
    descripcion: 'Válvulas desviadoras y mezcladoras para calderas',
    descripcionLarga: 'Las válvulas de 3 vías dirigen el flujo de agua entre el circuito de calefacción y el de agua caliente sanitaria. Una válvula defectuosa puede causar problemas de prioridad ACS o falta de calefacción.',
    marcas: [
      { slug: 'vaillant', nombre: 'Vaillant', productos: 16 },
      { slug: 'saunier-duval', nombre: 'Saunier Duval', productos: 14 },
      { slug: 'junkers', nombre: 'Junkers', productos: 12 },
      { slug: 'baxi', nombre: 'Baxi', productos: 12 },
      { slug: 'ferroli', nombre: 'Ferroli', productos: 10 },
      { slug: 'viessmann', nombre: 'Viessmann', productos: 9 },
      { slug: 'de-dietrich', nombre: 'De Dietrich', productos: 8 },
      { slug: 'ariston', nombre: 'Ariston', productos: 8 },
    ],
  },
};

type Props = {
  params: Promise<{ tipo: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tipo } = await params;
  const tipoData = tiposRepuestos[tipo];
  
  if (!tipoData) {
    return {
      title: 'Tipo de repuesto no encontrado | Uniclima',
    };
  }

  return {
    title: `${tipoData.nombre} para Calderas | Repuestos Originales | Uniclima`,
    description: `${tipoData.descripcion}. Repuestos originales y compatibles para todas las marcas: Vaillant, Saunier Duval, Junkers, Baxi. Envío 24-48h.`,
    keywords: `${tipoData.nombre.toLowerCase()}, repuestos calderas, ${tipoData.marcas.map(m => m.nombre.toLowerCase()).join(', ')}`,
    openGraph: {
      title: `${tipoData.nombre} para Calderas | Uniclima`,
      description: tipoData.descripcion,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(tiposRepuestos).map((tipo) => ({
    tipo,
  }));
}

export default async function TipoRepuestoPage({ params }: Props) {
  const { tipo } = await params;
  const tipoData = tiposRepuestos[tipo];

  if (!tipoData) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 4,
        name: tipoData.nombre,
        item: `https://uniclima.es/repuestos/calderas/${tipo}`,
      },
    ],
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tipoData.nombre} para Calderas`,
    description: tipoData.descripcion,
    url: `https://uniclima.es/repuestos/calderas/${tipo}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tipoData.marcas.map((marca, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${tipoData.nombre} ${marca.nombre}`,
        url: `https://uniclima.es/repuestos/calderas/${tipo}/${marca.slug}`,
      })),
    },
  };

  const totalProductos = tipoData.marcas.reduce((sum, m) => sum + m.productos, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <nav className="bg-white border-b" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
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
              <li>
                <Link href="/repuestos/calderas" className="text-gray-500 hover:text-primary">
                  Calderas
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 font-medium">
                {tipoData.nombre}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {tipoData.nombre} para Calderas
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl">
              {tipoData.descripcion}. {totalProductos} productos disponibles con envío en 24-48h.
            </p>
          </div>
        </section>

        {/* Marcas */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {tipoData.nombre} por Marca
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tipoData.marcas.map((marca) => (
                <Link
                  key={marca.slug}
                  href={`/repuestos/calderas/${tipo}/${marca.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 group"
                >
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-500 transition-colors">
                    {marca.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {tipoData.nombre} para calderas {marca.nombre}
                  </p>
                  <p className="text-orange-500 font-medium mt-3">
                    {marca.productos} productos
                  </p>
                  <div className="mt-4 flex items-center text-sm text-orange-500">
                    Ver productos
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-gray max-w-none">
              <h2>Comprar {tipoData.nombre} para Calderas</h2>
              <p>{tipoData.descripcionLarga}</p>
              <p>
                En Uniclima disponemos de <strong>{tipoData.nombre.toLowerCase()}</strong> para las principales 
                marcas del mercado: {tipoData.marcas.map(m => m.nombre).join(', ')}. Todos nuestros repuestos 
                incluyen garantía de 1 año y envío en 24-48 horas a toda la península.
              </p>
              <h3>¿Cómo elegir el repuesto correcto?</h3>
              <p>
                Para encontrar el repuesto exacto que necesitas, te recomendamos buscar por la referencia 
                del fabricante que aparece en la pieza original. Si tienes dudas, nuestro equipo de soporte 
                técnico puede ayudarte a identificar el componente correcto para tu caldera.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
