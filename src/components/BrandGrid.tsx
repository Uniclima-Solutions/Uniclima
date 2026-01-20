'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Brand {
  name: string
  slug: string
  logo: string
  count?: number
}

interface BrandGridProps {
  brands: Brand[]
  title?: string
  columns?: number
}

export function BrandGrid({ brands, title, columns = 6 }: BrandGridProps) {
  const gridCols = {
    4: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4',
    5: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
    7: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7',
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
      )}
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[6]} gap-3 sm:gap-4`}>
        {brands.map((brand, index) => (
          <Link
            key={brand.slug}
            href={`/marca/${brand.slug}`}
            className="group bg-white rounded-2xl p-3 sm:p-4 aspect-[4/3] flex items-center justify-center border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="relative w-full h-full">
              <Image
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                loading={index < 12 ? "eager" : "lazy"}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
