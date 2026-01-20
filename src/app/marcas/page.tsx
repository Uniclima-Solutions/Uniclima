'use client';

/**
 * Página de todas las marcas
 * Muestra todas las marcas disponibles enmarcadas y a todo color
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

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

export default function MarcasPage() {
  const marcasCalderas = todasLasMarcas.filter(m => m.tipo === "calderas");
  const marcasAire = todasLasMarcas.filter(m => m.tipo === "aire");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumbs
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Marcas' },
              ]}
            />
          </div>
        </div>

        {/* Header de la página */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Todas las Marcas
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Encuentra repuestos y equipos de las mejores marcas de calderas y aire acondicionado
            </p>
          </div>
        </section>

        {/* Marcas de Calderas */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Marcas de Calderas</h2>
                <p className="text-gray-500">{marcasCalderas.length} marcas disponibles</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {marcasCalderas.map((marca) => (
                <Link
                  key={marca.slug}
                  href={`/marca/${marca.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300 flex flex-col items-center justify-center"
                >
                  <div className="w-full h-20 flex items-center justify-center mb-3">
                    <img
                      src={marca.logo}
                      alt={marca.name}
                      className="max-w-full max-h-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors text-center">
                    {marca.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Marcas de Aire Acondicionado */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">❄️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Marcas de Aire Acondicionado</h2>
                <p className="text-gray-500">{marcasAire.length} marcas disponibles</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {marcasAire.map((marca) => (
                <Link
                  key={marca.slug}
                  href={`/marca/${marca.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center"
                >
                  <div className="w-full h-20 flex items-center justify-center mb-3">
                    <img
                      src={marca.logo}
                      alt={marca.name}
                      className="max-w-full max-h-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                    {marca.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿No encuentras tu marca?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Contáctanos y te ayudaremos a encontrar el repuesto que necesitas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:912345678"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                <span>📞</span> 912 345 678
              </a>
              <a
                href="mailto:info@uniclima.es"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <span>✉️</span> info@uniclima.es
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
