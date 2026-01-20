"use client";

/**
 * BrandScroller - Carrusel de marcas con scroll infinito CSS
 * 
 * Características:
 * - Scroll automático continuo con CSS animation (máxima fluidez)
 * - Pausa al hover
 * - Logos con efecto grayscale → color al hover
 * - Totalmente responsive
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { CAROUSEL_BRANDS, type Brand } from "@/lib/brands";

export default function BrandScroller() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-white overflow-hidden">
      <div className="w-full">
        {/* Carrusel con CSS animation - scroll infinito fluido */}
        <div className="infinite-scroll-wrapper">
          <div className="infinite-scroll-container infinite-scroll-medium py-4">
            {/* Primera copia de marcas */}
            {CAROUSEL_BRANDS.map((brand, idx) => (
              <BrandCard key={`first-${brand.slug}-${idx}`} brand={brand} />
            ))}
            {/* Segunda copia para el loop infinito */}
            {CAROUSEL_BRANDS.map((brand, idx) => (
              <BrandCard key={`second-${brand.slug}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
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
      className="group flex-shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-8"
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
