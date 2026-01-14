/*
 * DESIGN: Barra flotante de comparación
 * - Muestra productos seleccionados
 * - Botón para ir a comparar
 * - Animación de entrada/salida
 */
import Link from "next/link";
import { X, Scale, ArrowRight } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";

export default function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare, compareCount } = useCompare();
  const compareList = compareItems;

  if (compareCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg animate-slide-up">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Productos seleccionados */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600 shrink-0">
              <Scale className="w-5 h-5 text-primary" />
              <span className="hidden sm:inline">Comparar:</span>
              <span className="font-medium">{compareCount}/3</span>
            </div>
            
            <div className="flex gap-2">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="relative group flex items-center gap-2 bg-gray-100 rounded-lg pl-2 pr-8 py-1.5 shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span className="text-sm text-gray-700 max-w-[100px] truncate hidden sm:block">
                    {product.name}
                  </span>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* Slots vacíos */}
              {Array.from({ length: 3 - compareCount }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-12 h-12 border-2 border-dashed border-gray-200 rounded-lg hidden sm:flex items-center justify-center"
                >
                  <span className="text-xs text-gray-400">+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Limpiar
            </button>
            <Link
              href="/comparar"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${
                compareCount >= 2
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
              }`}
            >
              Comparar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
