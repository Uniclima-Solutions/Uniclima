import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  Home, 
  Truck, 
  Shield, 
  RotateCcw, 
  Phone,
  Share2,
  Heart,
  Check,
  AlertCircle,
  FileText,
  Download,
  ChevronDown,
  Star,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { menuData } from '@/lib/data';
import ProductPageClient from './ProductPageClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Función para generar producto determinista basado en ID
function generateProductFromId(id: string) {
  // Usar el ID para generar datos consistentes
  const numericId = parseInt(id.replace(/\D/g, '')) || 0;
  const seed = numericId;
  
  // Generador pseudoaleatorio determinista
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  // Usar datos de menuData
  const allBrands = menuData.marcas.calderas.map(m => ({ name: m.name, slug: m.href.split('/').pop() || '' }));
  const allPartTypes = menuData.repuestosCalderas.items.map(p => ({ name: p.name, slug: p.href.split('/').pop() || '' }));
  
  const brandIndex = Math.floor(seededRandom(seed) * allBrands.length);
  const partTypeIndex = Math.floor(seededRandom(seed + 1) * allPartTypes.length);
  
  const brand = allBrands[brandIndex];
  const partType = allPartTypes[partTypeIndex];
  
  const basePrice = 50 + seededRandom(seed + 2) * 300;
  const hasDiscount = seededRandom(seed + 3) > 0.6;
  const originalPrice = hasDiscount ? basePrice * (1 + seededRandom(seed + 4) * 0.5) : undefined;
  const inStock = seededRandom(seed + 5) > 0.2;
  const isNew = seededRandom(seed + 6) > 0.7;
  const isBestSeller = seededRandom(seed + 7) > 0.8;
  
  const modelNumber = 1000 + numericId;
  const reference = `REF-${partType.slug.substring(0, 3).toUpperCase()}-${10000 + numericId}`;
  
  // Generar modelos compatibles
  const compatibleModels = [
    `${brand.name} Modelo ${modelNumber}`,
    `${brand.name} Modelo ${modelNumber + 10}`,
    `${brand.name} Modelo ${modelNumber + 20}`,
    `${brand.name} Serie ${Math.floor(modelNumber / 100)}00`,
  ];
  
  // Generar especificaciones técnicas
  const specifications = [
    { label: 'Referencia fabricante', value: reference, group: 'general' as const },
    { label: 'Marca', value: brand.name, group: 'general' as const },
    { label: 'Tipo de componente', value: partType.name, group: 'general' as const },
    { label: 'Estado', value: isNew ? 'Nuevo (Original)' : 'Reacondicionado', group: 'general' as const },
    { label: 'Voltaje', value: '230V / 50Hz', group: 'tecnico' as const },
    { label: 'Potencia', value: `${Math.floor(20 + seededRandom(seed + 10) * 80)}W`, group: 'tecnico' as const },
    { label: 'Peso', value: `${(0.2 + seededRandom(seed + 11) * 2).toFixed(2)} kg`, group: 'dimensiones' as const },
  ];
  
  // Generar problemas que soluciona
  const problemsSolved = [
    `Error de encendido en calderas ${brand.name}`,
    `Fallo en la comunicación del sistema`,
    `Códigos de error relacionados con ${partType.name.toLowerCase()}`,
    `Problemas de regulación de temperatura`,
  ];
  
  // Generar FAQs
  const faqs = [
    {
      question: `¿Es compatible con mi caldera ${brand.name}?`,
      answer: `Este ${partType.name.toLowerCase()} es compatible con los modelos ${brand.name} de la serie ${Math.floor(modelNumber / 100)}00. Consulta la lista de compatibilidad o contacta con nuestro soporte técnico para confirmar la compatibilidad con tu modelo específico.`
    },
    {
      question: '¿Es un repuesto original?',
      answer: isNew 
        ? 'Sí, este es un repuesto original de fábrica, nuevo y sin usar, con todas las garantías del fabricante.'
        : 'Este es un repuesto original reacondicionado. Ha sido probado y verificado por nuestros técnicos especializados antes del envío.'
    },
    {
      question: '¿Tiene garantía?',
      answer: 'Sí, todos nuestros repuestos incluyen 1 año de garantía. Si el producto presenta algún defecto, lo sustituimos sin coste adicional.'
    },
    {
      question: '¿Quién debería instalarlo?',
      answer: 'Recomendamos que la instalación sea realizada por un técnico cualificado. La manipulación incorrecta de componentes de calderas puede ser peligrosa y anular la garantía del equipo.'
    },
    {
      question: '¿Cuánto tarda en llegar?',
      answer: 'Los pedidos realizados antes de las 14:00h se envían el mismo día. El tiempo de entrega es de 24-48 horas en península.'
    }
  ];

  return {
    id,
    name: `${partType.name} ${brand.name} - Modelo ${modelNumber}`,
    reference,
    brand: brand.name,
    brandSlug: brand.slug,
    partType: partType.name,
    partTypeSlug: partType.slug,
    price: Math.round(basePrice * 100) / 100,
    originalPrice: originalPrice ? Math.round(originalPrice * 100) / 100 : undefined,
    image: '/images/products/placeholder-product.webp',
    images: [
      { id: '1', url: '/images/products/placeholder-product.webp', alt: `${partType.name} ${brand.name}`, isPrimary: true },
      { id: '2', url: '/images/products/placeholder-product.webp', alt: `${partType.name} ${brand.name} - Vista 2`, isPrimary: false },
      { id: '3', url: '/images/products/placeholder-product.webp', alt: `${partType.name} ${brand.name} - Detalle`, isPrimary: false },
    ],
    inStock,
    stockQuantity: inStock ? Math.floor(5 + seededRandom(seed + 8) * 20) : 0,
    description: `${partType.name} ${isNew ? 'original' : 'reacondicionado'} para calderas ${brand.name}. Componente probado y verificado, listo para su instalación.`,
    longDescription: `Este ${partType.name.toLowerCase()} es compatible con calderas ${brand.name} de la serie ${Math.floor(modelNumber / 100)}00. ${isNew ? 'Repuesto original de fábrica' : 'Repuesto reacondicionado por técnicos especializados'}, probado y verificado antes del envío. Incluye 1 año de garantía.`,
    category: 'calderas' as const,
    specifications,
    compatibleModels,
    problemsSolved,
    faqs,
    averageRating: 4 + seededRandom(seed + 9),
    reviewCount: Math.floor(5 + seededRandom(seed + 10) * 50),
    sku: `SKU-${reference}`,
    ean: `84${String(numericId).padStart(11, '0')}`,
    weight: 0.2 + seededRandom(seed + 11) * 2,
    warranty: '1 año',
    deliveryTime: '24-48h',
    isNew,
    isBestSeller,
    isFeatured: seededRandom(seed + 12) > 0.9,
  };
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = generateProductFromId(id);
  
  const title = `${product.partType} ${product.brand} ${product.isNew ? 'Original' : 'Reacondicionado'} - Repuesto Caldera | Uniclima`;
  const description = `Compra ${product.partType.toLowerCase()} ${product.brand} para calderas. ${product.isNew ? 'Repuesto original' : 'Repuesto reacondicionado'} con 1 año de garantía. Envío 24-48h. Soporte técnico especializado.`;
  
  return {
    title,
    description,
    keywords: [
      product.partType.toLowerCase(),
      product.brand.toLowerCase(),
      'repuesto caldera',
      'repuesto calderas',
      `${product.partType.toLowerCase()} ${product.brand.toLowerCase()}`,
      'repuesto original',
      'repuesto reacondicionado',
      'hvac',
      'climatización'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
      siteName: 'Uniclima Solutions',
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://uniclima.es/producto/${id}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = generateProductFromId(id);
  
  // Schema Product JSON-LD
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    gtin13: product.ean,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Uniclima Solutions',
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 120 ? 0 : 6.95,
          currency: 'EUR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: product.reviewCount && product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating?.toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
  };
  
  // Schema FAQ JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  
  // Schema BreadcrumbList JSON-LD - Estructura SEO/GEO completa
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
        name: product.partType,
        item: `https://uniclima.es/repuestos/calderas/${product.partTypeSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: product.brand,
        item: `https://uniclima.es/repuestos/calderas/${product.partTypeSlug}/${product.brandSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: product.name,
        item: `https://uniclima.es/producto/${id}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs - Estructura SEO/GEO completa */}
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
                <Link href={`/repuestos/calderas/${product.partTypeSlug}`} className="text-gray-500 hover:text-primary">
                  {product.partType}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link href={`/repuestos/calderas/${product.partTypeSlug}/${product.brandSlug}`} className="text-gray-500 hover:text-primary">
                  {product.brand}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 font-medium truncate max-w-[200px]">
                {product.reference}
              </li>
            </ol>
          </div>
        </nav>
        
        {/* Contenido principal del producto - Client Component */}
        <ProductPageClient product={product} />
        
        {/* H1 SEO optimizado (oculto visualmente pero visible para buscadores) */}
        <h1 className="sr-only">
          {product.partType} {product.brand} - Repuesto {product.isNew ? 'Original' : 'Reacondicionado'} para Calderas
        </h1>
      </main>
      
      <Footer />
    </>
  );
}
