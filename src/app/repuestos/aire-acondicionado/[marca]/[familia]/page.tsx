"use client";

/**
 * PÁGINA: Familia de Piezas por Marca
 * Lista de productos de una familia específica para una marca
 * SEO optimizado para "bombas circulacion vaillant" etc.
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
  Search,
  Filter,
  ShoppingCart,
  Check
} from "lucide-react";
import { useState, useMemo } from "react";

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
const familiasData: Record<string, { name: string; description: string }> = {
  "placas-electronicas": { name: "Placas Electrónicas", description: "Placas de control y gestión para aire-acondicionado" },
  "intercambiadores": { name: "Intercambiadores", description: "Intercambiadores de calor de placas y bitérmicos" },
  "bombas-circulacion": { name: "Bombas de Circulación", description: "Bombas para el circuito de calefacción y ACS" },
  "valvulas-gas": { name: "Válvulas de Gas", description: "Válvulas de seguridad y regulación de gas" },
  "valvulas-3-vias": { name: "Válvulas 3 Vías", description: "Válvulas de distribución para calefacción y ACS" },
  "sensores": { name: "Sensores", description: "Sensores de temperatura, presión y flujo" },
  "ventiladores": { name: "Ventiladores", description: "Ventiladores de extracción de humos" },
  "electrodos": { name: "Electrodos", description: "Electrodos de encendido e ionización" },
  "presostatos": { name: "Presostatos", description: "Presostatos de agua y aire" },
  "termostatos": { name: "Termostatos", description: "Termostatos y limitadores de temperatura" },
  "juntas": { name: "Juntas", description: "Juntas y retenes de estanqueidad" },
  "membranas": { name: "Membranas", description: "Membranas para válvulas y grupos de agua" }
};

// Generador de productos determinista
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const generateProducts = (marca: string, familia: string, count: number = 24) => {
  const marcaInfo = marcasData[marca] || { name: marca };
  const familiaInfo = familiasData[familia] || { name: familia };
  
  return Array.from({ length: count }, (_, i) => {
    const seed = i + 1;
    const priceBase = 50 + (seededRandom(seed * 7) * 300);
    const hasDiscount = seededRandom(seed * 11) > 0.6;
    const originalPriceBase = hasDiscount ? priceBase * (1.2 + seededRandom(seed * 13) * 0.5) : undefined;
    
    // Generar referencia realista
    const refPrefix = familia.slice(0, 3).toUpperCase();
    const refNum = 10000 + Math.floor(seededRandom(seed * 17) * 90000);
    
    return {
      id: `${marca}-${familia}-${i + 1}`,
      name: `${familiaInfo.name} ${marcaInfo.name} - Modelo ${2000 + i}`,
      reference: `${refPrefix}-${refNum}`,
      brand: marcaInfo.name,
      brandSlug: marca,
      family: familiaInfo.name,
      familySlug: familia,
      price: Math.round(priceBase * 100) / 100,
      originalPrice: originalPriceBase ? Math.round(originalPriceBase * 100) / 100 : undefined,
      image: `/images/categorias/PlacasElectronicas.png`,
      inStock: seededRandom(seed * 19) > 0.2,
      condition: seededRandom(seed * 23) > 0.4 ? 'reacondicionado' : 'nuevo' as 'nuevo' | 'reacondicionado',
      isTopSeller: seededRandom(seed * 29) > 0.85,
      slug: `${familia}-${marca}-modelo-${2000 + i}-${refPrefix.toLowerCase()}-${refNum}`
    };
  });
};

// Componente de tarjeta de producto
function ProductCard({ product, onAddToCart }: { 
  product: ReturnType<typeof generateProducts>[0];
  onAddToCart: (product: ReturnType<typeof generateProducts>[0]) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock || isAdding) return;
    
    setIsAdding(true);
    onAddToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 300);
  };

  return (
    <Link 
      href={`/repuestos/aire-acondicionado/${product.brandSlug}/${product.familySlug}/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Badges */}
      <div className="relative">
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        {product.isTopSeller && (
          <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Top
          </div>
        )}
        
        {/* Image */}
        <div className="aspect-square p-4 bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-gray-400 mb-1">{product.reference}</p>
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>
        
        {/* Condition */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            product.condition === 'nuevo' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {product.condition === 'nuevo' ? 'Nuevo' : 'Reacondicionado'}
          </span>
          <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
            {product.inStock ? '✓ En stock' : 'Agotado'}
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)}€</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice.toFixed(2)}€</span>
          )}
        </div>
        
        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            !product.inStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isAdded
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Añadido
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Añadir
            </>
          )}
        </button>
      </div>
    </Link>
  );
}

export default function RepuestosFamiliaMarca() {
  const params = useParams();
  const marca = params.marca as string;
  const familia = params.familia as string;
  const { addItem } = useCart();
  
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("relevancia");
  const [filtroCondicion, setFiltroCondicion] = useState("todos");
  
  const marcaInfo = marcasData[marca] || { name: marca };
  const familiaInfo = familiasData[familia] || { name: familia, description: "" };
  
  const productos = useMemo(() => generateProducts(marca, familia), [marca, familia]);
  
  const productosFiltrados = useMemo(() => {
    let filtered = productos.filter(p => 
      p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.reference.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    if (filtroCondicion !== "todos") {
      filtered = filtered.filter(p => p.condition === filtroCondicion);
    }
    
    // Ordenar
    switch (ordenar) {
      case "precio-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "nombre":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return filtered;
  }, [productos, busqueda, ordenar, filtroCondicion]);
  
  const handleAddToCart = (product: ReturnType<typeof generateProducts>[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${familiaInfo.name} ${marcaInfo.name}`,
    "description": `${familiaInfo.description} para aire-acondicionado ${marcaInfo.name}`,
    "url": `https://uniclima.es/repuestos/aire-acondicionado/${marca}/${familia}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Repuestos", "item": "https://uniclima.es/repuestos" },
        { "@type": "ListItem", "position": 3, "name": "Aire Acondicionado", "item": "https://uniclima.es/repuestos/aire-acondicionado" },
        { "@type": "ListItem", "position": 4, "name": marcaInfo.name, "item": `https://uniclima.es/repuestos/aire-acondicionado/${marca}` },
        { "@type": "ListItem", "position": 5, "name": familiaInfo.name, "item": `https://uniclima.es/repuestos/aire-acondicionado/${marca}/${familia}` }
      ]
    }
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-blue-100 text-sm mb-4 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/repuestos" className="hover:text-white transition-colors">Repuestos</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/repuestos/aire-acondicionado" className="hover:text-white transition-colors">Aire Acondicionado</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/repuestos/aire-acondicionado/${marca}`} className="hover:text-white transition-colors">{marcaInfo.name}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{familiaInfo.name}</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-black mb-2">
                  {familiaInfo.name} {marcaInfo.name}
                </h1>
                <p className="text-blue-100">
                  {familiaInfo.description}. {productosFiltrados.length} productos disponibles.
                </p>
              </div>
              
              <div className="w-full lg:w-80">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por referencia..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filtros y productos */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Barra de filtros */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{productosFiltrados.length} productos</span>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filtroCondicion}
                    onChange={(e) => setFiltroCondicion(e.target.value)}
                    className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="todos">Todos</option>
                    <option value="nuevo">Nuevo (Original)</option>
                    <option value="reacondicionado">Reacondicionado</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <select
                  value={ordenar}
                  onChange={(e) => setOrdenar(e.target.value)}
                  className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="nombre">Nombre</option>
                </select>
              </div>
            </div>
            
            {/* Grid de productos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {productosFiltrados.map((producto) => (
                <ProductCard 
                  key={producto.id} 
                  product={producto}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            {productosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Interlinking Silo - Otras familias de la misma marca */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Otros repuestos {marcaInfo.name}</h2>
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
