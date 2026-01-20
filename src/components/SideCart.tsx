'use client'

/*
 * DESIGN: Premium Side Cart - Versión Mejorada
 * - Más grande y visible en móvil
 * - Estilo moderno y atractivo
 * - Artículos más grandes y legibles
 * - Gradientes y sombras premium
 * - Ancho ajustado (no 100% en móvil)
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
  Gift,
  Shield,
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

  // Bloquear scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
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
      {/* Overlay con blur */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 overflow-hidden ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Side Cart Panel - Ancho ajustado (no 100% en móvil) */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[92vw] sm:w-[400px] md:w-[420px] max-w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out overflow-hidden ${
          isAnimating ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Mi Carrito</h2>
                <p className="text-white/80 text-sm">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Vaciar</span>
                </button>
              )}
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Barra de progreso envío gratis */}
        {totalItems > 0 && (
          <div className="px-4 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-green-600" />
              {hasFreeShipping ? (
                <span className="text-green-700 font-semibold text-sm">
                  🎉 ¡Envío gratis en tu pedido!
                </span>
              ) : (
                <span className="text-gray-700 text-sm">
                  Añade <span className="font-bold text-green-600">{remainingForFreeShipping.toFixed(0)}€</span> más para envío gratis
                </span>
              )}
            </div>
            {/* Barra de progreso */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0€</span>
              <span>120€</span>
            </div>
          </div>
        )}

        {/* Productos - con scroll interno */}
        <div 
          className="flex-1 overflow-y-auto bg-gray-50 mega-menu-scroll"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain'
          }}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-6">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tu carrito está vacío</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Explora nuestros productos y añade lo que necesites
              </p>
              <Button onClick={closeCart} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">
                Ver productos
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {/* Imagen más grande */}
                  <Link href={`/producto/${item.product.id}`} onClick={closeCart}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link href={`/producto/${item.product.id}`} onClick={closeCart}>
                        <p className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 hover:text-orange-600 cursor-pointer leading-tight">
                          {item.product.name}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">
                        REF: {item.product.reference}
                      </p>
                    </div>

                    {/* Controles y precio */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Selector de cantidad mejorado */}
                      <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Precio y eliminar */}
                      <div className="flex items-center gap-3">
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer mejorado */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white">
            {/* Beneficios */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex justify-around text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-orange-500" />
                  <span>Garantía 1 año</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>24-48h</span>
                </div>
              </div>
            </div>

            {/* Resumen de precios */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-700 font-medium">{totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Envío</span>
                <span className={hasFreeShipping ? "text-green-600 font-semibold" : "text-gray-700"}>
                  {hasFreeShipping ? "¡Gratis!" : "8,50€"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  {finalTotal.toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="px-4 pb-4 space-y-2">
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl h-12 text-base shadow-lg shadow-orange-500/30">
                  Finalizar compra
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <button
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl h-12 text-base hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
