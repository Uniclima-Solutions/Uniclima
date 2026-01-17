'use client';

/**
 * Componente Breadcrumb con Schema JSON-LD
 * Siguiendo las directrices SEO/GEO de Uniclima Solutions
 * 
 * Uso:
 * <Breadcrumb items={[
 *   { label: 'Repuestos Calderas', href: '/c/calderas' },
 *   { label: 'Placas Electrónicas', href: '/c/calderas/placas-electronicas' },
 *   { label: 'Junkers' }
 * ]} />
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generar schema JSON-LD para breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://uniclima.es"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `https://uniclima.es${item.href}` })
      }))
    ]
  };

  return (
    <>
      {/* Schema JSON-LD */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Breadcrumb visual */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center text-sm text-gray-500 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {/* Inicio */}
          <li className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center hover:text-orange-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Inicio</span>
            </Link>
          </li>
          
          {/* Items del breadcrumb */}
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400 flex-shrink-0" />
              {item.href && index < items.length - 1 ? (
                <Link 
                  href={item.href}
                  className="hover:text-orange-600 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700 font-medium truncate max-w-[150px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
