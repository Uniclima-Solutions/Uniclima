/*
 * DESIGN: Slider de marcas arrastrable
 * - Logos todos del mismo tamaño (ancho y alto fijos)
 * - Sin flechas de navegación
 * - Arrastrable con el dedo (touch-scroll)
 * - Grayscale por defecto, color al hover
 * - Enlaces a páginas de marca
 */

import Link from "next/link";
import { useRef, useState } from "react";

interface Brand {
  name: string;
  slug: string;
  logo: string;
}

// Marcas de calderas
const boilerBrands: Brand[] = [
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.png" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.png" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.png" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.png" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.png" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.png" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.png" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.png" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.png" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.png" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.png" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.png" },
];

// Marcas de aire acondicionado
const acBrands: Brand[] = [
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.png" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.png" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.png" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.png" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.png" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.png" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.png" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.png" },
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
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

      {/* Slider container - arrastrable */}
      <div 
        ref={sliderRef}
        className="flex items-center gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/marca/${brand.slug}`}
            className="flex-shrink-0 group"
            title={`Ver repuestos de ${brand.name}`}
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault();
              }
            }}
          >
            <div className="w-24 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-24 flex items-center justify-center p-2">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain filter grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                draggable={false}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export { boilerBrands, acBrands, allBrands };
export type { Brand };
