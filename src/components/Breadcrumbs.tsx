/*
 * DESIGN: Componente de Breadcrumbs Dinámico
 * - Navegación contextual
 * - Diseño limpio y profesional
 * - Soporte para múltiples niveles
 */
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export default function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto pb-2">
      {showHome && (
        <>
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
          {items.length > 0 && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link 
                href={item.href} 
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`whitespace-nowrap ${isLast ? "text-gray-800 font-medium" : ""}`}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
          </div>
        );
      })}
    </nav>
  );
}
