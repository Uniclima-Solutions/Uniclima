"use client";

/**
 * BrandScroller - Carrusel de marcas con scroll táctil fluido
 * 
 * Características:
 * - Scroll táctil nativo con momentum
 * - Flechas de navegación
 * - Logos con efecto grayscale → color al hover
 * - Totalmente responsive
 */

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CAROUSEL_BRANDS, type Brand } from "@/lib/brands";

export default function BrandScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [isMounted]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.6;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!isMounted) return null;

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Flecha izquierda */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </button>
          )}

          {/* Contenedor de logos con scroll táctil */}
          <div
            ref={scrollRef}
            className="touch-carousel gap-4 sm:gap-6 md:gap-8 mx-10 sm:mx-12 md:mx-14 py-4"
          >
            {CAROUSEL_BRANDS.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>

          {/* Flecha derecha */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// Componente de tarjeta de marca
function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/marca/${brand.slug}`}
      className="group flex items-center justify-center p-1 sm:p-2"
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
