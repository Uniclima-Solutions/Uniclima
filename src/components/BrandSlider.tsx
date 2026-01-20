'use client';

/*
 * DESIGN: Slider de marcas con scroll automático infinito
 * - Flechas de navegación izquierda/derecha
 * - Movimiento automático de izquierda a derecha
 * - Pausa al hacer hover sobre cualquier logo
 * - Logos en color con fondo blanco
 * - Enlaces a páginas de marca (/marca/{slug})
 * - Tarjetas con bordes redondeados estilo mockup
 */

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Brand {
  name: string;
  slug: string;
  logo: string;
}

// Marcas de calderas
const boilerBrands: Brand[] = [
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.webp" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.webp" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.webp" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.webp" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.webp" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.webp" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.webp" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.webp" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.webp" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.webp" },
  { name: "Wolf", slug: "wolf", logo: "/images/marcas/wolf.webp" },
  { name: "Bosch", slug: "bosch", logo: "/images/marcas/bosch.webp" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.webp" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.webp" },
  { name: "Tifell", slug: "tifell", logo: "/images/marcas/tifell.webp" },
  { name: "Manaut", slug: "manaut", logo: "/images/marcas/manaut.webp" },
  { name: "Domusa", slug: "domusa", logo: "/images/marcas/domusa.webp" },
  { name: "Fagor", slug: "fagor", logo: "/images/marcas/fagor.webp" },
];

// Marcas de aire acondicionado
const acBrands: Brand[] = [
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.webp" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.webp" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.webp" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.webp" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.webp" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.webp" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.webp" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.webp" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.webp" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.webp" },
  { name: "Midea", slug: "midea", logo: "/images/marcas/midea.webp" },
  { name: "Daitsu", slug: "daitsu", logo: "/images/marcas/daitsu.webp" },
];

// Todas las marcas combinadas
const allBrands = [...boilerBrands, ...acBrands];

interface BrandSliderProps {
  title?: string;
  subtitle?: string;
  brands?: Brand[];
}

export default function BrandSlider({
  title = "Trabajamos con las mejores marcas",
  subtitle = "Repuestos originales y compatibles de los principales fabricantes",
  brands = allBrands,
}: BrandSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll automático suave de izquierda a derecha
  const animate = useCallback((currentTime: number) => {
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
    const scrollSpeed = 0.5; // píxeles por milisegundo (ajustable)
    
    container.scrollLeft += scrollSpeed * (deltaTime / 16); // normalizado a ~60fps

    // Reset al inicio cuando llega al final (scroll infinito)
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 1) {
      container.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    if (isMounted) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, animate]);

  // Scroll manual con flechas
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.6;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Pausar al hacer hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    lastTimeRef.current = 0;
  };

  if (!isMounted) return null;

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 mb-10 sm:mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Slider container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl -translate-x-1/2 opacity-90 hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>

          {/* Contenedor de scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth px-2 py-2"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none", 
              WebkitOverflowScrolling: "touch" 
            }}
          >
            {/* Duplicamos las marcas para efecto infinito */}
            {[...brands, ...brands].map((brand, idx) => (
              <Link
                key={`${brand.slug}-${idx}`}
                href={`/marca/${brand.slug}`}
                className="flex-shrink-0 w-32 sm:w-40 lg:w-44 flex items-center justify-center p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-orange-400 hover:shadow-xl hover:bg-orange-50/50 transition-all duration-300 cursor-pointer group/brand"
                title={`Ver repuestos de ${brand.name}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 sm:max-h-12 lg:max-h-14 w-auto object-contain opacity-100 group-hover/brand:opacity-100 group-hover/brand:scale-110 transition-all duration-300"
                  draggable={false}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:shadow-xl translate-x-1/2 opacity-90 hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>

          {/* Gradientes de fade en los bordes */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar,
        div[style*="scrollbarWidth"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export { boilerBrands, acBrands, allBrands };
export type { Brand };
