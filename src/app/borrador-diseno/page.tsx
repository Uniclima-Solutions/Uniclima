'use client'

import { useState, useEffect } from 'react';
import Home from '../page';

export default function BorradorDiseno() {
  const [styles, setStyles] = useState({
    bannerMargin: '0px',
    sectionPadding: '10px',
    bannerWidth: '100%',
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Panel de Control Flotante */}
      <div className="fixed bottom-10 right-10 z-[9999] bg-white p-6 rounded-2xl shadow-2xl border border-orange-200 w-80">
        <h3 className="text-lg font-bold text-orange-600 mb-4 flex items-center gap-2">
          <span>🛠️</span> Editor Visual Uniclima
        </h3>
        
        <div className="space-y-6">
          {/* Ajuste de Márgenes de Banners */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Separación entre secciones (px): {styles.sectionPadding}
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={parseInt(styles.sectionPadding)} 
              onChange={(e) => setStyles({...styles, sectionPadding: `${e.target.value}px`})}
              className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Ajuste de Ancho de Banners */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ancho de Banners (%): {styles.bannerWidth}
            </label>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={parseInt(styles.bannerWidth)} 
              onChange={(e) => setStyles({...styles, bannerWidth: `${e.target.value}%`})}
              className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={() => alert('¡Estilos guardados! Ahora Manus los procesará para el modo responsive.')}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              Aplicar Cambios a la Web
            </button>
            <p className="text-[10px] text-gray-400 mt-2 text-center italic">
              Manus detectará estos valores y creará la renderización responsive.
            </p>
          </div>
        </div>
      </div>

      {/* Inyectar Estilos Dinámicos */}
      <style jsx global>{`
        /* Reset Agresivo para el Borrador */
        * {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        
        /* Aplicar solo el margen deseado a las secciones principales */
        section, .CategoryCarousel, .GoogleReviews, .BrandScroller {
          margin-top: ${styles.sectionPadding} !important;
          margin-bottom: ${styles.sectionPadding} !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        /* Banners Edge-to-Edge */
        section.w-full {
          width: 100% !important;
          max-width: none !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }

        section.w-full img {
          width: ${styles.bannerWidth} !important;
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
          height: auto !important;
        }

        /* Mantener el padding lateral solo para el contenido que no es banner */
        .max-w-6xl {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
      `}</style>

      {/* Renderizar la Home Real */}
      <div className="bg-white shadow-inner">
        <Home />
      </div>
    </div>
  );
}
