"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Lista completa de marcas con logos HD procesados
const marcasLogos = [
  { name: "Vaillant", logo: "/images/marcas/vaillant.png" },
  { name: "Junkers", logo: "/images/marcas/junkers.png" },
  { name: "Baxi", logo: "/images/marcas/baxi.png" },
  { name: "Ferroli", logo: "/images/marcas/ferroli.png" },
  { name: "Ariston", logo: "/images/marcas/ariston.png" },
  { name: "Viessmann", logo: "/images/marcas/viessmann.png" },
  { name: "Beretta", logo: "/images/marcas/beretta.png" },
  { name: "Chaffoteaux", logo: "/images/marcas/chaffoteaux.png" },
  { name: "Cointra", logo: "/images/marcas/cointra.png" },
  { name: "Biasi", logo: "/images/marcas/biasi.png" },
  { name: "Tifell", logo: "/images/marcas/tifell.png" },
  { name: "Manaut", logo: "/images/marcas/manaut.png" },
  { name: "Lamborghini", logo: "/images/marcas/lamborghini.png" },
  { name: "Immergas", logo: "/images/marcas/immergas.png" },
  { name: "Intergas", logo: "/images/marcas/intergas.png" },
  { name: "Domusa", logo: "/images/marcas/domusa.png" },
  { name: "Fagor", logo: "/images/marcas/fagor.png" },
  { name: "Daikin", logo: "/images/marcas/daikin.png" },
  { name: "Mitsubishi", logo: "/images/marcas/mitsubishi.png" },
  { name: "Fujitsu", logo: "/images/marcas/fujitsu.png" },
  { name: "LG", logo: "/images/marcas/lg.png" },
  { name: "Samsung", logo: "/images/marcas/samsung.png" },
  { name: "Toshiba", logo: "/images/marcas/toshiba.png" },
  { name: "Carrier", logo: "/images/marcas/carrier.png" },
  { name: "Panasonic", logo: "/images/marcas/panasonic.png" },
  { name: "Hisense", logo: "/images/marcas/hisense.png" },
  { name: "Haier", logo: "/images/marcas/haier.png" },
  { name: "Midea", logo: "/images/marcas/midea.png" },
  { name: "Daitsu", logo: "/images/marcas/daitsu.png" },
  { name: "DeLonghi", logo: "/images/marcas/delonghi.png" },
];

export default function BrandScroller() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll fluido con flechas
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isMounted) return null;

  return (
    <section className="py-2 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Carrusel con scroll fluido bidireccional */}
        <div className="relative group">
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl -translate-x-1/2 opacity-90 hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>

          {/* Contenedor de scroll fluido */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-2 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {marcasLogos.map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-28 sm:w-36 lg:w-40 flex items-center justify-center p-4 sm:p-5 bg-white rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 group/brand"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 sm:max-h-12 lg:max-h-14 w-auto object-contain grayscale opacity-60 group-hover/brand:grayscale-0 group-hover/brand:opacity-100 transition-all duration-300"
                  draggable={false}
                  loading="lazy"
                  title={brand.name}
                />
              </div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl translate-x-1/2 opacity-90 hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>

          {/* Gradientes de fade en los bordes */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar,
        div[style*="scrollbarWidth"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
