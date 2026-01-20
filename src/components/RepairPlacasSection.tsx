/**
 * RepairPlacasSection - Banner de reparación de placas
 * Diseño exacto de la imagen con componentes independientes
 */

import Link from "next/link";
import { Clock, Zap, Shield, ChevronRight } from "lucide-react";

export default function RepairPlacasSection() {
  return (
    <section 
      className="w-full py-6 sm:py-8 md:py-10 relative overflow-hidden"
      style={{ backgroundColor: '#FF6900' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          {/* Columna izquierda - Contenido */}
          <div className="flex-1 text-left max-w-xl">
            {/* Título principal */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-1">
              ¿No encuentras tu placa?
            </h2>
            
            {/* Subtítulo amarillo */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-yellow-300 italic mb-2">
              ¡La reparamos!
            </p>
            
            {/* Descripción */}
            <p className="text-white text-xs sm:text-sm uppercase tracking-wider font-semibold mb-4">
              TÉCNICOS ESPECIALIZADOS CON 1 AÑO DE GARANTÍA
            </p>
            
            {/* Botón MÁS INFORMACIÓN */}
            <Link href="/servicios/reparacion-placas">
              <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                MÁS INFORMACIÓN
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
            
            {/* Badges de beneficios */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-5 sm:mt-6">
              {/* Badge 48/72h */}
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-yellow-300" />
                <span className="text-white font-bold text-xs sm:text-sm">48/72 h</span>
              </div>
              
              {/* Separador */}
              <span className="text-yellow-300/70">|</span>
              
              {/* Badge Descuento */}
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-xs sm:text-sm">
                  Hasta un <span className="font-black">60%</span> de descuento
                </span>
              </div>
              
              {/* Separador */}
              <span className="text-yellow-300/70">|</span>
              
              {/* Badge Garantía */}
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-yellow-300" />
                <span className="text-white font-bold text-xs sm:text-sm">1 año de garantía</span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Placas */}
          <div className="relative w-full md:w-auto flex-shrink-0">
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[160px] sm:h-[200px] md:h-[220px] lg:h-[240px] mx-auto md:mx-0">
              {/* Placa pequeña (arriba izquierda) */}
              <img 
                src="/images/placas/placa-transparent-1.webp" 
                alt="Placa electrónica"
                className="absolute top-0 left-0 w-[35%] h-auto object-contain transform -rotate-6 z-10"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))' }}
              />
              {/* Placa grande (abajo derecha) */}
              <img 
                src="/images/placas/placa-transparent-2.webp" 
                alt="Placa electrónica caldera"
                className="absolute bottom-0 right-0 w-[70%] h-auto object-contain transform rotate-3"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
