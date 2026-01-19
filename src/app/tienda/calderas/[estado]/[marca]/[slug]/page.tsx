"use client";

/**
 * PÁGINA: Ficha de Caldera Individual
 * /tienda/calderas/[estado]/[marca]/[slug]
 * Detalle completo de la caldera con JSON-LD Product Schema
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { 
  Flame, 
  ShoppingCart,
  Check,
  Truck,
  Shield,
  Phone,
  Package,
  ChevronRight,
  Leaf
} from "lucide-react";

export default function CalderaProductoPage() {
  const params = useParams();
  const estado = params.estado as string;
  const marca = params.marca as string;
  const slug = params.slug as string;
  
  const marcaNombre = marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const estadoNombre = estado === "nuevas" ? "Nueva" : "Segunda Mano";
  const modeloNombre = slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
  const colorBtn = estado === "nuevas" ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600";
  const colorGradient = estado === "nuevas" ? "from-orange-400 to-orange-600" : "from-green-500 to-green-700";
  const colorClaro = estado === "nuevas" ? "orange" : "green";
  
  // Datos del producto
  const producto = {
    nombre: `Caldera ${marcaNombre} ${modeloNombre}`,
    sku: `CAL-${marca.substring(0, 3).toUpperCase()}-${slug.substring(0, 8).toUpperCase()}`,
    precio: estado === "nuevas" ? 1299 : 699,
    precioAnterior: estado === "nuevas" ? 1599 : 1299,
    stock: true,
    potencia: "24 kW",
    eficiencia: "A+++",
    descripcion: `Caldera de condensación ${marcaNombre} ${modeloNombre} ${estadoNombre.toLowerCase()}. Alta eficiencia energética con tecnología de última generación. Ideal para viviendas de hasta 150m².`,
    caracteristicas: [
      "Tecnología de condensación",
      "Pantalla LCD retroiluminada",
      "Modulación continua",
      "Compatible con termostatos inteligentes",
      "Bajo nivel de emisiones NOx"
    ],
    especificaciones: {
      "Potencia": "24 kW",
      "Eficiencia": "A+++",
      "Dimensiones": "740 x 418 x 344 mm",
      "Peso": "32 kg",
      "Garantía": estado === "nuevas" ? "2 años fabricante" : "1 año Uniclima"
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": producto.nombre,
    "description": producto.descripcion,
    "sku": producto.sku,
    "brand": {
      "@type": "Brand",
      "name": marcaNombre
    },
    "model": modeloNombre,
    "category": `Calderas > ${estadoNombre} > ${marcaNombre}`,
    "offers": {
      "@type": "Offer",
      "url": `https://uniclima.es/tienda/calderas/${estado}/${marca}/${slug}`,
      "priceCurrency": "EUR",
      "price": producto.precio,
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
        { "@type": "ListItem", "position": 3, "name": "Calderas", "item": "https://uniclima.es/tienda/calderas" },
        { "@type": "ListItem", "position": 4, "name": estado === "nuevas" ? "Nuevas" : "Segunda Mano", "item": `https://uniclima.es/tienda/calderas/${estado}` },
        { "@type": "ListItem", "position": 5, "name": marcaNombre, "item": `https://uniclima.es/tienda/calderas/${estado}/${marca}` },
        { "@type": "ListItem", "position": 6, "name": modeloNombre, "item": `https://uniclima.es/tienda/calderas/${estado}/${marca}/${slug}` }
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
            {/* Imagen */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className={`aspect-square bg-gradient-to-br ${colorGradient} opacity-10 rounded-xl flex items-center justify-center`}>
                <Package className="w-32 h-32 text-gray-300" />
              </div>
            </div>
            
            {/* Info */}
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                {producto.stock && (
                  <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Check className="w-4 h-4" /> En stock
                  </span>
                )}
                <span className={`inline-flex items-center gap-1 text-sm text-${colorClaro}-600 bg-${colorClaro}-50 px-3 py-1 rounded-full`}>
                  <Leaf className="w-4 h-4" /> {producto.eficiencia}
                </span>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                {producto.nombre}
              </h1>
              <p className="text-gray-500 mb-4">
                SKU: <span className="font-mono font-bold">{producto.sku}</span> | {producto.potencia}
              </p>
              
              {/* Precio */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-gray-900">€{producto.precio}</span>
                <span className="text-lg text-gray-400 line-through">€{producto.precioAnterior}</span>
                <span className="text-sm text-green-600 font-semibold">
                  -{Math.round((1 - producto.precio / producto.precioAnterior) * 100)}%
                </span>
              </div>
              
              {/* Botón */}
              <button className={`w-full ${colorBtn} text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 mb-6 transition-colors`}>
                <ShoppingCart className="w-5 h-5" />
                Añadir al carrito
              </button>
              
              {/* Beneficios */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Truck className={`w-6 h-6 text-${colorClaro}-500 mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">Instalación</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Shield className={`w-6 h-6 text-${colorClaro}-500 mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">Garantía</span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Phone className={`w-6 h-6 text-${colorClaro}-500 mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">Soporte</span>
                </div>
              </div>
              
              {/* Descripción */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                <h2 className="font-bold text-gray-900 mb-2">Descripción</h2>
                <p className="text-gray-600 text-sm">{producto.descripcion}</p>
              </div>
              
              {/* Características */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                <h2 className="font-bold text-gray-900 mb-2">Características</h2>
                <ul className="space-y-1">
                  {producto.caracteristicas.map((car, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className={`w-4 h-4 text-${colorClaro}-500`} />
                      {car}
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
          
          {/* Interlinking */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Más calderas {marcaNombre}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link 
                href={`/tienda/calderas/${estado}/${marca}`}
                className={`px-4 py-2 bg-${colorClaro}-50 hover:bg-${colorClaro}-100 text-${colorClaro}-700 rounded-full text-sm font-medium transition-colors flex items-center gap-1`}
              >
                Ver todas las calderas {marcaNombre} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href={`/tienda/repuestos/calderas/${marca}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
              >
                Repuestos {marcaNombre} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
