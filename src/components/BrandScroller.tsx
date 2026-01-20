"use client";

/**
 * BrandScroller - Carrusel de marcas con scroll automático
 * 
 * Características:
 * - Scroll automático continuo
 * - Pausa al hover
 * - Flechas de navegación
 * - Logos con efecto grayscale → color al hover
 * - Totalmente responsive
 * - Ajustado a márgenes del contenedor principal
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CAROUSEL_BRANDS, type Brand } from "@/lib/brands";

// Configuración del carrusel
const CONFIG = {
  SCROLL_SPEED: 0.5,
  SCROLL_AMOUNT_PERCENT: 0.6,
  ANIMATION_FRAME_RATE: 16,
} as const;

export default function BrandScroller() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Montar componente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animación de scroll automático
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
      container.scrollLeft += CONFIG.SCROLL_SPEED * (deltaTime / CONFIG.ANIMATION_FRAME_RATE);

      // Reset al inicio cuando llegue al final
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

  // Función de scroll manual
  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * CONFIG.SCROLL_AMOUNT_PERCENT;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Handlers de pausa
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    lastTimeRef.current = 0;
  }, []);

  // No renderizar hasta que esté montado (evita hydration mismatch)
  if (!isMounted) return null;

  // Duplicar marcas para scroll infinito
  const displayBrands = [...CAROUSEL_BRANDS, ...CAROUSEL_BRANDS];

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flecha izquierda */}
          <NavigationButton 
            direction="left" 
            onClick={() => scroll("left")} 
          />

          {/* Contenedor de logos */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto mx-10 sm:mx-12 md:mx-14 py-4 snap-x"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              overscrollBehavior: "contain"
            }}
          >
            {displayBrands.map((brand, idx) => (
              <BrandCard 
                key={`${brand.slug}-${idx}`} 
                brand={brand} 
              />
            ))}
          </div>

          {/* Flecha derecha */}
          <NavigationButton 
            direction="right" 
            onClick={() => scroll("right")} 
          />
        </div>
      </div>

      {/* Ocultar scrollbar en WebKit */}
      <style>{`
        div[style*="scrollbarWidth"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Componente de tarjeta de marca
interface BrandCardProps {
  brand: Brand;
}

function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/marca/${brand.slug}`}
      className="group flex-shrink-0 flex items-center justify-center p-1 sm:p-2"
      title={`Ver repuestos de ${brand.name}`}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 group-hover:scale-110 transition-all duration-300 ease-in-out"
        draggable={false}
        loading="lazy"
      />
    </Link>
  );
}

// Componente de botón de navegación
interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "left" ? "left-0" : "right-0";
  
  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all`}
      aria-label={direction === "left" ? "Anterior" : "Siguiente"}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
    </button>
  );
}
