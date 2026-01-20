'use client';

/**
 * Página de Subcategoría: Tipo de Repuesto de Calderas
 * Muestra los productos de un tipo específico de repuesto
 */

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb, CollectionSchema } from '@/components/seo';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { 
  Filter, 
  X, 
  ShoppingCart,
  Check,
  Home,
  ChevronRight
} from 'lucide-react';

// Mapeo de slugs a nombres
const categoryNames: Record<string, string> = {
  'placas-electronicas': 'Placas Electrónicas',
  'intercambiadores-placas': 'Intercambiadores de Placas',
  'bombas-circulacion': 'Bombas de Circulación',
  'valvulas-gas': 'Válvulas de Gas',
  'extractores': 'Extractores',
  'intercambiadores-bitermicos': 'Intercambiadores Bitérmicos',
  'camaras-combustion': 'Cámaras de Combustión',
  'valvulas-3-vias': 'Válvulas de 3 Vías',
  'cuerpos-hidraulicos': 'Cuerpos Hidráulicos',
  'extractores-modulantes': 'Extractores Modulantes',
  'vasos-expansion': 'Vasos de Expansión',
  'valvulas-seguridad': 'Válvulas de Seguridad',
  'sensores': 'Sensores',
  'flujostatos': 'Flujostatos',
  'presostatos': 'Presostatos',
  'captadores-presion': 'Captadores de Presión',
  'transformadores': 'Transformadores',
  'valvulas-llenado': 'Válvulas de Llenado',
  'microacumuladores': 'Microacumuladores'
};

// Marcas disponibles
const marcas = [
  { name: "Junkers / Bosch", slug: "junkers-bosch" },
  { name: "Vaillant", slug: "vaillant" },
  { name: "Saunier Duval", slug: "saunier-duval" },
  { name: "Baxi", slug: "baxi" },
  { name: "Ferroli", slug: "ferroli" },
  { name: "Ariston", slug: "ariston" },
  { name: "Roca", slug: "roca" },
  { name: "Cointra", slug: "cointra" },
  { name: "Chaffoteaux", slug: "chaffoteaux" },
  { name: "Beretta", slug: "beretta" }
];

// Generador de números pseudoaleatorios con semilla (determinista)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Productos generados de forma determinista (sin Math.random)
const generateProducts = (category: string, count: number = 48) => {
  const categoryName = categoryNames[category] || category;
  return Array.from({ length: count }, (_, i) => {
    const seed = i + 1;
    const priceBase = 50 + (seededRandom(seed * 7) * 300);
    const hasDiscount = seededRandom(seed * 11) > 0.5;
    const originalPriceBase = hasDiscount ? 80 + (seededRandom(seed * 13) * 400) : undefined;
    
    return {
      id: `${category}-${i + 1}`,
      name: `${categoryName} ${marcas[i % marcas.length].name} - Modelo ${1000 + i}`,
      reference: `REF-${category.toUpperCase().slice(0, 3)}-${10000 + i}`,
      brand: marcas[i % marcas.length].name,
      brandSlug: marcas[i % marcas.length].slug,
      price: Math.round(priceBase * 100) / 100,
      originalPrice: originalPriceBase ? Math.round(originalPriceBase * 100) / 100 : undefined,
      image: `/images/categorias/PlacasElectronicas.webp`,
      inStock: seededRandom(seed * 17) > 0.2,
      condition: seededRandom(seed * 19) > 0.3 ? 'reacondicionado' : 'nuevo' as 'nuevo' | 'reacondicionado',
      isTopSeller: seededRandom(seed * 23) > 0.8
    };
  });
};

// Componente de tarjeta de producto
function ProductCard({ product, onAddToCart }: { 
  product: ReturnType<typeof generateProducts>[0];
  onAddToCart: (productId: string) => void;
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
    
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      onAddToCart(product.id);
      
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 500);
  };
  
  return (
    <Link href={`/producto/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Imagen */}
        <div className="aspect-square relative bg-gray-100 p-4">
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              -{discount}%
            </span>
          )}
          {product.isTopSeller && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              Top
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-gray-400 mb-1">{product.reference}</p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[40px]">
            {product.name}
          </h3>
          
          {/* Estado */}
          <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
            product.condition === 'nuevo' 
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {product.condition === 'nuevo' ? 'Nuevo' : 'Reacondicionado'}
          </span>
          
          {/* Stock */}
          <div className="flex items-center gap-1 mt-2">
            {product.inStock ? (
              <>
                <Check className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">En stock</span>
              </>
            ) : (
              <span className="text-xs text-red-500">Agotado</span>
            )}
          </div>
          
          {/* Precio */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toFixed(2)}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
          
          {/* Botón */}
          <button 
            className={`w-full mt-3 flex items-center justify-center gap-2 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50 ${
              isAdded 
                ? 'bg-green-500' 
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
            disabled={!product.inStock || isAdding}
            onClick={handleAddToCart}
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isAdded ? (
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
      </div>
    </Link>
  );
}

export default function CategoriaCalderasPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem, openCart } = useCart();
  
  const categoryName = categoryNames[slug] || slug;
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('relevancia');
  
  // Generar productos (determinista)
  const allProducts = useMemo(() => generateProducts(slug, 48), [slug]);
  
  // Toggle marca
  const toggleBrand = useCallback((brandSlug: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandSlug) 
        ? prev.filter(b => b !== brandSlug)
        : [...prev, brandSlug]
    );
  }, []);
  
  // Añadir al carrito
  const handleAddToCart = useCallback((productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        reference: product.reference
      });
      openCart();
      toast.success('Producto añadido al carrito');
    }
  }, [allProducts, addItem, openCart]);
  
  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brandSlug)) {
        return false;
      }
      if (selectedCondition && product.condition !== selectedCondition) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    });
  }, [allProducts, selectedBrands, selectedCondition, priceRange]);
  
  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'precio-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'precio-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'nombre':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);
  
  // Breadcrumbs
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Repuestos Calderas', href: '/c/calderas' },
    { label: categoryName }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-500 hover:text-orange-600 flex items-center gap-1">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/c/calderas" className="text-gray-500 hover:text-orange-600">
              Repuestos Calderas
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>
          
          {/* Título SEO */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {categoryName} para Calderas
            </h1>
            <p className="text-gray-600 mt-2">
              Encuentra {categoryName.toLowerCase()} originales y compatibles para calderas de todas las marcas. 
              {sortedProducts.length} productos disponibles.
            </p>
          </div>
          
          {/* Layout principal */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Filtros - Desktop (izquierda) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-4 shadow-sm sticky top-4">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </h2>
                
                {/* Filtro por marca */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Marca</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {marcas.map(marca => (
                      <label key={marca.slug} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedBrands.includes(marca.slug)}
                          onChange={() => toggleBrand(marca.slug)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm">{marca.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Filtro por estado */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Estado</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="condition"
                        checked={selectedCondition === ''}
                        onChange={() => setSelectedCondition('')}
                        className="border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm">Todos</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="condition"
                        checked={selectedCondition === 'nuevo'}
                        onChange={() => setSelectedCondition('nuevo')}
                        className="border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm">Nuevo (Original)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="condition"
                        checked={selectedCondition === 'reacondicionado'}
                        onChange={() => setSelectedCondition('reacondicionado')}
                        className="border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm">Reacondicionado</span>
                    </label>
                  </div>
                </div>
                
                {/* Filtro por precio */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Precio</h3>
                  <div className="px-2">
                    <input 
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-orange-500"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>
                
                {/* Limpiar filtros */}
                {(selectedBrands.length > 0 || selectedCondition || priceRange[1] < 500) && (
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedCondition('');
                      setPriceRange([0, 500]);
                    }}
                    className="w-full py-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </aside>
            
            {/* Listado de productos */}
            <div className="flex-1">
              {/* Barra de herramientas */}
              <div className="flex items-center justify-between mb-4 bg-white rounded-lg p-3 shadow-sm">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 text-gray-700"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
                
                <span className="text-sm text-gray-500 hidden sm:inline">
                  {sortedProducts.length} productos
                </span>
                
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-gray-500 hidden sm:inline">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="relevancia">Relevancia</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="nombre">Nombre</option>
                  </select>
                </div>
              </div>
              
              {/* Grid de productos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              
              {/* Sin resultados */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedCondition('');
                      setPriceRange([0, 500]);
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
      
      {/* Modal de filtros móvil - desde la izquierda */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div 
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto shadow-xl"
            style={{ animation: 'slideInLeft 0.3s ease-out' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Filtros</h2>
              <button onClick={() => setShowFilters(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Filtro por marca */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Marca</h3>
              <div className="space-y-2">
                {marcas.map(marca => (
                  <label key={marca.slug} className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(marca.slug)}
                      onChange={() => toggleBrand(marca.slug)}
                      className="rounded border-gray-300 text-orange-500"
                    />
                    <span className="text-sm">{marca.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Filtro por estado */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Estado</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input 
                    type="radio"
                    name="condition-mobile"
                    checked={selectedCondition === ''}
                    onChange={() => setSelectedCondition('')}
                    className="border-gray-300 text-orange-500"
                  />
                  <span className="text-sm">Todos</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio"
                    name="condition-mobile"
                    checked={selectedCondition === 'nuevo'}
                    onChange={() => setSelectedCondition('nuevo')}
                    className="border-gray-300 text-orange-500"
                  />
                  <span className="text-sm">Nuevo (Original)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio"
                    name="condition-mobile"
                    checked={selectedCondition === 'reacondicionado'}
                    onChange={() => setSelectedCondition('reacondicionado')}
                    className="border-gray-300 text-orange-500"
                  />
                  <span className="text-sm">Reacondicionado</span>
                </label>
              </div>
            </div>
            
            {/* Filtro por precio */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Precio</h3>
              <div className="px-2">
                <input 
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0]}€</span>
                  <span>{priceRange[1]}€</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-orange-500 text-white font-medium py-3 rounded-lg"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
      
      {/* CSS para animación */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
      
      {/* Schema SEO */}
      <CollectionSchema
        collection={{
          name: `${categoryName} para Calderas`,
          description: `Encuentra ${categoryName.toLowerCase()} originales y compatibles para calderas de todas las marcas.`,
          url: `/c/calderas/${slug}`,
          itemCount: sortedProducts.length
        }}
      />
    </div>
  );
}
