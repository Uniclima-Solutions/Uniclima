/**
 * PLANTILLA: Página de Categoría
 * 
 * Esta plantilla sigue las directrices SEO/GEO de Uniclima Solutions
 * y utiliza los componentes de diseño existentes.
 * 
 * IMPORTANTE: NO modificar los componentes Header, Footer ni los estilos base.
 * 
 * Estructura de URL recomendada:
 * /c/[categoria]/page.tsx
 * /c/[categoria]/[tipo]/page.tsx
 * /c/[categoria]/[tipo]/[marca]/page.tsx
 * 
 * Ejemplo de uso:
 * Copiar este archivo a src/app/c/calderas/page.tsx y adaptar los datos.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb, CollectionSchema, FAQSchema } from '@/components/seo';
import { ChevronRight, Filter, X, SlidersHorizontal } from 'lucide-react';

// ============================================
// TIPOS - Adaptar según necesidades
// ============================================

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
  description?: string;
}

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface CategoryPageProps {
  // Datos de la categoría actual
  category: {
    name: string;
    slug: string;
    description: string;
    image?: string;
  };
  // Subcategorías o productos a mostrar
  items: Category[];
  // Breadcrumb items
  breadcrumbItems: { label: string; href?: string }[];
  // Filtros disponibles (opcional)
  filters?: {
    brands?: FilterOption[];
    types?: FilterOption[];
  };
  // FAQs específicas de la categoría
  faqs?: { question: string; answer: string }[];
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function CategoryPageTemplate({
  category,
  items,
  breadcrumbItems,
  filters,
  faqs
}: CategoryPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          
          {/* Schema JSON-LD para la colección */}
          <CollectionSchema 
            collection={{
              name: category.name,
              description: category.description,
              url: `/c/${category.slug}`,
              image: category.image,
              itemCount: items.length
            }}
            items={items.map((item, index) => ({
              name: item.name,
              url: `/c/${category.slug}/${item.slug}`,
              position: index + 1,
              image: item.image
            }))}
          />
          
          {/* Cabecera de categoría */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 sm:p-8 mb-6 text-white">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-orange-100 text-sm sm:text-base max-w-2xl">
              {category.description}
            </p>
            <p className="mt-4 text-sm font-medium">
              {items.length} productos disponibles
            </p>
          </div>
          
          {/* Contenido principal */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Filtros laterales (desktop) */}
            {filters && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
                  <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtros
                  </h2>
                  
                  {/* Filtro por marca */}
                  {filters.brands && filters.brands.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">Marca</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {filters.brands.map(brand => (
                          <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-600">{brand.label}</span>
                            <span className="text-xs text-gray-400 ml-auto">({brand.count})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Filtro por tipo */}
                  {filters.types && filters.types.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">Tipo</h3>
                      <div className="space-y-2">
                        {filters.types.map(type => (
                          <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-600">{type.label}</span>
                            <span className="text-xs text-gray-400 ml-auto">({type.count})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}
            
            {/* Grid de items */}
            <div className="flex-1">
              {/* Botón filtros móvil */}
              {filters && (
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
              )}
              
              {/* Grid de categorías/productos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <Link 
                    key={item.id}
                    href={`/c/${category.slug}/${item.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                      {/* Imagen */}
                      <div className="aspect-square relative bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Curva decorativa naranja (estilo PCComponentes) */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-orange-500/10 to-transparent" />
                      </div>
                      {/* Info */}
                      <div className="p-3 sm:p-4">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {item.count} productos
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contenido SEO adicional */}
          <div className="mt-12 bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {category.name} – Repuestos originales y compatibles
            </h2>
            <div className="prose prose-gray max-w-none">
              <p>
                En <strong>Uniclima Solutions</strong> encontrarás una amplia selección de {category.name.toLowerCase()} 
                para las principales marcas del mercado. Todos nuestros repuestos están probados y verificados 
                antes del envío, garantizando su correcto funcionamiento.
              </p>
              <p>
                Disponemos de repuestos originales y compatibles, todos con garantía incluida. 
                Nuestro equipo técnico está disponible para ayudarte a encontrar el repuesto 
                exacto que necesitas para tu equipo.
              </p>
            </div>
          </div>
          
          {/* FAQs */}
          {faqs && faqs.length > 0 && (
            <div className="mt-8">
              <FAQSchema 
                faqs={faqs}
                showHTML={true}
                title={`Preguntas frecuentes sobre ${category.name}`}
              />
            </div>
          )}
          
        </div>
      </main>
      
      <Footer />
      
      {/* Modal de filtros móvil */}
      {showFilters && filters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Filtros</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Contenido de filtros igual que desktop */}
            {filters.brands && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Marca</h3>
                <div className="space-y-2">
                  {filters.brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500" />
                      <span className="text-sm">{brand.label}</span>
                      <span className="text-xs text-gray-400 ml-auto">({brand.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// EJEMPLO DE METADATA (para usar en page.tsx)
// ============================================

/*
export const metadata: Metadata = {
  title: 'Repuestos de Calderas – Placas, Válvulas, Intercambiadores | Uniclima',
  description: 'Encuentra repuestos originales y compatibles para calderas. Placas electrónicas, válvulas de gas, intercambiadores. Envío gratis +120€. Garantía incluida.',
  openGraph: {
    title: 'Repuestos de Calderas | Uniclima Solutions',
    description: 'Especialistas en repuestos de calderas. Todas las marcas.',
    images: ['/images/og/repuestos-calderas.jpg'],
  },
};
*/
