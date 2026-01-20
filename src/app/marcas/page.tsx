'use client';

/**
 * Página de todas las marcas
 * Muestra todas las marcas disponibles enmarcadas y a todo color
 * 
 * SEO Optimizado:
 * - Title: "Marcas de Calderas y Aire Acondicionado | Repuestos Originales | Uniclima"
 * - H1: "Repuestos por Marca: Calderas y Aire Acondicionado"
 * - Intención: Navegacional + Comercial
 * 
 * UI/UX Mejorado:
 * - Animaciones suaves y microinteracciones
 * - Bordes redondeados consistentes
 * - Transiciones fluidas
 * - Efectos hover refinados
 */

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema, UNICLIMA_ORGANIZATION } from '@/components/JsonLd';
import { 
  Flame, 
  Snowflake, 
  Phone, 
  Mail, 
  ChevronRight,
  Search,
  Building2,
  BadgeCheck
} from 'lucide-react';

// Lista completa de todas las marcas
const todasLasMarcas = [
  // Marcas de calderas
  { name: "Vaillant", slug: "vaillant", logo: "/images/marcas/vaillant.png", tipo: "calderas" },
  { name: "Junkers", slug: "junkers", logo: "/images/marcas/junkers.png", tipo: "calderas" },
  { name: "Baxi", slug: "baxi", logo: "/images/marcas/baxi.png", tipo: "calderas" },
  { name: "Ferroli", slug: "ferroli", logo: "/images/marcas/ferroli.png", tipo: "calderas" },
  { name: "Ariston", slug: "ariston", logo: "/images/marcas/ariston.png", tipo: "calderas" },
  { name: "Viessmann", slug: "viessmann", logo: "/images/marcas/viessmann.png", tipo: "calderas" },
  { name: "Beretta", slug: "beretta", logo: "/images/marcas/beretta.png", tipo: "calderas" },
  { name: "Chaffoteaux", slug: "chaffoteaux", logo: "/images/marcas/chaffoteaux.png", tipo: "calderas" },
  { name: "Cointra", slug: "cointra", logo: "/images/marcas/cointra.png", tipo: "calderas" },
  { name: "Bosch", slug: "bosch", logo: "/images/marcas/bosch.png", tipo: "calderas" },
  { name: "Wolf", slug: "wolf", logo: "/images/marcas/wolf.png", tipo: "calderas" },
  { name: "Baxi Roca", slug: "baxi-roca", logo: "/images/marcas/baxi-roca.png", tipo: "calderas" },
  { name: "Saunier Duval", slug: "saunier-duval", logo: "/images/marcas/saunier-duval.png", tipo: "calderas" },
  { name: "Immergas", slug: "immergas", logo: "/images/marcas/immergas.png", tipo: "calderas" },
  { name: "Hermann", slug: "hermann", logo: "/images/marcas/hermann.png", tipo: "calderas" },
  { name: "Biasi", slug: "biasi", logo: "/images/marcas/biasi.png", tipo: "calderas" },
  { name: "Domusa", slug: "domusa", logo: "/images/marcas/domusa.png", tipo: "calderas" },
  { name: "Fagor", slug: "fagor", logo: "/images/marcas/fagor.png", tipo: "calderas" },
  { name: "Manaut", slug: "manaut", logo: "/images/marcas/manaut.png", tipo: "calderas" },
  { name: "Tifell", slug: "tifell", logo: "/images/marcas/tifell.png", tipo: "calderas" },
  { name: "Neckar", slug: "neckar", logo: "/images/marcas/neckar.png", tipo: "calderas" },
  { name: "Lamborghini", slug: "lamborghini", logo: "/images/marcas/lamborghini.png", tipo: "calderas" },
  { name: "Sime", slug: "sime", logo: "/images/marcas/sime.png", tipo: "calderas" },
  { name: "De Longhi", slug: "delonghi", logo: "/images/marcas/delonghi.png", tipo: "calderas" },
  { name: "Intergas", slug: "intergas", logo: "/images/marcas/intergas.png", tipo: "calderas" },
  
  // Marcas de aire acondicionado
  { name: "Daikin", slug: "daikin", logo: "/images/marcas/daikin.png", tipo: "aire" },
  { name: "Mitsubishi", slug: "mitsubishi", logo: "/images/marcas/mitsubishi.png", tipo: "aire" },
  { name: "Fujitsu", slug: "fujitsu", logo: "/images/marcas/fujitsu.png", tipo: "aire" },
  { name: "LG", slug: "lg", logo: "/images/marcas/lg.png", tipo: "aire" },
  { name: "Samsung", slug: "samsung", logo: "/images/marcas/samsung.png", tipo: "aire" },
  { name: "Toshiba", slug: "toshiba", logo: "/images/marcas/toshiba.png", tipo: "aire" },
  { name: "Carrier", slug: "carrier", logo: "/images/marcas/carrier.png", tipo: "aire" },
  { name: "Panasonic", slug: "panasonic", logo: "/images/marcas/panasonic.png", tipo: "aire" },
  { name: "Hisense", slug: "hisense", logo: "/images/marcas/hisense.png", tipo: "aire" },
  { name: "Haier", slug: "haier", logo: "/images/marcas/haier.png", tipo: "aire" },
  { name: "Midea", slug: "midea", logo: "/images/marcas/midea.png", tipo: "aire" },
  { name: "Daitsu", slug: "daitsu", logo: "/images/marcas/daitsu.png", tipo: "aire" },
  { name: "Airwell", slug: "airwell", logo: "/images/marcas/airwell.png", tipo: "aire" },
];

// Componente de tarjeta de marca con animaciones
function BrandCard({ marca, colorScheme }: { marca: typeof todasLasMarcas[0]; colorScheme: 'orange' | 'blue' }) {
  const borderHoverColor = colorScheme === 'orange' ? 'hover:border-orange-300' : 'hover:border-blue-300';
  const shadowColor = colorScheme === 'orange' ? 'hover:shadow-orange-100' : 'hover:shadow-blue-100';
  
  return (
    <Link
      href={`/marca/${marca.slug}`}
      className={`group bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-xl ${borderHoverColor} ${shadowColor} transition-all duration-400 ease-out flex items-center justify-center aspect-[4/3] transform hover:-translate-y-1`}
    >
      <img
        src={marca.logo}
        alt={marca.name}
        className="w-full h-full object-contain transition-all duration-400 ease-out group-hover:scale-110"
        draggable={false}
      />
    </Link>
  );
}

export default function MarcasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  
  const marcasCalderas = todasLasMarcas.filter(m => m.tipo === "calderas");
  const marcasAire = todasLasMarcas.filter(m => m.tipo === "aire");
  
  // Filtrar marcas por búsqueda
  const filteredCalderas = marcasCalderas.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAire = marcasAire.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Schemas para SEO
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Inicio", url: "https://uniclima.es" },
    { name: "Marcas" }
  ]);

  const collectionSchema = createCollectionPageSchema(
    "Marcas de Calderas y Aire Acondicionado",
    "Todas las marcas de calderas y aire acondicionado disponibles en Uniclima. Repuestos originales y compatibles para Vaillant, Junkers, Daikin, Mitsubishi y más.",
    "https://uniclima.es/marcas",
    todasLasMarcas.map(marca => ({
      name: marca.name,
      url: `https://uniclima.es/marca/${marca.slug}`
    }))
  );

  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <JsonLd data={[UNICLIMA_ORGANIZATION, breadcrumbSchema, collectionSchema]} />
      
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 lg:pt-28">
        {/* Hero Section con diseño premium */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4 animate-pulse" />
              <span className="text-white font-semibold">Marcas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                    Repuestos por Marca
                  </h1>
                </div>
                <p className="text-orange-100 text-lg lg:text-xl leading-relaxed">
                  Más de <span className="text-white font-bold">{todasLasMarcas.length} marcas</span> disponibles con repuestos originales y compatibles.
                  <span className="text-white font-semibold"> Junkers, Vaillant, Daikin, Mitsubishi</span> y más.
                </p>
              </div>
              
              {/* Buscador de marcas */}
              <div className="w-full lg:w-[420px]">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'transform scale-105' : ''}`}>
                  <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${searchFocused ? 'text-orange-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Buscar marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300/50 shadow-2xl transition-all duration-300 text-base"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">{marcasCalderas.length}</div>
                    <div className="text-orange-200 text-sm font-medium">Marcas Calderas</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Snowflake className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">{marcasAire.length}</div>
                    <div className="text-orange-200 text-sm font-medium">Marcas Aire</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 group col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">100%</div>
                    <div className="text-orange-200 text-sm font-medium">Originales</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marcas de Calderas */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-sm">
                <Flame className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Repuestos de Calderas por Marca</h2>
                <p className="text-gray-500 mt-1">{filteredCalderas.length} fabricantes de calderas con repuestos disponibles</p>
              </div>
            </div>
            
            {filteredCalderas.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5">
                {filteredCalderas.map((marca) => (
                  <BrandCard key={marca.slug} marca={marca} colorScheme="orange" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500">No se encontraron marcas de calderas con "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        {/* Marcas de Aire Acondicionado */}
        <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                <Snowflake className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Repuestos de Aire Acondicionado por Marca</h2>
                <p className="text-gray-500 mt-1">{filteredAire.length} fabricantes de climatización con repuestos disponibles</p>
              </div>
            </div>
            
            {filteredAire.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5">
                {filteredAire.map((marca) => (
                  <BrandCard key={marca.slug} marca={marca} colorScheme="blue" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500">No se encontraron marcas de aire acondicionado con "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA con diseño premium */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  ¿Buscas Repuestos de Otra Marca?
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                  Contáctanos y te ayudaremos a encontrar el repuesto que necesitas
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:912345678"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    912 345 678
                  </a>
                  <a
                    href="mailto:info@uniclima.es"
                    className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    info@uniclima.es
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
