'use client';

/**
 * Página dinámica de marca
 * Muestra todos los productos de una marca específica:
 * - Calderas completas
 * - Repuestos de calderas
 * - Aires acondicionados
 * - Repuestos de aire acondicionado
 */

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
// Marcas de calderas
const boilerBrands = [
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.webp" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.webp" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.webp" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.webp" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.webp" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.webp" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.webp" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.webp" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.webp" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.webp" },
  { name: "Wolf", slug: "wolf", logo: "/images/marcas/wolf.webp" },
  { name: "Bosch", slug: "bosch", logo: "/images/marcas/bosch.webp" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.webp" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.webp" },
  { name: "Tifell", slug: "tifell", logo: "/images/marcas/tifell.webp" },
  { name: "Manaut", slug: "manaut", logo: "/images/marcas/manaut.webp" },
  { name: "Domusa", slug: "domusa", logo: "/images/marcas/domusa.webp" },
  { name: "Fagor", slug: "fagor", logo: "/images/marcas/fagor.webp" },
];

// Marcas de aire acondicionado
const acBrands = [
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.webp" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.webp" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.webp" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.webp" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.webp" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.webp" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.webp" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.webp" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.webp" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.webp" },
  { name: "Midea", slug: "midea", logo: "/images/marcas/midea.webp" },
  { name: "Daitsu", slug: "daitsu", logo: "/images/marcas/daitsu.webp" },
];

// Todas las marcas combinadas
const allBrands = [...boilerBrands, ...acBrands];

interface Brand {
  name: string;
  slug: string;
  logo: string;
}
import { ShoppingCart, Flame, Wind, Wrench, Package, ArrowRight, Phone, Mail } from 'lucide-react';

// Datos de ejemplo de productos por marca (en producción vendrían de la API/BD)
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'caldera' | 'repuesto-caldera' | 'aire' | 'repuesto-aire';
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Función para generar productos de ejemplo por marca
function getProductsByBrand(brandSlug: string): Product[] {
  const brandName = allBrands.find(b => b.slug === brandSlug)?.name || brandSlug;
  const isBoilerBrand = boilerBrands.some(b => b.slug === brandSlug);
  const isAcBrand = acBrands.some(b => b.slug === brandSlug);
  
  const products: Product[] = [];
  
  // Calderas completas (solo para marcas de calderas)
  if (isBoilerBrand) {
    products.push(
      {
        id: `${brandSlug}-caldera-1`,
        name: `Caldera ${brandName} Condensación 24kW`,
        slug: `caldera-${brandSlug}-condensacion-24kw`,
        price: 1299.00,
        originalPrice: 1499.00,
        image: `/images/productos/caldera-${brandSlug}.webp`,
        category: 'caldera',
        inStock: true,
        isBestSeller: true,
      },
      {
        id: `${brandSlug}-caldera-2`,
        name: `Caldera ${brandName} Estanca 28kW`,
        slug: `caldera-${brandSlug}-estanca-28kw`,
        price: 899.00,
        image: `/images/productos/caldera-${brandSlug}-2.webp`,
        category: 'caldera',
        inStock: true,
      }
    );
    
    // Repuestos de calderas
    products.push(
      {
        id: `${brandSlug}-rep-1`,
        name: `Placa Electrónica ${brandName}`,
        slug: `placa-electronica-${brandSlug}`,
        price: 189.00,
        image: `/images/productos/placa-${brandSlug}.webp`,
        category: 'repuesto-caldera',
        inStock: true,
        isNew: true,
      },
      {
        id: `${brandSlug}-rep-2`,
        name: `Intercambiador ${brandName}`,
        slug: `intercambiador-${brandSlug}`,
        price: 145.00,
        originalPrice: 175.00,
        image: `/images/productos/intercambiador-${brandSlug}.webp`,
        category: 'repuesto-caldera',
        inStock: true,
      },
      {
        id: `${brandSlug}-rep-3`,
        name: `Válvula de Gas ${brandName}`,
        slug: `valvula-gas-${brandSlug}`,
        price: 125.00,
        image: `/images/productos/valvula-${brandSlug}.webp`,
        category: 'repuesto-caldera',
        inStock: false,
      },
      {
        id: `${brandSlug}-rep-4`,
        name: `Bomba Circuladora ${brandName}`,
        slug: `bomba-circuladora-${brandSlug}`,
        price: 95.00,
        image: `/images/productos/bomba-${brandSlug}.webp`,
        category: 'repuesto-caldera',
        inStock: true,
      },
      {
        id: `${brandSlug}-rep-5`,
        name: `Electrodo Encendido ${brandName}`,
        slug: `electrodo-encendido-${brandSlug}`,
        price: 28.00,
        image: `/images/productos/electrodo-${brandSlug}.webp`,
        category: 'repuesto-caldera',
        inStock: true,
      },
      {
        id: `${brandSlug}-rep-6`,
        name: `Presostato ${brandName}`,
        slug: `presostato-${brandSlug}`,
        price: 45.00,
        image: `/images/productos/presostato-${brandSlug}.webp`,
        category: 'repuesto-caldera',
        inStock: true,
      }
    );
  }
  
  // Aires acondicionados (solo para marcas de AC)
  if (isAcBrand) {
    products.push(
      {
        id: `${brandSlug}-aire-1`,
        name: `Split ${brandName} Inverter 3000 Frigorías`,
        slug: `split-${brandSlug}-inverter-3000`,
        price: 599.00,
        originalPrice: 749.00,
        image: `/images/productos/split-${brandSlug}.webp`,
        category: 'aire',
        inStock: true,
        isBestSeller: true,
      },
      {
        id: `${brandSlug}-aire-2`,
        name: `Split ${brandName} Inverter 4500 Frigorías`,
        slug: `split-${brandSlug}-inverter-4500`,
        price: 799.00,
        image: `/images/productos/split-${brandSlug}-2.webp`,
        category: 'aire',
        inStock: true,
        isNew: true,
      }
    );
    
    // Repuestos de aire acondicionado
    products.push(
      {
        id: `${brandSlug}-rep-aire-1`,
        name: `Placa Electrónica ${brandName} Split`,
        slug: `placa-electronica-${brandSlug}-split`,
        price: 165.00,
        image: `/images/productos/placa-aire-${brandSlug}.webp`,
        category: 'repuesto-aire',
        inStock: true,
      },
      {
        id: `${brandSlug}-rep-aire-2`,
        name: `Motor Ventilador ${brandName}`,
        slug: `motor-ventilador-${brandSlug}`,
        price: 89.00,
        image: `/images/productos/motor-${brandSlug}.webp`,
        category: 'repuesto-aire',
        inStock: true,
      },
      {
        id: `${brandSlug}-rep-aire-3`,
        name: `Mando a Distancia ${brandName}`,
        slug: `mando-distancia-${brandSlug}`,
        price: 35.00,
        image: `/images/productos/mando-${brandSlug}.webp`,
        category: 'repuesto-aire',
        inStock: true,
      },
      {
        id: `${brandSlug}-rep-aire-4`,
        name: `Filtro Aire ${brandName}`,
        slug: `filtro-aire-${brandSlug}`,
        price: 18.00,
        image: `/images/productos/filtro-${brandSlug}.webp`,
        category: 'repuesto-aire',
        inStock: true,
      }
    );
  }
  
  return products;
}

// Componente de tarjeta de producto
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 overflow-hidden group">
      {/* Imagen */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-product.webp';
          }}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NUEVO</span>
          )}
          {product.isBestSeller && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">TOP VENTAS</span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded">Agotado</span>
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 min-h-[40px]">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-orange-600">{product.price.toFixed(2)}€</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice.toFixed(2)}€</span>
          )}
        </div>
        <button
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            product.inStock
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Añadir al carrito' : 'Sin stock'}
        </button>
      </div>
    </div>
  );
}

// Componente de sección de productos
function ProductSection({ 
  title, 
  icon: Icon, 
  products, 
  bgColor = 'bg-white' 
}: { 
  title: string; 
  icon: React.ElementType; 
  products: Product[]; 
  bgColor?: string;
}) {
  if (products.length === 0) return null;
  
  return (
    <section className={`py-8 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">({products.length} productos)</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MarcaPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Buscar la marca
  const brand = allBrands.find(b => b.slug === slug);
  const isBoilerBrand = boilerBrands.some(b => b.slug === slug);
  const isAcBrand = acBrands.some(b => b.slug === slug);
  
  // Si no existe la marca, mostrar 404
  if (!brand) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Marca no encontrada</h1>
            <p className="text-gray-600 mb-6">La marca que buscas no existe en nuestro catálogo.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
              Volver al inicio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Obtener productos de la marca
  const products = getProductsByBrand(slug);
  
  // Filtrar por categoría
  const calderas = products.filter(p => p.category === 'caldera');
  const repuestosCalderas = products.filter(p => p.category === 'repuesto-caldera');
  const aires = products.filter(p => p.category === 'aire');
  const repuestosAires = products.filter(p => p.category === 'repuesto-aire');
  
  // Breadcrumbs personalizados
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Marcas', href: '/marcas' },
    { label: brand.name, href: `/marca/${slug}` },
  ];
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbItems.map((item, index) => (
                <span key={item.href} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">/</span>}
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="text-gray-600 font-medium">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="text-orange-600 hover:underline">
                      {item.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Hero de la marca */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Logo de la marca */}
              <div className="w-40 h-40 bg-white rounded-2xl p-6 flex items-center justify-center shadow-xl">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-brand.webp';
                  }}
                />
              </div>
              
              {/* Info de la marca */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  Repuestos y productos {brand.name}
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  {isBoilerBrand && isAcBrand 
                    ? `Encuentra calderas, aires acondicionados y repuestos originales y compatibles de ${brand.name}`
                    : isBoilerBrand 
                      ? `Encuentra calderas y repuestos originales y compatibles de ${brand.name}`
                      : `Encuentra aires acondicionados y repuestos originales y compatibles de ${brand.name}`
                  }
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {isBoilerBrand && (
                    <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm">
                      <Flame className="w-4 h-4" />
                      Calderas y calefacción
                    </span>
                  )}
                  {isAcBrand && (
                    <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">
                      <Wind className="w-4 h-4" />
                      Aire acondicionado
                    </span>
                  )}
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-400">{products.length}</div>
                  <div className="text-sm text-gray-400">Productos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">{products.filter(p => p.inStock).length}</div>
                  <div className="text-sm text-gray-400">En stock</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Secciones de productos */}
        {calderas.length > 0 && (
          <ProductSection 
            title={`Calderas ${brand.name}`} 
            icon={Flame} 
            products={calderas} 
            bgColor="bg-white"
          />
        )}
        
        {repuestosCalderas.length > 0 && (
          <ProductSection 
            title={`Repuestos de Calderas ${brand.name}`} 
            icon={Wrench} 
            products={repuestosCalderas} 
            bgColor="bg-gray-50"
          />
        )}
        
        {aires.length > 0 && (
          <ProductSection 
            title={`Aires Acondicionados ${brand.name}`} 
            icon={Wind} 
            products={aires} 
            bgColor="bg-white"
          />
        )}
        
        {repuestosAires.length > 0 && (
          <ProductSection 
            title={`Repuestos de Aire Acondicionado ${brand.name}`} 
            icon={Package} 
            products={repuestosAires} 
            bgColor="bg-gray-50"
          />
        )}
        
        {/* CTA de contacto */}
        <section className="py-12 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿No encuentras el repuesto que buscas?
            </h2>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Contamos con un amplio catálogo de repuestos {brand.name}. Contáctanos y te ayudamos a encontrar la pieza que necesitas.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="tel:912345678" 
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                912 345 678
              </a>
              <a 
                href="mailto:info@uniclima.es" 
                className="inline-flex items-center gap-2 bg-orange-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-800 transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@uniclima.es
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
