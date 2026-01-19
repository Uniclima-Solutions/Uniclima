"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  // Mapeo de nombres para que luzcan limpios
  const labelMap: Record<string, string> = {
    tienda: "Tienda",
    repuestos: "Repuestos",
    calderas: "Calderas",
    "aire-acondicionado": "Aire Acondicionado",
    nuevas: "Nuevas",
    reacondicionadas: "Segunda Mano",
    nuevos: "Nuevos",
    reacondicionados: "Segunda Mano",
  };

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    // Si no está en el mapa, limpiamos guiones y capitalizamos (para marcas y productos)
    const label = labelMap[segment] || segment.replace(/-/g, " ").toUpperCase();
    
    return { label, href, isLast: index === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex py-4 text-sm text-gray-600">
      <ol className="flex list-none p-0">
        <li className="flex items-center">
          <Link href="/" className="hover:text-blue-600">🏠 Inicio</Link>
          <span className="mx-2">/</span>
        </li>
        {breadcrumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            {crumb.isLast ? (
              <span className="font-bold text-gray-900">{crumb.label}</span>
            ) : (
              <>
                <Link href={crumb.href} className="hover:text-blue-600 capitalize">
                  {crumb.label.toLowerCase()}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
