"use client";

/**
 * PÁGINA: Ficha de Producto Individual
 * /tienda/repuestos/[maquina]/[marca]/[familia]/[slug]
 * Detalle completo del repuesto con JSON-LD Product Schema
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  Wind, 
  ShoppingCart,
  Check,
  Truck,
  Shield,
  Phone,
  Package,
  ChevronRight
} from "lucide-react";

const coloresMaquina: Record<string, { gradient: string; claro: string; btn: string }> = {
  calderas: { gradient: "from-orange-500 to-orange-600", claro: "orange", btn: "bg-orange-500 hover:bg-orange-600" },
  "aire-acondicionado": { gradient: "from-blue-500 to-blue-600", claro: "blue", btn: "bg-blue-500 hover:bg-blue-600" }
};

export default function ProductoPage() {
  const params = useParams();
  const maquina = params.maquina as string;
  const marca = params.marca as string;
  const familia = params.familia as string;
  const slug = params.slug as string;
  
  const colores = coloresMaquina[maquina] || coloresMaquina.calderas;
  const Icono = maquina === "aire-acondicionado" ? Wind : Flame;
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const familiaNombre = familia.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const sku = slug.toUpperCase();
  
  // Datos del producto (en producción vendrían de API/DB)
  const producto = {
    nombre: `${familiaNombre} ${marcaNombre}`,
    sku: sku,
    referencia: `REF-${marca.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 900000) + 100000}`,
    precio: Math.floor(Math.random() * 200) + 80,
    precioAnterior: Math.floor(Math.random() * 50) + 250,
    stock: true,
    descripcion: `${familiaNombre} original para ${marcaNombre}. Pieza de alta calidad con garantía de compatibilidad. Ideal para reparaciones y mantenimiento preventivo.`,
    compatibilidad: [
      `${marcaNombre} Serie A (2018-2024)`,
      `${marcaNombre} Serie B (2019-2024)`,
      `${marcaNombre} Modelo Pro (2020-2024)`
    ],
    especificaciones: {
      "Referencia fabricante": sku,
      "Marca": marcaNombre,
      "Tipo": familiaNombre,
      "Garantía": "1 año",
      "Origen": "Original"
    }
  };

  // JSON-LD Product Schema completo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${producto.nombre} - ${producto.sku}`,
    "description": producto.descripcion,
    "sku": producto.sku,
    "mpn": producto.referencia,
    "brand": {
      "@type": "Brand",
      "name": marcaNombre
    },
    "model": familiaNombre,
    "category": `Repuestos > ${maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas"} > ${marcaNombre} > ${familiaNombre}`,
    "offers": {
      "@type": "Offer",
      "url": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}/${familia}/${slug}`,
      "priceCurrency": "EUR",
      "price": producto.precio,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": producto.stock ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "Uniclima"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://uniclima.es/" },
        { "@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://uniclima.es/tienda" },
        { "@type": "ListItem", "position": 3, "name": "Repuestos", "item": "https://uniclima.es/tienda/repuestos" },
        { "@type": "ListItem", "position": 4, "name": maquina === "aire-acondicionado" ? "Aire Acondicionado" : "Calderas", "item": `https://uniclima.es/tienda/repuestos/${maquina}` },
        { "@type": "ListItem", "position": 5, "name": marcaNombre, "item": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}` },
        { "@type": "ListItem", "position": 6, "name": familiaNombre, "item": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}/${familia}` },
        { "@type": "ListItem", "position": 7, "name": producto.sku, "item": `https://uniclima.es/tienda/repuestos/${maquina}/${marca}/${familia}/${slug}` }
      ]
    }
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-20 lg:pt-28 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Breadcrumbs />
          
          <div className="grid lg:grid-cols-2 gap-8 mt-4">
            {/* Imagen del producto */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className={`aspect-square bg-gradient-to-br ${colores.gradient} opacity-10 rounded-xl flex items-center justify-center`}>
                <Package className="w-32 h-32 text-gray-300" />
              </div>
            </div>
            
            {/* Información del producto */}
            <div>
              {/* Badge de stock */}
              {producto.stock ? (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full mb-4">
                  <Check className="w-4 h-4" /> En stock - Envío 24-48h
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">
                  Bajo pedido - 3-5 días
                </span>
              )}
              
              {/* Nombre y SKU */}
              <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                {producto.nombre}
              </h1>
              <p className="text-gray-500 mb-4">
                SKU: <span className="font-mono font-bold">{producto.sku}</span> | 
                Ref: <span className="font-mono">{producto.referencia}</span>
              </p>
              
              {/* Precio */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-gray-900">€{producto.precio}</span>
                <span className="text-lg text-gray-400 line-through">€{producto.precioAnterior}</span>
                <span className="text-sm text-green-600 font-semibold">
                  -{Math.round((1 - producto.precio / producto.precioAnterior) * 100)}%
                </span>
              </div>
              
              {/* Botón de compra */}
              <button className={`w-full ${colores.btn} text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 mb-6 transition-colors`}>
                <ShoppingCart className="w-5 h-5" />
                Añadir al carrito
              </button>
              
              {/* Beneficios */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Truck className={`w-6 h-6 text-${colores.claro}-500 mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">Envío 24-48h</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Shield className={`w-6 h-6 text-${colores.claro}-500 mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">Garantía 1 año</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Phone className={`w-6 h-6 text-${colores.claro}-500 mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">Soporte técnico</span>
                </div>
              </div>
              
              {/* Descripción */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                <h2 className="font-bold text-gray-900 mb-2">Descripción</h2>
                <p className="text-gray-600 text-sm">{producto.descripcion}</p>
              </div>
              
              {/* Compatibilidad */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                <h2 className="font-bold text-gray-900 mb-2">Compatibilidad</h2>
                <ul className="space-y-1">
                  {producto.compatibilidad.map((comp, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className={`w-4 h-4 text-${colores.claro}-500`} />
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Especificaciones */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h2 className="font-bold text-gray-900 mb-2">Especificaciones</h2>
                <dl className="space-y-2">
                  {Object.entries(producto.especificaciones).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          
          {/* Interlinking Silo - Productos relacionados de la misma marca */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Más repuestos {marcaNombre}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link 
                href={`/tienda/repuestos/${maquina}/${marca}/placas-electronicas`}
                className={`px-4 py-2 bg-${colores.claro}-50 hover:bg-${colores.claro}-100 text-${colores.claro}-700 rounded-full text-sm font-medium transition-colors flex items-center gap-1`}
              >
                Placas Electrónicas {marcaNombre} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href={`/tienda/repuestos/${maquina}/${marca}/bombas-circulacion`}
                className={`px-4 py-2 bg-${colores.claro}-50 hover:bg-${colores.claro}-100 text-${colores.claro}-700 rounded-full text-sm font-medium transition-colors flex items-center gap-1`}
              >
                Bombas {marcaNombre} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href={`/tienda/repuestos/${maquina}/${marca}`}
                className={`px-4 py-2 bg-${colores.claro}-50 hover:bg-${colores.claro}-100 text-${colores.claro}-700 rounded-full text-sm font-medium transition-colors flex items-center gap-1`}
              >
                Ver todos los repuestos {marcaNombre} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
