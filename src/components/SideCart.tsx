'use client'

/*
 * DESIGN: Compact Premium Side Cart
 * - Optimizado para móvil
 * - Vista compacta y profesional
 * - Sin scroll, todo visible
 * - Bloquea scroll del body cuando está abierto
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

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay - sin scroll */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 overflow-hidden ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Side Cart Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[calc(100%-54px)] max-w-[310px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out overflow-hidden ${
          isAnimating ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        {/* Header compacto */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="font-bold text-gray-900 text-sm">Mi Carrito</span>
            <span className="text-[10px] text-gray-400">({totalItems})</span>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Vaciar</span>
              </button>
            )}
            <button
              onClick={closeCart}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Envío gratis compacto */}
        {totalItems > 0 && (
          <div className="px-3 py-2 bg-green-50 border-b border-green-100">
            <div className="flex items-center gap-1.5 text-[11px]">
              <Truck className="w-3.5 h-3.5 text-green-600" />
              {hasFreeShipping ? (
                <span className="text-green-600 font-medium">
                  ¡Envío gratis en tu pedido!
                </span>
              ) : (
                <span className="text-gray-600">
                  Envío gratis a partir de <span className="font-bold text-green-600">120€</span>
                  <span className="text-gray-400 ml-1">
                    (faltan {remainingForFreeShipping.toFixed(0)}€)
                  </span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Productos - con scroll interno */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 px-4">
              <ShoppingBag className="w-12 h-12 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500 text-center mb-4">
                Tu carrito está vacío
              </p>
              <Button onClick={closeCart} size="sm" className="text-xs">
                Ver productos
              </Button>
            </div>
          ) : (
            <div className="p-2.5 space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  {/* Imagen */}
                  <Link href={`/producto/${item.product.id}`} onClick={closeCart}>
                    <div className="w-12 h-12 bg-white rounded overflow-hidden border border-gray-200 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${item.product.id}`} onClick={closeCart}>
                      <p className="text-[11px] font-medium text-gray-800 line-clamp-1 hover:text-primary cursor-pointer">
                        {item.product.name}
                      </p>
                    </Link>
                    <p className="text-[9px] text-gray-400 mb-1">
                      {item.product.reference}
                    </p>

                    {/* Controles y precio */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white rounded border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="w-2.5 h-2.5 text-gray-500" />
                        </button>
                        <span className="w-5 text-center text-[10px] font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-2.5 h-2.5 text-gray-500" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-900">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-gray-300 hover:text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
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
          <div className="border-t border-gray-200 p-3 bg-white">
            {/* Resumen */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-700">{totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500">Envío</span>
                <span className={hasFreeShipping ? "text-green-600 font-medium" : "text-gray-700"}>
                  {hasFreeShipping ? "Gratis" : "8,50€"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">
                  {finalTotal.toFixed(2)}€
                </span>
              </div>
            </div>

            {/* Botones */}
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg h-9 text-xs mb-2">
                Finalizar compra
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <button
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-1.5 bg-white border border-primary text-primary font-medium rounded-lg h-9 text-xs hover:bg-primary hover:text-white transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
