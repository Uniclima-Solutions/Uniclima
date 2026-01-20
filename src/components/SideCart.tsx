'use client'

/*
 * DESIGN: Compact Responsive Side Cart
 * - Más compacto y eficiente
 * - Mejor aprovechamiento del espacio
 * - Totalmente responsive
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";

export default function SideCart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const freeShippingThreshold = 120;
  const shippingCost = 8.50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const hasFreeShipping = remainingForFreeShipping <= 0;
  const finalTotal = totalPrice + (hasFreeShipping ? 0 : shippingCost);
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Side Cart Panel - Responsive */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[85vw] sm:w-[380px] max-w-[400px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header compacto con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-3 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold text-base">Mi Carrito</span>
              <span className="text-white/70 text-sm">({totalItems})</span>
            </div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-white/80 hover:text-white flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Vaciar
                </button>
              )}
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Barra envío gratis compacta */}
        {totalItems > 0 && (
          <div className="px-3 py-2 bg-green-50 border-b border-green-100 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs">
              <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
              {hasFreeShipping ? (
                <span className="text-green-700 font-medium">🎉 ¡Envío gratis!</span>
              ) : (
                <span className="text-gray-600">
                  Añade <b className="text-green-600">{remainingForFreeShipping.toFixed(0)}€</b> para envío gratis
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Productos - scroll */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 px-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Tu carrito está vacío</p>
              <p className="text-xs text-gray-400 mb-4 text-center">Explora nuestros productos</p>
              <Button onClick={closeCart} size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs px-4">
                Ver productos
              </Button>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100"
                >
                  {/* Imagen */}
                  <Link href={`/producto/${item.product.id}`} onClick={closeCart} className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <Link href={`/producto/${item.product.id}`} onClick={closeCart}>
                        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight hover:text-orange-600">
                          {item.product.name}
                        </p>
                      </Link>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.product.reference}</p>
                    </div>

                    {/* Controles y precio en línea */}
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center bg-white rounded-full border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3 text-gray-500" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer compacto */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white flex-shrink-0">
            {/* Resumen */}
            <div className="px-3 py-2.5 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span className={hasFreeShipping ? "text-green-600 font-medium" : ""}>
                  {hasFreeShipping ? "Gratis" : "8,50€"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-orange-600">{finalTotal.toFixed(2)}€</span>
              </div>
            </div>

            {/* Botones */}
            <div className="px-3 pb-3 space-y-2">
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg h-10 text-sm">
                  Finalizar compra
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <button
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 font-medium rounded-lg h-10 text-sm hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
