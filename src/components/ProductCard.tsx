'use client'

/*
 * PRODUCT CARD - Estilo Retail Tech (PCComponentes)
 * - Badge descuento esquina superior izquierda
 * - Imagen producto con hover zoom
 * - Título 2 líneas máximo
 * - Precio actual grande + precio tachado
 * - Rating con estrellas
 * - Info envío gratis
 * - Alta densidad visual
 */

import Link from "next/link";
import { Star, Truck, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      reference: product.reference
    });
    setIsAdded(true);
    openCart();
    toast.success("Producto añadido al carrito");
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link href={`/producto/${product.id}`}>
      <article className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200 h-full flex flex-col">
        {/* Imagen */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {/* Badge descuento */}
          {discount > 0 && (
            <span className="absolute top-2 left-2 z-10 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">
              -{discount}%
            </span>
          )}
          
          {/* Badge trending */}
          {product.isBestSeller && (
            <span className="absolute top-2 right-2 z-10 px-2 py-0.5 text-[10px] font-semibold text-white bg-purple-600 rounded">
              Top ventas
            </span>
          )}
          
          {/* Badge sin stock */}
          {!product.inStock && (
            <span className="absolute top-2 left-2 z-10 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded">
              Agotado
            </span>
          )}
          
          {/* Imagen producto */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Botón añadir carrito (hover desktop) */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdded}
            className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg ${
              isAdded 
                ? "bg-green-500 text-white" 
                : "bg-primary text-white hover:bg-primary/90"
            } ${!product.inStock ? "hidden" : ""}`}
          >
            {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Contenido */}
        <div className="flex-1 p-3 flex flex-col">
          {/* Referencia */}
          <p className="text-[10px] text-gray-400 font-mono mb-1">
            Ref: {product.reference}
          </p>
          
          {/* Título */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors min-h-[40px]">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.averageRating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(product.averageRating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {product.averageRating}/5
              </span>
              {product.reviewCount && (
                <span className="text-xs text-gray-400">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}
          
          {/* Stock */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-gray-300"}`} />
            <span className={`text-[10px] font-medium ${product.inStock ? "text-green-600" : "text-gray-400"}`}>
              {product.inStock ? "En stock" : "Sin stock"}
            </span>
          </div>
          
          {/* Precios */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>
            
            {/* Precio mínimo histórico */}
            {discount >= 20 && (
              <p className="text-[10px] text-red-600 font-medium mt-0.5">
                ¡Precio mínimo histórico!
              </p>
            )}
            
            {/* Envío gratis */}
            {product.price >= 120 && product.inStock && (
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-green-600">
                <Truck className="w-3 h-3" />
                <span>Envío gratis</span>
              </div>
            )}
          </div>
          
          {/* Botón móvil */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdded}
            className={`lg:hidden w-full mt-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              isAdded 
                ? "bg-green-50 text-green-600 border border-green-200" 
                : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
            } ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isAdded ? (
              <span className="flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Añadido
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <ShoppingCart className="w-3.5 h-3.5" />
                Añadir
              </span>
            )}
          </button>
        </div>
      </article>
    </Link>
  );
}
