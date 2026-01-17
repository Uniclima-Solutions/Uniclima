'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ChevronRight, 
  Home,
  Package,
  ArrowRight,
  Share2,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function FavoritosPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { addItem, openCart } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAddToCart = (item: typeof favorites[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      reference: item.reference
    });
    toast.success('Producto añadido al carrito');
    openCart();
  };

  const handleAddAllToCart = () => {
    favorites.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        reference: item.reference
      });
    });
    toast.success(`${favorites.length} productos añadidos al carrito`);
    openCart();
  };

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFavorite(id);
      setRemovingId(null);
      toast.success('Producto eliminado de favoritos');
    }, 300);
  };

  const handleShare = async () => {
    const shareText = favorites.map(f => `- ${f.name}: ${f.price.toFixed(2)}€`).join('\n');
    const shareData = {
      title: 'Mi lista de favoritos - Uniclima',
      text: `Mi lista de favoritos:\n${shareText}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
      toast.success('Lista copiada al portapapeles');
    }
  };

  const totalValue = favorites.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
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
              <li className="text-gray-900 font-medium flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                Mis Favoritos
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header de la página */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600 mt-1">
                {favorites.length === 0 
                  ? 'Tu lista de favoritos está vacía' 
                  : `${favorites.length} producto${favorites.length !== 1 ? 's' : ''} guardado${favorites.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            {favorites.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
                      clearFavorites();
                      toast.success('Lista de favoritos vaciada');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar lista
                </button>
              </div>
            )}
          </div>

          {favorites.length === 0 ? (
            /* Estado vacío */
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-red-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Tu lista de favoritos está vacía
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Guarda tus productos favoritos para encontrarlos fácilmente más tarde. 
                Haz clic en el corazón de cualquier producto para añadirlo aquí.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Package className="w-5 h-5" />
                Explorar productos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-4">
                {favorites.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
                      removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Imagen */}
                      <Link 
                        href={`/producto/${item.id}`}
                        className="relative w-full sm:w-40 h-40 bg-gray-100 flex-shrink-0 group"
                      >
                        <Image
                          src={item.image || '/images/products/placeholder-product.png'}
                          alt={item.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                          <Link 
                            href={`/producto/${item.id}`}
                            className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-400 mt-1">Ref: {item.reference}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <span className="text-xl font-bold text-gray-900">
                            {item.price.toFixed(2)}€
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar de favoritos"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span className="hidden sm:inline">Añadir</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen lateral */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
                  <h3 className="font-bold text-gray-900 mb-4">Resumen</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Productos guardados</span>
                      <span className="font-medium">{favorites.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valor total</span>
                      <span className="font-bold text-lg text-gray-900">{totalValue.toFixed(2)}€</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddAllToCart}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Añadir todo al carrito
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Envío gratis en pedidos superiores a 120€
                  </p>

                  {/* Beneficios */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-green-600" />
                      </div>
                      <span>Entrega en 24-48h</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>Garantía de 1 año</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
