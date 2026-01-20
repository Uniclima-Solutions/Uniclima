"use client";

/*
 * DESIGN: Slider de marcas con scroll táctil fluido
 * - Flechas de navegación izquierda/derecha
 * - Scroll táctil nativo con momentum
 * - Logos en color con fondo blanco
 * - Enlaces a páginas de marca (/marca/{slug})
 */

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
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
    <section className="py-8 sm:py-10 md:py-12 bg-gray-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-500 text-center mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Carrusel con scroll táctil */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Botón izquierda */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          )}

          {/* Contenedor de marcas con scroll táctil */}
          <div
            ref={scrollRef}
            className="touch-carousel gap-3 sm:gap-4 py-4 mx-6 sm:mx-8"
          >
            {brands.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>

          {/* Botón derecha */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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
      className="group flex items-center justify-center bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300"
      title={`Ver repuestos de ${brand.name}`}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="object-contain w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 group-hover:scale-110 transition-transform duration-300"
        draggable={false}
        loading="lazy"
      />
    </Link>
  );
}
