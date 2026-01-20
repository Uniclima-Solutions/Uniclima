'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

interface Category {
  id: number
  name: string
  fullName: string
  slug: string
  image: string
  count: number
  popular: boolean
}

interface CategoryGridProps {
  categories: Category[]
  baseUrl: string
  showToggle?: boolean
  initialShowAll?: boolean
}

// Formas de onda para las tarjetas
const waveShapes = [
  "M0,40 C80,40 120,15 200,15 C280,15 320,40 400,40 L400,100 L0,100 Z",
  "M0,50 C100,50 150,20 250,20 C350,20 400,50 400,50 L400,100 L0,100 Z",
  "M0,30 C60,30 100,50 200,50 C300,50 340,30 400,30 L400,100 L0,100 Z",
  "M0,45 C50,20 100,20 150,35 C200,50 250,50 300,35 C350,20 400,20 400,45 L400,100 L0,100 Z",
]

function CategoryCard({ category, index, baseUrl }: { category: Category; index: number; baseUrl: string }) {
  const waveIndex = index % waveShapes.length
  const wavePath = waveShapes[waveIndex]
  
  return (
    <Link href={`${baseUrl}/${category.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out relative aspect-square border border-gray-100/80 hover:border-orange-200 transform hover:-translate-y-1">
        {/* Badge popular con animación */}
        {category.popular && (
          <div className="absolute top-2.5 right-2.5 z-30 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          </div>
        )}
        
        {/* Banner con forma de onda */}
        <div className="absolute bottom-0 left-0 right-0 h-[32%]">
          <svg 
            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105" 
            viewBox="0 0 400 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-${category.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <path 
              d={wavePath} 
              fill={`url(#gradient-${category.id})`}
              className="transition-all duration-500"
            />
          </svg>
          
          {/* Contenido del banner */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
            <h3 className="font-bold text-sm leading-tight line-clamp-1 group-hover:underline underline-offset-2">
              {category.name}
            </h3>
            <p className="text-[10px] text-orange-100 mt-0.5">
              {category.count} productos
            </p>
          </div>
        </div>
        
        {/* Imagen con optimización next/image */}
        <div className="absolute inset-0 flex items-center justify-center p-4 pb-[35%]">
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
            <Image
              src={category.image}
              alt={category.fullName}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain drop-shadow-lg"
              loading={index < 6 ? "eager" : "lazy"}
              priority={index < 4}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function CategoryGrid({ 
  categories, 
  baseUrl, 
  showToggle = true,
  initialShowAll = false 
}: CategoryGridProps) {
  const [showAll, setShowAll] = useState(initialShowAll)
  
  const popularCategories = categories.filter(c => c.popular)
  const displayCategories = showAll ? categories : popularCategories

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {displayCategories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            index={index}
            baseUrl={baseUrl}
          />
        ))}
      </div>
      
      {showToggle && categories.length > popularCategories.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Ver menos categorías
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Ver todas las categorías ({categories.length})
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
