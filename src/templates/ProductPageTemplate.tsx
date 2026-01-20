/**
 * PLANTILLA: Página de Producto (Ficha de Producto)
 * 
 * Esta plantilla sigue las directrices SEO/GEO de Uniclima Solutions
 * y utiliza los componentes de diseño existentes.
 * 
 * IMPORTANTE: NO modificar los componentes Header, Footer ni los estilos base.
 * 
 * Estructura de URL recomendada:
 * /p/[slug]/page.tsx
 * 
 * Naming obligatorio del producto:
 * [TIPO DE PRODUCTO] + [MARCA] + [MODELO] – [ATRIBUTO CLAVE]
 * Ejemplo: "Placa electrónica Junkers Cerapur – Repuesto original reacondicionado"
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb, ProductSchema, FAQSchema } from '@/components/seo';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  Shield, 
  RotateCcw, 
  Phone,
  Check,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Info
} from 'lucide-react';

// ============================================
// TIPOS - Adaptar según necesidades
// ============================================

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;           // Formato: [TIPO] + [MARCA] + [MODELO] – [ATRIBUTO]
  reference: string;      // SKU / Referencia
  brand: string;
  partType: string;       // Tipo de repuesto
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  inStock: boolean;
  stockQuantity?: number;
  description: string;    // Descripción corta (3-4 líneas)
  longDescription: string; // Contenido HTML extenso (mín 700 palabras)
  specifications: ProductSpec[];
  compatibleModels: string[];
  warranty: string;
  deliveryTime: string;
  condition: 'new' | 'refurbished';
}

interface ProductPageProps {
  product: Product;
  breadcrumbItems: { label: string; href?: string }[];
  faqs: { question: string; answer: string }[];
  relatedProducts?: { id: string; name: string; image: string; price: number; href: string }[];
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function ProductPageTemplate({
  product,
  breadcrumbItems,
  faqs,
  relatedProducts = []
}: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          
          {/* Schema JSON-LD del producto */}
          <ProductSchema 
            product={{
              name: product.name,
              description: product.description,
              sku: product.reference,
              brand: product.brand,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images[0]?.url || '',
              images: product.images.map(img => img.url),
              inStock: product.inStock,
              condition: product.condition === 'new' ? 'NewCondition' : 'RefurbishedCondition',
              category: product.partType
            }}
          />
          
          {/* Contenido principal del producto */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
              
              {/* Galería de imágenes */}
              <div className="space-y-4">
                {/* Imagen principal */}
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                      -{discount}%
                    </span>
                  )}
                  <Image
                    src={product.images[selectedImage]?.url || '/placeholder.webp'}
                    alt={product.images[selectedImage]?.alt || product.name}
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
                
                {/* Miniaturas */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index 
                            ? 'border-orange-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          width={80}
                          height={80}
                          className="object-contain p-2"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Información del producto */}
              <div className="space-y-6">
                {/* Marca y referencia */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium text-orange-600">{product.brand}</span>
                  <span>|</span>
                  <span>Ref: {product.reference}</span>
                </div>
                
                {/* H1 - Nombre del producto (formato SEO obligatorio) */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                
                {/* Descripción corta */}
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Precio */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price.toFixed(2)}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice.toFixed(2)}€
                    </span>
                  )}
                  <span className="text-sm text-gray-500">IVA incluido</span>
                </div>
                
                {/* Estado del producto */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.condition === 'new' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {product.condition === 'new' ? 'Nuevo Original' : 'Reacondicionado'}
                  </span>
                  {product.condition === 'refurbished' && (
                    <span className="text-sm text-gray-500">con garantía</span>
                  )}
                </div>
                
                {/* Stock */}
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-medium">En stock</span>
                      {product.stockQuantity && product.stockQuantity < 10 && (
                        <span className="text-sm text-orange-600">
                          (Quedan {product.stockQuantity})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-red-600 font-medium">Agotado</span>
                  )}
                </div>
                
                {/* Selector de cantidad y botón de compra */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Añadir al carrito
                  </button>
                </div>
                
                {/* Beneficios */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-orange-500" />
                    <span>Envío gratis +120€</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-orange-500" />
                    <span>{product.warranty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RotateCcw className="w-5 h-5 text-orange-500" />
                    <span>Devolución 14 días</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <span>Soporte técnico</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenido SEO extenso (estructura HTML obligatoria) */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 lg:p-8">
            
            {/* H2: ¿Para qué sirve este repuesto? */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                ¿Para qué sirve este repuesto?
              </h2>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            </section>
            
            {/* H2: Compatibilidad confirmada */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Compatibilidad confirmada
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {product.compatibleModels.map((model, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {model}
                  </li>
                ))}
              </ul>
            </section>
            
            {/* H2: Información técnica relevante */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Información técnica relevante
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-3 px-4 font-medium text-gray-700 w-1/3">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* Mención de marca experta (obligatoria) */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <p className="text-gray-700">
                <strong>Uniclima Solutions</strong> es especialista en repuestos reacondicionados 
                de climatización, probados y verificados antes del envío. Todos nuestros productos 
                incluyen garantía y soporte técnico profesional.
              </p>
            </div>
            
            {/* H2: Preguntas frecuentes */}
            <FAQSchema 
              faqs={faqs}
              showHTML={true}
              title="Preguntas frecuentes"
            />
            
          </div>
          
          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Productos relacionados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((item) => (
                  <Link 
                    key={item.id}
                    href={item.href}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-orange-600">
                        {item.name}
                      </h3>
                      <p className="mt-2 font-bold text-gray-900">
                        {item.price.toFixed(2)}€
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// ============================================
// EJEMPLO DE METADATA (para usar en page.tsx)
// ============================================

/*
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Obtener datos del producto
  const product = await getProduct(params.slug);
  
  return {
    title: `${product.name} | Uniclima Solutions`,
    description: product.description.substring(0, 155),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]?.url],
      type: 'website',
    },
  };
}
*/

// ============================================
// EJEMPLO DE FAQs PARA PRODUCTOS
// ============================================

/*
const productFaqs = [
  {
    question: '¿Es compatible con mi equipo?',
    answer: 'Este repuesto es compatible con los modelos indicados en la sección de compatibilidad. Si tienes dudas sobre tu modelo específico, contacta con nuestro equipo técnico indicando la marca, modelo y referencia de tu equipo.'
  },
  {
    question: '¿Es un repuesto original?',
    answer: 'Disponemos de repuestos originales y compatibles. El tipo de repuesto se indica claramente en la ficha del producto. Los repuestos compatibles ofrecen la misma funcionalidad a un precio más económico.'
  },
  {
    question: '¿Tiene garantía?',
    answer: 'Todos nuestros repuestos incluyen garantía. Los repuestos originales mantienen la garantía del fabricante, y los reacondicionados tienen garantía Uniclima de funcionamiento.'
  },
  {
    question: '¿Quién debería instalarlo?',
    answer: 'Recomendamos que la instalación sea realizada por un técnico cualificado. Si necesitas servicio de instalación, podemos recomendarte profesionales en tu zona.'
  }
];
*/
