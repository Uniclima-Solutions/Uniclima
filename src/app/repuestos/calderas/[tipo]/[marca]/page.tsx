import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ChevronRight, Star, ShoppingCart, Check } from 'lucide-react';

// Datos de tipos y marcas
const tiposRepuestos: Record<string, { nombre: string }> = {
  'placas-electronicas': { nombre: 'Placas Electrónicas' },
  'quemadores': { nombre: 'Quemadores' },
  'intercambiadores': { nombre: 'Intercambiadores' },
  'bombas-circulacion': { nombre: 'Bombas de Circulación' },
  'valvulas-gas': { nombre: 'Válvulas de Gas' },
  'extractores': { nombre: 'Extractores' },
  'sensores': { nombre: 'Sensores y Sondas' },
  'valvulas-3-vias': { nombre: 'Válvulas de 3 Vías' },
};

const marcasData: Record<string, { nombre: string }> = {
  'vaillant': { nombre: 'Vaillant' },
  'saunier-duval': { nombre: 'Saunier Duval' },
  'junkers': { nombre: 'Junkers' },
  'baxi': { nombre: 'Baxi' },
  'ferroli': { nombre: 'Ferroli' },
  'viessmann': { nombre: 'Viessmann' },
  'de-dietrich': { nombre: 'De Dietrich' },
  'ariston': { nombre: 'Ariston' },
  'roca': { nombre: 'Roca' },
  'chaffoteaux': { nombre: 'Chaffoteaux' },
  'hermann': { nombre: 'Hermann' },
  'beretta': { nombre: 'Beretta' },
  'honeywell': { nombre: 'Honeywell' },
  'sit': { nombre: 'SIT' },
  'grundfos': { nombre: 'Grundfos' },
  'ebm': { nombre: 'EBM' },
};

// Productos de ejemplo (en producción vendrían de una API/DB)
const generateProducts = (tipo: string, marca: string, tipoNombre: string, marcaNombre: string) => {
  const baseProducts = [
    { ref: '0020132764', modelo: 'ecoTEC plus', precio: 189.90, stock: 12, rating: 4.8 },
    { ref: '0020135129', modelo: 'ecoTEC pro', precio: 156.50, stock: 8, rating: 4.6 },
    { ref: '0020049945', modelo: 'turboTEC', precio: 234.00, stock: 5, rating: 4.9 },
    { ref: '0020107811', modelo: 'atmoTEC', precio: 145.00, stock: 15, rating: 4.5 },
    { ref: '0020038262', modelo: 'ecoMAX', precio: 178.90, stock: 3, rating: 4.7 },
    { ref: '0010028086', modelo: 'ecoFIT', precio: 198.00, stock: 7, rating: 4.4 },
  ];

  return baseProducts.map((p, i) => ({
    id: `${tipo}-${marca}-${i + 1}`,
    nombre: `${tipoNombre} ${marcaNombre} - ${p.modelo}`,
    referencia: p.ref,
    precio: p.precio,
    precioAnterior: Math.round(p.precio * 1.15 * 100) / 100,
    stock: p.stock,
    rating: p.rating,
    reviews: Math.floor(Math.random() * 30) + 5,
    imagen: '/images/products/placeholder-product.png',
    slug: `${tipo}-${marca}-${p.ref.toLowerCase()}`,
    estado: i % 3 === 0 ? 'Reacondicionado' : 'Original',
  }));
};

type Props = {
  params: Promise<{ tipo: string; marca: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tipo, marca } = await params;
  const tipoData = tiposRepuestos[tipo];
  const marcaData = marcasData[marca];
  
  if (!tipoData || !marcaData) {
    return {
      title: 'Repuesto no encontrado | Uniclima',
    };
  }

  return {
    title: `${tipoData.nombre} ${marcaData.nombre} | Repuestos Calderas | Uniclima`,
    description: `Comprar ${tipoData.nombre.toLowerCase()} para calderas ${marcaData.nombre}. Repuestos originales y compatibles con garantía 1 año. Envío 24-48h. Los mejores precios.`,
    keywords: `${tipoData.nombre.toLowerCase()} ${marcaData.nombre.toLowerCase()}, repuestos ${marcaData.nombre.toLowerCase()}, calderas ${marcaData.nombre.toLowerCase()}`,
    openGraph: {
      title: `${tipoData.nombre} ${marcaData.nombre} | Uniclima`,
      description: `Repuestos originales y compatibles para calderas ${marcaData.nombre}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const params: { tipo: string; marca: string }[] = [];
  
  Object.keys(tiposRepuestos).forEach((tipo) => {
    Object.keys(marcasData).forEach((marca) => {
      params.push({ tipo, marca });
    });
  });
  
  return params;
}

export default async function TipoMarcaPage({ params }: Props) {
  const { tipo, marca } = await params;
  const tipoData = tiposRepuestos[tipo];
  const marcaData = marcasData[marca];

  if (!tipoData || !marcaData) {
    notFound();
  }

  const productos = generateProducts(tipo, marca, tipoData.nombre, marcaData.nombre);

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
      {
        '@type': 'ListItem',
        position: 5,
        name: marcaData.nombre,
        item: `https://uniclima.es/repuestos/calderas/${tipo}/${marca}`,
      },
    ],
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${tipoData.nombre} ${marcaData.nombre}`,
    description: `Listado de ${tipoData.nombre.toLowerCase()} para calderas ${marcaData.nombre}`,
    url: `https://uniclima.es/repuestos/calderas/${tipo}/${marca}`,
    numberOfItems: productos.length,
    itemListElement: productos.map((producto, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: producto.nombre,
        sku: producto.referencia,
        offers: {
          '@type': 'Offer',
          price: producto.precio,
          priceCurrency: 'EUR',
          availability: producto.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
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
              <li>
                <Link href={`/repuestos/calderas/${tipo}`} className="text-gray-500 hover:text-primary">
                  {tipoData.nombre}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 font-medium">
                {marcaData.nombre}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {tipoData.nombre} {marcaData.nombre}
            </h1>
            <p className="text-orange-100">
              {productos.length} productos disponibles · Envío 24-48h · Garantía 1 año
            </p>
          </div>
        </section>

        {/* Productos */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
                <Link
                  key={producto.id}
                  href={`/producto/${producto.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                >
                  {/* Imagen */}
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-contain p-4"
                    />
                    {producto.estado === 'Reacondicionado' && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Reacondicionado
                      </span>
                    )}
                    {producto.precioAnterior > producto.precio && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{Math.round((1 - producto.precio / producto.precioAnterior) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">Ref: {producto.referencia}</p>
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {producto.nombre}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{producto.rating}</span>
                      <span className="text-xs text-gray-500">({producto.reviews})</span>
                    </div>

                    {/* Precio */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900">{producto.precio.toFixed(2)}€</span>
                      {producto.precioAnterior > producto.precio && (
                        <span className="text-sm text-gray-500 line-through">{producto.precioAnterior.toFixed(2)}€</span>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      {producto.stock > 0 ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-green-600">En stock ({producto.stock})</span>
                        </>
                      ) : (
                        <span className="text-red-500">Agotado</span>
                      )}
                    </div>

                    {/* Botón */}
                    <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      Añadir al carrito
                    </button>
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
              <h2>{tipoData.nombre} para Calderas {marcaData.nombre}</h2>
              <p>
                En Uniclima disponemos de un amplio catálogo de <strong>{tipoData.nombre.toLowerCase()}</strong> para 
                calderas <strong>{marcaData.nombre}</strong>. Todos nuestros repuestos son originales o compatibles 
                de alta calidad, probados y verificados antes del envío.
              </p>
              <p>
                Ofrecemos <strong>garantía de 1 año</strong> en todos los repuestos y envío en <strong>24-48 horas</strong> 
                a toda la península. Si no encuentras el repuesto que buscas, contacta con nuestro equipo de soporte 
                técnico y te ayudaremos a encontrarlo.
              </p>
              <h3>¿Por qué elegir repuestos {marcaData.nombre} en Uniclima?</h3>
              <ul>
                <li>Repuestos originales y compatibles verificados</li>
                <li>Garantía de 1 año en todos los productos</li>
                <li>Envío rápido en 24-48 horas</li>
                <li>Soporte técnico especializado</li>
                <li>Los mejores precios del mercado</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Otras marcas */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {tipoData.nombre} de otras marcas
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(marcasData)
                .filter(([slug]) => slug !== marca)
                .slice(0, 8)
                .map(([slug, data]) => (
                  <Link
                    key={slug}
                    href={`/repuestos/calderas/${tipo}/${slug}`}
                    className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg px-4 py-2 text-sm transition-colors"
                  >
                    {data.nombre}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
