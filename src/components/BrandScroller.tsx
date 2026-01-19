"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Lista completa de marcas con logos HD procesados y slugs para enlaces
const marcasLogos = [
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.png" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.png" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.png" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.png" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.png" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.png" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.png" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.png" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.png" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.png" },
  { name: "Tifell", slug: "tifell", logo: "/images/marcas/tifell.png" },
  { name: "Manaut", slug: "manaut", logo: "/images/marcas/manaut.png" },
  { name: "Lamborghini", slug: "lamborghini", logo: "/images/marcas/lamborghini.png" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.png" },
  { name: "Intergas", slug: "intergas", logo: "/images/marcas/intergas.png" },
  { name: "Domusa", slug: "domusa", logo: "/images/marcas/domusa.png" },
  { name: "Fagor", slug: "fagor", logo: "/images/marcas/fagor.png" },
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.png" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.png" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.png" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.png" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.png" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.png" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.png" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.png" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.png" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.png" },
  { name: "Midea", slug: "midea", logo: "/images/marcas/midea.png" },
  { name: "Daitsu", slug: "daitsu", logo: "/images/marcas/daitsu.png" },
  { name: "DeLonghi", slug: "delonghi", logo: "/images/marcas/delonghi.png" },
];

export default function BrandScroller() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll automático suave
  useEffect(() => {
    if (!isMounted) return;

    const animate = (currentTime: number) => {
      if (!scrollContainerRef.current || isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const container = scrollContainerRef.current;
      const scrollSpeed = 0.3; // píxeles por milisegundo
      
      container.scrollLeft += scrollSpeed * (deltaTime / 16);

      // Reset al inicio cuando llega al final (scroll infinito)
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 1) {
        container.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, isPaused]);

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

  // Pausar al hacer hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    lastTimeRef.current = 0;
  };

  if (!isMounted) return null;

  return (
    <section className="py-12 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carrusel con scroll fluido bidireccional */}
        <div 
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl -translate-x-1/2 opacity-90 hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
          </button>

          {/* Contenedor de scroll fluido */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth px-4 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {/* Duplicamos las marcas para efecto infinito */}
            {[...marcasLogos, ...marcasLogos].map((brand, idx) => (
              <Link
                key={`${brand.slug}-${idx}`}
                href={`/marca/${brand.slug}`}
                className="flex-shrink-0 w-44 h-28 sm:w-52 sm:h-32 lg:w-60 lg:h-36 flex items-center justify-center p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-orange-400 hover:shadow-2xl hover:bg-orange-50/30 transition-all duration-300 cursor-pointer group/brand"
                title={`Ver repuestos de ${brand.name}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-20 sm:max-h-24 lg:max-h-28 max-w-full w-auto object-contain group-hover/brand:scale-110 transition-all duration-300"
                  draggable={false}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl translate-x-1/2 opacity-90 hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
          </button>

          {/* Gradientes de fade en los bordes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
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
