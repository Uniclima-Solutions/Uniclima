"use client";

/**
 * PÁGINA DE PRODUCTO: Repuesto específico
 * Incluye JSON-LD Product Schema completo
 * SEO optimizado para "[tipo pieza] [marca] [modelo] [referencia]"
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { 
  ChevronRight, 
  Wind,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Home,
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Heart,
  Share2,
  Phone,
  Mail,
  FileText
} from "lucide-react";
import { useState } from "react";

// Datos de marcas
const marcasData: Record<string, { name: string }> = {
  "junkers-bosch": { name: "Junkers / Bosch" },
  "vaillant": { name: "Vaillant" },
  "saunier-duval": { name: "Saunier Duval" },
  "baxi": { name: "Baxi" },
  "ferroli": { name: "Ferroli" },
  "ariston": { name: "Ariston" },
  "roca": { name: "Roca" },
  "cointra": { name: "Cointra" },
  "chaffoteaux": { name: "Chaffoteaux" },
  "beretta": { name: "Beretta" },
  "immergas": { name: "Immergas" },
  "hermann": { name: "Hermann" }
};

// Datos de familias
const familiasData: Record<string, { name: string }> = {
  "placas-electronicas": { name: "Placas Electrónicas" },
  "intercambiadores": { name: "Intercambiadores" },
  "bombas-circulacion": { name: "Bombas de Circulación" },
  "valvulas-gas": { name: "Válvulas de Gas" },
  "valvulas-3-vias": { name: "Válvulas 3 Vías" },
  "sensores": { name: "Sensores" },
  "ventiladores": { name: "Ventiladores" },
  "electrodos": { name: "Electrodos" },
  "presostatos": { name: "Presostatos" },
  "termostatos": { name: "Termostatos" },
  "juntas": { name: "Juntas" },
  "membranas": { name: "Membranas" }
};

// Generador determinista
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generar datos del producto basado en el slug
function getProductData(marca: string, familia: string, productoSlug: string) {
  const marcaInfo = marcasData[marca] || { name: marca };
  const familiaInfo = familiasData[familia] || { name: familia };
  
  // Extraer número del slug para generar datos consistentes
  const match = productoSlug.match(/modelo-(\d+)/);
  const modelNum = match ? parseInt(match[1]) : 2000;
  const seed = modelNum;
  
  const priceBase = 50 + (seededRandom(seed * 7) * 300);
  const hasDiscount = seededRandom(seed * 11) > 0.6;
  const originalPriceBase = hasDiscount ? priceBase * (1.2 + seededRandom(seed * 13) * 0.5) : undefined;
  
  const refPrefix = familia.slice(0, 3).toUpperCase();
  const refNum = 10000 + Math.floor(seededRandom(seed * 17) * 90000);
  
  // Modelos compatibles
  const modelosCompatibles = [
    `${marcaInfo.name} TurboTEC Pro`,
    `${marcaInfo.name} TurboTEC Plus`,
    `${marcaInfo.name} EcoTEC Pro`,
    `${marcaInfo.name} AtmoTEC Plus`
  ].slice(0, 2 + Math.floor(seededRandom(seed * 31) * 3));
  
  return {
    id: `${marca}-${familia}-${modelNum}`,
    name: `${familiaInfo.name} ${marcaInfo.name} - Modelo ${modelNum}`,
    fullName: `${familiaInfo.name} para Aire Acondicionado ${marcaInfo.name} Modelo ${modelNum}`,
    reference: `${refPrefix}-${refNum}`,
    sku: `${refPrefix}-${refNum}`,
    mpn: `00${refNum}`,
    brand: marcaInfo.name,
    brandSlug: marca,
    family: familiaInfo.name,
    familySlug: familia,
    price: Math.round(priceBase * 100) / 100,
    originalPrice: originalPriceBase ? Math.round(originalPriceBase * 100) / 100 : undefined,
    image: `/images/categorias/PlacasElectronicas.png`,
    images: [
      `/images/categorias/PlacasElectronicas.png`,
      `/images/categorias/PlacasElectronicas.png`,
      `/images/categorias/PlacasElectronicas.png`
    ],
    inStock: seededRandom(seed * 19) > 0.2,
    stockQuantity: Math.floor(seededRandom(seed * 37) * 20) + 1,
    condition: seededRandom(seed * 23) > 0.4 ? 'reacondicionado' : 'nuevo' as 'nuevo' | 'reacondicionado',
    description: `${familiaInfo.name} original/compatible para aire-acondicionado ${marcaInfo.name}. Este componente es esencial para el correcto funcionamiento de tu caldera. Referencia del fabricante: ${refPrefix}-${refNum}.`,
    specifications: [
      { label: "Referencia", value: `${refPrefix}-${refNum}` },
      { label: "Marca compatible", value: marcaInfo.name },
      { label: "Tipo de pieza", value: familiaInfo.name },
      { label: "Condición", value: seededRandom(seed * 23) > 0.4 ? 'Reacondicionado' : 'Nuevo (Original)' },
      { label: "Garantía", value: "1 año" }
    ],
    modelosCompatibles,
    erroresSolucionados: [
      "Error F.28 - Fallo de encendido",
      "Error F.29 - Llama se apaga durante funcionamiento",
      "Error F.75 - Fallo sensor de presión"
    ].slice(0, 1 + Math.floor(seededRandom(seed * 41) * 3))
  };
}

// Productos relacionados (misma marca y familia)
function getRelatedProducts(marca: string, familia: string, currentSlug: string) {
  const marcaInfo = marcasData[marca] || { name: marca };
  const familiaInfo = familiasData[familia] || { name: familia };
  
  return Array.from({ length: 4 }, (_, i) => {
    const modelNum = 2000 + i * 5;
    const seed = modelNum;
    const priceBase = 50 + (seededRandom(seed * 7) * 300);
    const refPrefix = familia.slice(0, 3).toUpperCase();
    const refNum = 10000 + Math.floor(seededRandom(seed * 17) * 90000);
    
    return {
      id: `${marca}-${familia}-${modelNum}`,
      name: `${familiaInfo.name} ${marcaInfo.name} - Modelo ${modelNum}`,
      reference: `${refPrefix}-${refNum}`,
      price: Math.round(priceBase * 100) / 100,
      image: `/images/categorias/PlacasElectronicas.png`,
      slug: `${familia}-${marca}-modelo-${modelNum}-${refPrefix.toLowerCase()}-${refNum}`,
      inStock: seededRandom(seed * 19) > 0.2
    };
  }).filter(p => !currentSlug.includes(`modelo-${p.id.split('-').pop()}`));
}

export default function ProductoPage() {
  const params = useParams();
  const marca = params.marca as string;
  const familia = params.familia as string;
  const productoSlug = params.producto as string;
  
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const producto = getProductData(marca, familia, productoSlug);
  const relacionados = getRelatedProducts(marca, familia, productoSlug);
  
  const discount = producto.originalPrice 
    ? Math.round((1 - producto.price / producto.originalPrice) * 100)
    : 0;
  
  const handleAddToCart = () => {
    if (!producto.inStock || isAdding) return;
    
    setIsAdding(true);
    addItem({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      image: producto.image,
      quantity: cantidad
    });
    toast.success(`${producto.name} añadido al carrito`);
    
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 300);
  };

  // JSON-LD Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": producto.fullName,
    "description": producto.description,
    "sku": producto.sku,
    "mpn": producto.mpn,
    "brand": {
      "@type": "Brand",
      "name": producto.brand
    },
    "model": `Modelo ${productoSlug.match(/modelo-(\d+)/)?.[1] || '2000'}`,
    "category": `Repuestos > Aire Acondicionado > ${producto.brand} > ${producto.family}`,
    "image": producto.images,
    "offers": {
      "@type": "Offer",
      "price": producto.price,
      "priceCurrency": "EUR",
      "availability": producto.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": producto.condition === 'nuevo' 
        ? "https://schema.org/NewCondition" 
        : "https://schema.org/RefurbishedCondition",
      "seller": {
        "@type": "Organization",
        "name": "Uniclima Solutions"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14
      }
    },
    "isRelatedTo": relacionados.map(r => ({
      "@type": "Product",
      "name": r.name,
      "url": `/repuestos/aire-acondicionado/${marca}/${familia}/${r.slug}`
    }))
  };

  // JSON-LD Breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
      { "@type": "ListItem", "position": 2, "name": "Repuestos", "item": "https://uniclima.es/repuestos" },
      { "@type": "ListItem", "position": 3, "name": "Aire Acondicionado", "item": "https://uniclima.es/repuestos/aire-acondicionado" },
      { "@type": "ListItem", "position": 4, "name": producto.brand, "item": `https://uniclima.es/repuestos/aire-acondicionado/${marca}` },
      { "@type": "ListItem", "position": 5, "name": producto.family, "item": `https://uniclima.es/repuestos/aire-acondicionado/${marca}/${familia}` },
      { "@type": "ListItem", "position": 6, "name": producto.reference, "item": `https://uniclima.es/repuestos/aire-acondicionado/${marca}/${familia}/${productoSlug}` }
    ]
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-gray-500 text-sm flex-wrap">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/repuestos" className="hover:text-blue-600 transition-colors">Repuestos</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/repuestos/aire-acondicionado" className="hover:text-blue-600 transition-colors">Aire Acondicionado</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/repuestos/aire-acondicionado/${marca}`} className="hover:text-blue-600 transition-colors">{producto.brand}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/repuestos/aire-acondicionado/${marca}/${familia}`} className="hover:text-blue-600 transition-colors">{producto.family}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{producto.reference}</span>
            </nav>
          </div>
        </div>
        
        {/* Producto */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Imágenes */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-8 aspect-square flex items-center justify-center border border-gray-100">
                  <img
                    src={producto.images[selectedImage]}
                    alt={producto.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  {producto.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg border-2 p-2 transition-colors ${
                        selectedImage === i ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Info */}
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    producto.condition === 'nuevo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {producto.condition === 'nuevo' ? 'Nuevo (Original)' : 'Reacondicionado'}
                  </span>
                  {discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discount}%
                    </span>
                  )}
                </div>
                
                {/* Título */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ref: {producto.reference}</p>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {producto.fullName}
                  </h1>
                </div>
                
                {/* Precio */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-gray-900">{producto.price.toFixed(2)}€</span>
                  {producto.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">{producto.originalPrice.toFixed(2)}€</span>
                  )}
                  <span className="text-sm text-gray-500">IVA incluido</span>
                </div>
                
                {/* Stock */}
                <div className={`flex items-center gap-2 ${producto.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {producto.inStock ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">En stock ({producto.stockQuantity} unidades)</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Agotado</span>
                    </>
                  )}
                </div>
                
                {/* Cantidad y añadir */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{cantidad}</span>
                    <button
                      onClick={() => setCantidad(cantidad + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={!producto.inStock || isAdding}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      !producto.inStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5" />
                        Añadido al carrito
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Añadir al carrito
                      </>
                    )}
                  </button>
                </div>
                
                {/* Beneficios */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span>Envío 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span>Garantía 1 año</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>Repuesto verificado</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>Devolución 14 días</span>
                  </div>
                </div>
                
                {/* Modelos compatibles */}
                {producto.modelosCompatibles.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Modelos compatibles:</h3>
                    <div className="flex flex-wrap gap-2">
                      {producto.modelosCompatibles.map((modelo, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          {modelo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Errores que soluciona */}
                {producto.erroresSolucionados.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Errores que soluciona:</h3>
                    <ul className="space-y-1">
                      {producto.erroresSolucionados.map((error, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Especificaciones */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Especificaciones técnicas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {producto.specifications.map((spec, i) => (
                <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{spec.label}</span>
                  <span className="font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Productos relacionados - Interlinking Silo */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Otros {producto.family} {producto.brand}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relacionados.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/repuestos/aire-acondicionado/${marca}/${familia}/${rel.slug}`}
                  className="bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square mb-3 bg-gray-50 rounded-lg p-2">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{rel.reference}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{rel.name}</h3>
                  <p className="font-bold text-gray-900">{rel.price.toFixed(2)}€</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Otras familias de la misma marca */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Otros repuestos {producto.brand}</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(familiasData)
                .filter(([slug]) => slug !== familia)
                .map(([slug, info]) => (
                  <Link 
                    key={slug}
                    href={`/repuestos/aire-acondicionado/${marca}/${slug}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                  >
                    {info.name}
                  </Link>
                ))
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
