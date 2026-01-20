"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
  { name: "Bosch", slug: "bosch", logo: "/images/marcas/bosch.png" },
  { name: "Wolf", slug: "wolf", logo: "/images/marcas/wolf.png" },
  { name: "Baxi Roca", slug: "baxi-roca", logo: "/images/marcas/baxi-roca.png" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.png" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.png" },
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
      const scrollSpeed = 0.5;
      
      container.scrollLeft += scrollSpeed * (deltaTime / 16);

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

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    lastTimeRef.current = 0;
  };

  if (!isMounted) return null;

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white">
      <div className="w-full px-2 sm:px-4">
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flecha izquierda - más pequeña en móvil */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </button>

          {/* Contenedor de logos - RESPONSIVO para mostrar 3+ en móvil */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto mx-9 sm:mx-11 md:mx-14 py-3 sm:py-4 md:py-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...marcasLogos, ...marcasLogos].map((brand, idx) => (
              <Link
                key={`${brand.slug}-${idx}`}
                href={`/marca/${brand.slug}`}
                className="group flex-shrink-0 flex items-center justify-center transition-all duration-300"
                title={`Ver repuestos de ${brand.name}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 lg:w-48 lg:h-24"
                  draggable={false}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>

          {/* Flecha derecha - más pequeña en móvil */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </button>
        </div>
      </div>

      <style>{`
        div[style*="scrollbarWidth"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
