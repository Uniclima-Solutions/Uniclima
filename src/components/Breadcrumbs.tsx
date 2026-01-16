'use client';

/*
 * DESIGN: Componente de Breadcrumbs Dinámico
 * - Navegación contextual con Schema.org para SEO
 * - Diseño limpio y profesional
 * - Soporte para múltiples niveles
 * - Responsive con scroll horizontal en móvil
 */
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({ items, showHome = true, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`w-full bg-gray-50 border-b border-gray-100 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol 
          className="flex items-center gap-1 py-3 text-sm overflow-x-auto whitespace-nowrap"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {showHome && (
            <li 
              className="flex items-center"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <Link 
                href="/" 
                className="flex items-center gap-1 text-gray-500 hover:text-orange-600 transition-colors"
                itemProp="item"
              >
                <Home className="w-4 h-4" />
                <span itemProp="name" className="hidden sm:inline">Inicio</span>
              </Link>
              <meta itemProp="position" content="1" />
              {items.length > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-300 mx-1 flex-shrink-0" />
              )}
            </li>
          )}

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const position = showHome ? index + 2 : index + 1;
            
            return (
              <li 
                key={index} 
                className="flex items-center"
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {item.href && !isLast ? (
                  <Link 
                    href={item.href} 
                    className="text-gray-500 hover:text-orange-600 transition-colors truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span 
                    className={`truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none ${isLast ? "text-gray-900 font-medium" : "text-gray-500"}`}
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(position)} />
                {!isLast && (
                  <ChevronRight className="w-4 h-4 text-gray-300 mx-1 flex-shrink-0" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

// Breadcrumbs predefinidos para páginas comunes
export const breadcrumbsConfig: Record<string, BreadcrumbItem[]> = {
  condicionesVenta: [
    { label: 'Condiciones de Venta' }
  ],
  avisoLegal: [
    { label: 'Aviso Legal' }
  ],
  privacidad: [
    { label: 'Política de Privacidad' }
  ],
  cookies: [
    { label: 'Política de Cookies' }
  ],
  terminosCesionVideo: [
    { label: 'Términos de Cesión de Vídeo' }
  ],
  diagnosticoPlacas: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Diagnóstico de Placas' }
  ],
  seguimiento: [
    { label: 'Seguimiento de Reparación' }
  ],
  contacto: [
    { label: 'Contacto' }
  ],
  ofertas: [
    { label: 'Ofertas' }
  ],
  piezaGratis: [
    { label: 'Promociones', href: '/ofertas' },
    { label: 'Pieza Gratis' }
  ],
  contratoMantenimiento: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Contrato de Mantenimiento' }
  ],
  checkout: [
    { label: 'Carrito', href: '/carrito' },
    { label: 'Checkout' }
  ],
  login: [
    { label: 'Iniciar Sesión' }
  ],
  registro: [
    { label: 'Crear Cuenta' }
  ],
  favoritos: [
    { label: 'Mis Favoritos' }
  ],
  profesionales: [
    { label: 'Zona Profesionales' }
  ]
};
