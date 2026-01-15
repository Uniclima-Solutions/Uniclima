'use client'

/*
 * HEADER PREMIUM - Diseño profesional y elegante
 * - Barra superior con contacto y login
 * - Logo prominente con nombre
 * - Buscador central elegante
 * - Botones de acción claros
 * - Header sticky con transición suave
 */

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  X,
  ChevronRight,
  ChevronDown,
  Flame,
  Snowflake,
  Package,
  Truck,
  RotateCcw,
  Shield,
  Headphones,
  Tag,
  Phone,
  Mail,
  LogIn,
  Heart,
  Clock,
  Star,
  Plus
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { groupedSearch, type SearchResult, type GroupedSearchResults } from "@/lib/smartSearch";
import MobileMenu from "./MobileMenu";
import SideCart from "./SideCart";



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  // Detectar scroll para header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Búsqueda inteligente
  const searchResults = useMemo((): GroupedSearchResults & { hasResults: boolean } => {
    if (searchQuery.length < 2) {
      return {
        products: [], categories: [], brands: [], models: [],
        services: [], pages: [], specs: [], correction: undefined, hasResults: false,
      };
    }
    const grouped = groupedSearch(searchQuery);
    const hasResults = grouped.products.length > 0 || grouped.categories.length > 0 ||
      grouped.brands.length > 0 || grouped.models.length > 0;
    return { ...grouped, hasResults };
  }, [searchQuery]);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }

    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (href: string) => {
    setSearchFocused(false);
    setSearchQuery("");
    router.push(href);
  };

  const showResults = searchFocused && searchQuery.length >= 2;

  // Componente de resultado de búsqueda - Solo productos con estrellas y botón añadir
  const ResultItem = ({ result, onClick }: { result: SearchResult; onClick: () => void }) => {
    const rating = result.item.rating || 4.5;
    const reviewCount = result.item.reviewCount || 0;
    const { addItem, openCart } = useCart();
    
    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({
        id: result.item.id,
        name: result.item.title,
        price: result.item.price || 0,
        image: result.item.image || '',
        reference: result.item.subtitle || ''
      });
      openCart();
    };
    
    return (
      <div className="flex items-center gap-3 w-full px-4 py-3 hover:bg-orange-50/50 transition-colors border-b border-gray-100 last:border-b-0">
        {/* Imagen */}
        <Link
          href={result.item.href}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden hover:ring-2 ring-orange-500 transition-all"
        >
          {result.item.image ? (
            <img src={result.item.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <Package className="w-6 h-6 text-gray-400" />
          )}
        </Link>
        
        {/* Info del producto */}
        <Link
          href={result.item.href}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className="flex-1 min-w-0"
        >
          <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 hover:text-orange-600 transition-colors">{result.item.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{result.item.subtitle}</p>
          {/* Estrellas */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : star - 0.5 <= rating ? 'text-yellow-400 fill-yellow-400/50' : 'text-gray-300'}`}
                />
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-xs text-gray-400">({reviewCount})</span>
            )}
          </div>
        </Link>
        
        {/* Precio y botón añadir */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          {result.item.price && (
            <span className="text-base font-bold text-orange-600 whitespace-nowrap">{result.item.price.toFixed(2)}€</span>
          )}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Barra superior - Solo desktop */}
      <div className="hidden lg:block bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            {/* Izquierda - Contacto */}
            <div className="flex items-center gap-6">
              <a href="tel:+34912345678" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>912 345 678</span>
              </a>
              <a href="mailto:info@uniclima.es" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>info@uniclima.es</span>
              </a>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Lun-Vie: 9:00 - 18:00</span>
              </div>
            </div>
            
            {/* Derecha - Login y registro */}
            <div className="flex items-center gap-4">
              <Link href="/profesionales" className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Zona Profesionales</span>
              </Link>
              <div className="w-px h-4 bg-gray-700" />
              <Link href="/login" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <LogIn className="w-3.5 h-3.5" />
                <span>Iniciar sesión</span>
              </Link>
              <Link href="/registro" className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-white font-medium transition-colors">
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className={`sticky top-0 z-40 bg-white transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 h-14 lg:h-18">
            {/* Botón menú móvil - Hamburguesa con estilo */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors flex-shrink-0"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-current rounded-full"></span>
                <span className="w-4/5 h-0.5 bg-current rounded-full"></span>
                <span className="w-full h-0.5 bg-current rounded-full"></span>
              </div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md lg:shadow-lg shadow-orange-500/30">
                <span className="text-white font-black text-xs sm:text-sm lg:text-xl">U</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-base sm:text-lg lg:text-2xl font-black text-gray-900 tracking-tight">Uniclima</span>
                <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 -mt-0.5 font-medium">Repuestos HVAC</p>
              </div>
            </Link>

            {/* Botón Menú (desktop) - Abre el mismo MobileMenu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-900 hover:bg-gray-800 rounded-lg lg:rounded-xl text-xs lg:text-sm font-semibold text-white transition-colors flex-shrink-0"
            >
              <Menu className="w-4 h-4" />
              <span>Menú</span>
            </button>

            {/* Buscador - Flexible y responsive */}
            <div ref={searchRef} className="flex-1 min-w-0 relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Buscar..."
                  className="w-full h-9 sm:h-10 lg:h-12 pl-2.5 sm:pl-3 lg:pl-4 pr-14 sm:pr-16 lg:pr-12 bg-gray-100 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-lg sm:rounded-xl text-base outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-10 sm:right-11 lg:right-11 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}
                <button className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </button>
              </div>

              {/* Resultados de búsqueda - Solo productos con scroll adaptativo */}
              {showResults && (
                <div className="fixed lg:absolute top-[60px] lg:top-full left-0 right-0 lg:left-auto lg:right-auto mt-0 lg:mt-2 bg-white lg:rounded-2xl shadow-2xl border-0 lg:border border-gray-100 overflow-hidden z-50 lg:w-[500px] max-h-[calc(100vh-60px)] lg:max-h-none">
                  {/* Corrección ortográfica */}
                  {searchResults.correction && (
                    <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
                      <p className="text-sm text-gray-600">
                        ¿Quisiste decir <button onClick={() => setSearchQuery(searchResults.correction!)} className="font-semibold text-orange-500 hover:underline">{searchResults.correction}</button>?
                      </p>
                    </div>
                  )}
                  
                  {/* Lista de productos con scroll adaptativo */}
                  <div 
                    className="overflow-y-auto"
                    style={{ 
                      maxHeight: 'min(60vh, 400px)',
                      scrollbarWidth: 'thin', 
                      scrollbarColor: 'rgba(249, 115, 22, 0.4) transparent' 
                    }}
                  >
                    {searchResults.products.length > 0 ? (
                      <>
                        <p className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide sticky top-0 bg-white/95 backdrop-blur-sm">
                          {searchResults.products.length} producto{searchResults.products.length !== 1 ? 's' : ''} encontrado{searchResults.products.length !== 1 ? 's' : ''}
                        </p>
                        {searchResults.products.slice(0, 10).map((result) => (
                          <ResultItem key={result.item.id} result={result} onClick={() => handleResultClick(result.item.href)} />
                        ))}
                        {searchResults.products.length > 10 && (
                          <Link 
                            href={`/buscar?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => {
                              setSearchFocused(false);
                              setSearchQuery("");
                            }}
                            className="block px-4 py-3 text-center text-sm font-semibold text-orange-600 hover:bg-orange-50 border-t border-gray-100 transition-colors"
                          >
                            Ver todos los resultados ({searchResults.products.length})
                          </Link>
                        )}
                      </>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No se encontraron productos</p>
                        <p className="text-sm text-gray-400 mt-1">Prueba con otros términos de búsqueda</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Acciones derecha */}
            <div className="flex items-center gap-0.5 lg:gap-2">
              {/* Ofertas - Desktop */}
              <Link href="/ofertas" className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <Tag className="w-4 h-4" />
                <span>Ofertas</span>
              </Link>

              {/* Botón usuario - Mobile */}
              <Link href="/login" className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors flex-shrink-0">
                <User className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </Link>

              {/* Favoritos - Desktop */}
              <Link href="/favoritos" className="hidden lg:flex items-center justify-center w-10 lg:w-11 h-10 lg:h-11 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg lg:rounded-xl transition-colors relative flex-shrink-0">
                <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>

              {/* Carrito */}
              <button
                onClick={openCart}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-auto lg:h-auto lg:gap-2 lg:px-4 lg:py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors relative flex-shrink-0"
              >
                <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-5 lg:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 lg:w-5 lg:h-5 bg-gray-900 text-white text-[9px] sm:text-[10px] lg:text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
                <span className="hidden lg:inline text-xs lg:text-sm font-semibold">Cesta</span>
              </button>
            </div>
          </div>
        </div>

        {/* Barra de beneficios - Solo visible en desktop */}
        <div className="hidden md:block bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-8 py-2">
              <div className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-medium">Envío gratis +120€</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-600">
                <Package className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="font-medium">Entrega 24-48h</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium">Devoluciones 14 días</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-600">
                <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="font-medium">Garantía 1 año</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-600">
                <Headphones className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <span className="font-medium">Soporte técnico</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Side Cart */}
      <SideCart />
    </>
  );
}
